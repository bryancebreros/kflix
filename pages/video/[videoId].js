import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Modal from "react-modal"
import styles from "../../styles/Video.module.css"
import Navbar from "../../components/nav/navbar"
import clsx from "classnames"
import { getYoutubeVideoById } from "../../lib/videos"

import Like from "../../components/icons/like-icon"

Modal.setAppElement("#__next")

export async function getStaticProps(context) {
    // const video = {
    //     title: "Butterfly",
    //     publishTime: "2018-01-01",
    //     description: "stanloona",
    //     channelTitle: "loonaelmundo",
    //     viewCount: 10000,
    // }
    //TODO vidseo id = context.params.videoId
    const videoId = context.params.videoId
    
    const videoArray = await getYoutubeVideoById(videoId)
    
    return {
        props: {
            video: videoArray.length > 0 ? videoArray[0] : {}
        },
        revalidate: 10
    }
}

export async function getStaticPaths() {
    const listOfVideos = ["STFhiX9nvJQ", "BoZ0Zwab6Oc"]
    const paths = listOfVideos.map((videoId) => ({
            params: {videoId}
    }))
    return {paths, fallback: "blocking"}
}
const Video = ({video}) => {
    const router = useRouter()
    const videoId = router.query.videoId

    const [toggleLike, setToggleLike] = useState(false)
    

    
    const {title, publishTime, description, channelTitle, statistics: {viewCount} = { viewCount: 0}} = video
    
    useEffect(() => {
        const handleLikeService = async () => {
            const response = await fetch(`/api/stats?videoId=${videoId}`, {
                method: "GET",
            })
            const data = await response.json()
            if (data.length > 0) {
                const favorited = data[0].favorited
                if(favorited){
                    setToggleLike(true)
                }else{
                    setToggleLike(false)
                }
            }
        }
        handleLikeService()
    }, [videoId]) 
    // const handleToggleDislike = async () => {
    //     console.log("handle dislike")
    //     setToggleDislike(true)
    //     setToggleLike(false)
    // }

    // const handleToggleLike = async () => {
    //     console.log("toggle like")
    //     setToggleLike(true)
    //     setToggleDislike(false)
    // }
    // const checkToggle = (toggle, setToggle) => {
    //     toggle ? setToggle(false) : setToggle(true);
    //   }
    const ratingService = async (favorited) => {
        return await fetch("/api/stats", {
            method: "POST",
            body: JSON.stringify({
                videoId,
                favorited,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
    const handleToggleLike = async () => {
        const favorited = !toggleLike
        setToggleLike(favorited)
        const response = await ratingService(favorited)
        console.log("data", await response.json());
        // if (toggleLike) {
        //     setToggleLike(false)
        //     // checkToggle(toggleLike, setToggleLike);
        // } else {
        // setToggleLike(true)
        // // checkToggle(toggleLike, setToggleLike);
        // }
    }
    
    //   const handleToggleDislike = () => {
    //     if (toggleLike) {
    //       setToggleLike(false);
    //       checkToggle(toggleDislike, setToggleDislike);
    //     } else {
    //       checkToggle(toggleDislike, setToggleDislike);
    //     }
    //   }
    return (
        <div className={styles.container}>
            <Navbar />
            <Modal
                isOpen={true}
                contentLabel="Watch the video"
                onRequestClose={() => router.back()}
                overlayClassName={styles.overlay}
                className={styles.modal}
            >
                <iframe
                    id="ytplayer"
                    type="text/html"
                    width="100%"
                    height="450"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&color=white&origin=http://example.com`} 
                    frameBorder="0"
                    className={styles.videoPlayer}
                    
                ></iframe>
                <div className={styles.likeDislikeBtnWrapper}>
                    <div className={styles.likeBtnWrapper}>
                        <button onClick={handleToggleLike}>
                            <div className={styles.btnWrapper}>
                                <Like selected={toggleLike}/>
                            </div>
                        </button>
                    </div>
                    
                    
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.modalBodyContent}>
                        <div className={styles.col1}>
                            <p className={styles.publishTime}>{title}</p>
                            {/* <p className={styles.title}>{title}</p> */}
                            <p className={styles.description}>{description}</p>
                        </div>
                        <div className={styles.col2}>
                        <p className={clsx(styles.subText, styles.subTextWrapper)}>
                            <span className={styles.textColor}>Cast: </span>
                            <span className={styles.channelTitle}>{channelTitle}</span>
                        </p>
                        <p className={clsx(styles.subText, styles.subTextWrapper)}>
                            <span className={styles.textColor}>Date: </span>
                            <span className={styles.channelTitle}>{publishTime}</span>
                        </p>
                        </div>
                    </div>
                </div>
                
            </Modal>
        </div>
    )
}

export default Video