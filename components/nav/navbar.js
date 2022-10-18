import { useState, useEffect } from "react"
import styles from "./navbar.module.css"

import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"
import { magic } from "../../lib/magic-client"
const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [username, setUsername] = useState("")
    const [didToken, setDidToken] = useState("")
    const router = useRouter()

    useEffect(() => {
      async function getUsername() {
        try {
          const { email, issuer } = await magic.user.getMetadata();
          const didToken = await magic.user.getIdToken()   
          if (email) {
            setUsername(email);
          }
        } catch (err) {
          console.error("error, can't retrieve email:", err);
        }
      }
      getUsername();
    }, []);
    
    const handleonClickHome = (e) => {
        e.preventDefault()
        router.push("/")
    }

    const handleonClickMyGroups = (e) => {
        e.preventDefault()
        router.push("/browse/favorites")
    }

    const handleShowDropdown = (e) => {
        e.preventDefault()
        setShowDropdown(!showDropdown)
    }
    const handleSignout = async (e) => {
      e.preventDefault()

      try{
        // await magic.user.logout()
        
        // router.push("/login")
        const response = await fetch("/api/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${didToken}`,
            "Content-Type": "application/json"
          }
        })
        const res = await response.json()
      } catch(err){
        console.error("Error, can't log out", err)
        router.push("/login")
      }
    }
    return (
        <div className={styles.container}>
        <div className={styles.wrapper}>
          <Link className={styles.logoLink} href="/">
            <a>
              <div className={styles.logoWrapper}>
                  <Image 
                      src="/static/kflix.png"
                      alt="k flix logo"
                      width="114px"
                      height="48px"
                  />
              </div>
            </a>
          </Link>
          <ul className={styles.navItems}>
            <li className={styles.navItem} onClick={handleonClickHome}>Home</li>
            <li className={styles.navItem2} onClick={handleonClickMyGroups}>Favorites</li>
          </ul>
          <nav className={styles.navContainer}>
            <div>
              
              <button className={styles.usernameBtn} onClick={handleShowDropdown}>
                <p className={styles.username}>{username}</p>
                <Image 
                    src="/static/expand_more.svg"
                    alt="show more"
                    width="24px"
                    height="24px"
                />
              </button>
  
              {showDropdown && (
                <div className={styles.navDropdown}>
                <div>
                  {/* <Link href="/login"> */}
                    <a className={styles.linkName} onClick={handleSignout}>Sign out</a>
                  {/* </Link> */}
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
              )}
            </div>
          
          </nav>
        </div>
      </div>
    
    )
}

export default Navbar