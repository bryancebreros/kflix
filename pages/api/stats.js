import { findVideoIdByUser, insertStats, updateStats } from "../../lib/db/hasura"
import { verifyToken } from "../../lib/utils";
export default async function stats(req, resp) {
    console.log({req: req.query});
       try {
        const token = req.cookies.token
        
        if(!token){
            resp.status(403).send({})

        }else{
            const inputParams = req.method === "POST" ? req.body : req.query
            // const inputParams = req.body
            // const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            const {videoId} = inputParams
            
            // const doesStatsExist = await findVideoIdByUser(token, userId, videoId)
            console.log("hi");
            if(videoId){
                const userId = await verifyToken(token)
                // const doesStatsExist = await findVideoIdByUser(
                //     token,
                //     userId,
                //     videoId
                // )
                const findVideo = await findVideoIdByUser(token, userId, videoId)
                console.log({findVideo});
                const doesStatsExist = findVideo?.length > 0

                if ( req.method === "POST") {
                    const { favorited, watched = true } = req.body
                    if (doesStatsExist){
                        console.log("omlam");
                        const response = await updateStats(token, {
                            favorited,
                            userId,
                            videoId,
                            watched,
                        })
                        resp.send({data: response})
                    }else {
                        console.log({ watched, userId, videoId, favorited})
                        const response = await insertStats(token, {
                            watched,
                            userId,
                            videoId,
                            favorited,
                        })
                        resp.send({data: response})
        
                    }                                                                                                           
                
                
                } else {
                    if (doesStatsExist) {
                        resp.send(findVideo);
                    } else {
                        resp.status(404);
                        resp.send({ user: null, msg: "Video not found" });
                    }
                }
            }
        }
    } catch(error){
        console.error("Error /stats", error)
        resp.status(500).send({done: false, error: error?.message})
    }
} 