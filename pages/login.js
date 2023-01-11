import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import styles from "../styles/Login.module.css"
import { magic } from "../lib/magic-client"
const Login = () => {
    const [email, setEmail] = useState("")
    const [userMsg, setUserMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const handleComplete = () => {
            setIsLoading(false)
        }
        router.events.on("routeChangeComplete", handleComplete)
        router.events.on("routeChangeError", handleComplete)

        return () => {
            router.events.off("routeChangeComplete", handleComplete)
            router.events.off("routeChangeError", handleComplete)  
        }
    }, [router])
    const handleOnChangeEmail = (e) => {
        setUserMsg("")
        const email = e.target.value
        setEmail(email)
    }
    const handleLoginWithEmail = async (e) => {

        e.preventDefault()
        setIsLoading(true)
        if (email) {
            if(email === "cebrerosbryan@gmail.com"){
                try{
                    const didToken = await magic.auth.loginWithMagicLink({
                        email
                    })
                    
                    if(didToken){
                        const response = await fetch("/api/login", {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${didToken}`,
                                "Content-Type": "application/json"
                            }
                        })
                        const loggedInResponse = await response.json()
                        if (loggedInResponse.done) {
                            router.push("/")
                        } else {
                            setIsLoading(false)
                            setUserMsg("Can't login")
                        }
                    }
                }catch (err){
                    console.error("Error, can't login", err);
                    setIsLoading(false)
                }
            } else {
                setIsLoading(false)
                setUserMsg("Unexpected, can't login")
            }
            

        }else {
            setIsLoading(false)
            setUserMsg("Enter a valid email")
        }
    }
    return(
        <div className={styles.container}>
            <Head>
                <title>K-flix Login</title>
            </Head>

            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                <div className={styles.logoLink}>
                    
                    <div className={styles.logoWrapper}>
                        <Image alt=""
                        />
                    </div>
                    
                </div>
                </div>
            </header>
            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                <h1 className={styles.signinHeader}>
                    {isLoading ? "Loading..." : "Sign In"}
                </h1>

                <input
                    type="text"
                    placeholder="Email address"
                    className={styles.emailInput}
                    onChange={handleOnChangeEmail}
                />

                <p className={styles.userMsg}>{userMsg}</p>
                <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
                    Sign In
                </button>
                </div>
            </main>
        </div>
    )
}

export default Login