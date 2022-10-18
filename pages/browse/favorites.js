import Head from "next/head"
import Navbar from "../../components/nav/navbar"

import SectionCards from "../../components/card/section-cards"
import { redirectUser } from "../../utils/redirectUser"
import { getFavoriteVideos } from "../../lib/videos"
import styles from "../../styles/Favorites.module.css"

export async function getServerSideProps(context) {
    
    const { userId, token } = await redirectUser(context)
    if (!userId) {
        return {
          props: {},
          redirect: {
            destination: "/login",
            permanent: false,
          },
        }
      }
    const videos = await getFavoriteVideos(userId, token)
    console.log({videos});
    return {
      props: {
        favoriteVideos: videos,
      },
    }
}
const Favorites = ({favoriteVideos}) => {
    
    return (
        <div>
            <Head>
                <title>My list</title>
            </Head> 
            <main className={styles.main}>
                <Navbar />
                <div className={styles.sectionWrapper}>
                    <SectionCards title="Favorite Videos" videos={favoriteVideos} size="small" shouldWrap shouldScale={false} />
                
                </div>
            </main>
        </div>
    )
}

export default Favorites