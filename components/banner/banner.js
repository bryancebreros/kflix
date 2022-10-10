import Image from "next/image"
import styles from "./banner.module.css"
const Banner = ({title, subTitle, imgUrl}) => {
    const handleOnPlay = () => {
        console.log("handleonplay");
    }
    return (
        <div className={styles.container}>
            <div className={styles.leftWrapper}>
                <div className={styles.left}>
                <div className={styles.nseriesWrapper}>
                    <p className={styles.firstLetter}>K</p>
                    <p className={styles.series}>G R O U P S</p>
                </div>
                <h3 className={styles.title}>{title}</h3>
                <h3 className={styles.subTitle}>{subTitle}</h3>

                <div className={styles.playBtnWrapper}>
                    <button className={styles.btnWithIcon} onClick={handleOnPlay}>
                    <Image 
                        src="/static/books.svg"
                        alt="more icon"
                        width="32px"
                        height="32px"
                    />
                    <span className={styles.playText}>More</span>
                    </button>
                </div>
                </div>
            </div>
            <div
                className={styles.bannerImg}
                style={{
                    backgroundImage: `url(${imgUrl})`,
                }}
            ></div>
        </div>
    )
}

export default Banner