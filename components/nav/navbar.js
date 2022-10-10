import { useState } from "react"
import styles from "./navbar.module.css"

import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"

const Navbar = ({username}) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const router = useRouter()
    
    const handleonClickHome = (e) => {
        e.preventDefault()
        router.push("/")
    }

    const handleonClickMyGroups = (e) => {
        e.preventDefault()
        router.push("/browse/my-groups")
    }

    const handleShowDropdown = (e) => {
        e.preventDefault()
        setShowDropdown(!showDropdown)
    }
    return (
        <div className={styles.container}>
        <div className={styles.wrapper}>
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
                <Image 
                    src="/static/kflix.png"
                    alt="k flix logo"
                    width="114px"
                    height="48px"
                />
            </div>
          </a>
          <ul className={styles.navItems}>
            <li className={styles.navItem} onClick={handleonClickHome}>Home</li>
            <li className={styles.navItem2} onClick={handleonClickMyGroups}>My Groups</li>
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
                  <Link href="/login">
                    <a className={styles.linkName}>Sign out</a>
                  </Link>
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