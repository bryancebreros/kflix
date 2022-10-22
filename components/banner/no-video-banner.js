import styles from "./banner.module.css"
const NoVideoBanner = ({title, subTitle, imgUrl}) => {
    
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

export default NoVideoBanner