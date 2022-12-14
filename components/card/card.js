import { useState } from "react"

import Image from "next/image"

import cls from "classnames"
import {motion, MotionConfig} from "framer-motion"

import styles from "./card.module.css"
const Card = ({ imgUrl, size, id, shouldScale = true}) => {
    const [imgSrc, setImgSrc] = useState(imgUrl)
    const classMap = {
        large: styles.lgItem,
        medium: styles.mdItem,
        small: styles.smItem
    }
    const handleonError= () => {
        console.error("this id error");
        setImgSrc("https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80")
    }
    const scale = id === 0 ? { scaleY: 1.05} : {scale: 1.1}
    const shouldHover = shouldScale && {
        whileHover: {...scale}
    }
    return (
        <div className={styles.container}>
            <motion.div 
                className={cls(styles.imgMotionWrapper, classMap[size])}
                { ...shouldHover}
            >

                <Image 
                    src={imgSrc}
                    alt="Image"
                    layout="fill"
                    className={styles.cardImg}
                    onError={handleonError}
                />
            </motion.div>
        </div>
    )
}

export default Card