import ChevronLeft  from "../icons/ChevronLeft"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

import  ChevronRight  from "../icons/ChevronRight"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Card from "./card"
import clsx from "classnames"
import styles from "./section-cards.module.css"
import {motion, MotionConfig} from "framer-motion"


const SectionCards = ({title, videos = [], size, shouldWrap = false, shouldScale}) => {
    const mystyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial"
      };
    const ref = size === "small" ? `/video` : `/group`
    const rowRef = useRef(null)
    const [isMoved, setIsMoved] = useState(false)

    const handleClick = (direction) => {
        setIsMoved(true)
        if (rowRef.current) {
        const {scrollLeft, clientWidth} = rowRef.current

        const scrollTo = 
            direction === "left" 
            ? scrollLeft - clientWidth 
            : scrollLeft + clientWidth
        rowRef.current.scrollTo({left: scrollTo, behavior: "smooth"})

        }
    }
    
    return(
        <section className={styles.container}>
        
            <h2 className={styles.title}>{title}</h2>
            
            <div className="slider">
                <ChevronLeftIcon
                className={styles.sliderButton}
                onClick={() => handleClick('left')}
                />
                <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)} ref={rowRef} >
                    
                {videos.map((video, idx) => {
                    return (
                        
                            <Link key={video.id} href={`${ref}/${video.id}`}>
                                <a>
                                    <Card key={idx} id={idx} imgUrl={video.imgUrl} size={size} shouldScale={shouldScale} />                      
                                </a>
                            </Link>
                        
                        
                    )
                })}
                
                
                
                </div>
                <ChevronRightIcon
          className={styles.right}
          onClick={() => handleClick('right')}
        />
            </div>
            

        </section>
    )

}

export default SectionCards