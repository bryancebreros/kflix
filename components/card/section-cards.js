import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Card from "./card"
import clsx from "classnames"
import styles from "./section-cards.module.css"
import {motion, MotionConfig} from "framer-motion"
import { Input } from "../input/input"
const SectionCards = ({title, videos = [], size, shouldWrap = false, shouldScale}) => {
    const ref = size === "small" ? `/video` : `/group`
    const [width, setWidth] = useState(0)
    const sliderWrapper = useRef()
    useEffect(() => {
        setWidth(sliderWrapper.current.scrollWidth - sliderWrapper.current.offsetWidth)
    }, [])
    const handleClick = () => {
        setWidth(sliderWrapper.current.scrollWidth - sliderWrapper.current.offsetWidth)
        console.log({width});
    }
    console.log({width});
    return(
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <motion.div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)} ref={sliderWrapper} whileTap={{cursor:"grabbing"}}>
                <button onClick={handleClick}>s</button>
            {videos.map((video, idx) => {
                return (
                    
                        <Link key={video.id} href={`${ref}/${video.id}`}>
                            <a>
                                <Card key={idx} id={idx} imgUrl={video.imgUrl} size={size} shouldScale={shouldScale} />                      
                            </a>
                        </Link>
                    
                       
                )
            })}
            
            
            
            </motion.div>
        </section>
    )

}

export default SectionCards