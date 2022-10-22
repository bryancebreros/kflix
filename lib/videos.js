import videoTestData from "../data/videos.json"
import { getWatchedVideos, getFavorites } from "./db/hasura"
const fetchVideos = async (url) => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
    const BASE_URL = "youtube.googleapis.com/youtube/v3"
    // try{
    //     const baseUrl = "youtube.googleapis.com/youtube/v3"
    //     const response = await fetch(
    //         `https://${baseUrl}/${url}&maxResults=15&key=${YOUTUBE_API_KEY}`
    //     )
    const response = await fetch(
        `https://${BASE_URL}/${url}&maxResults=10&key=${YOUTUBE_API_KEY}`
    )
    console.log({response});
    return await response.json()
}
export const getCommonVideos = async (url) => {
    try {
        const isDev = process.env.DEVELOPMENT;
        // isDev ? videoTestData :
        const data =  await fetchVideos(url);
        if(data?.error) {
            console.error("Youtube API error", data.error)
            return []
        }
        

        return data?.items.map((item) => {
            
            const id = item.id?.videoId || item.id
            const snippet = item.snippet
            
            return {
                title: snippet?.title,
                imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
                id,
                description: snippet.description.length > 430  ? snippet.description.slice(0,430) + "[...]" : snippet.description,
                publishTime: snippet.publishedAt.slice(0,10),
                channelTitle: snippet.channelTitle,
                statistics: item.statistics ? item.statistics : { viewCount: 0}
            }
        })
    } catch(error) {
        console.error("something went wrong :(", error);
        return []
    }
    
}
export const getVideos = (searchQuery) => {
    const URL = `search?part=snippet&q=${searchQuery}&type=video`;
    return getCommonVideos(URL);
}
export const getYoutubeVideoById = (videoId) => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`
    return getCommonVideos(URL)
}
export const getWatchItAgainVideos = async (userId, token) => {
    const reversedVideos = await getWatchedVideos(userId, token)
    const videos = reversedVideos.reverse()
    return (
        videos.map((video) => {
            return {
                id: video.videoId,
                imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
            }
        }) || []
    )
  }

  export const getFavoriteVideos = async (userId, token) => {
    const videos = await getFavorites(userId, token)
    return (
        videos?.map((video) => {
            return {
                id: video.videoId,
                imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
            }
        }) || [] 

    )
  }