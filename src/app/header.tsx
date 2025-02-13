"use client"
import { APP_NAME, APP_VERSION } from "@/config"
import { useStore } from "@zuzjs/store"
import { Box, ColorScheme, css, Image, SelectTabs, Text, TRANSITION_CURVES, TRANSITIONS, useDelayed } from "@zuzjs/ui"
import Link from "next/link"
import { useRef } from "react"
import { useState } from "react"

const Header = () => {

    const me = useStore(`user`)
    const [ signOut, setSignout ] = useState(false)
    const toast = useRef(null)
    const mounted = useDelayed()

    return <Box as={[
        `header flex aic p:40,25 rel zIndex:99 &ph(p:20) h:70`,
    ]}>
        <Box as={`logo flex aic flex:1`}>
            <Box as={`app-logo rel flex aic jcc gap:10`} animate={{
                transition: TRANSITIONS.SlideInLeft,
                duration: .5,
                when: mounted,
                curve: TRANSITION_CURVES.Spring,
            }}>
                <Image src="/imgs/zuz-logo.png" alt={APP_NAME} as={`w:25`} />
                <Text as={`s:18 b:900`}>{APP_NAME}</Text>
                <Text as={`s:14 b:900 bg:$button-link r:5 p:1,4,0,4 border:1,$button-link-border,solid`}>UI</Text>
                <Text as={`s:14 opacity:0.5`}>v{APP_VERSION}</Text>
            </Box>
        </Box> 

        <Box as={`flex aic jce`}>

            <ColorScheme />

            <Link href={{ pathname: "/u/signin" }} className={css(`ml:20 mr:1 tdn p:4,10 border:1,$button-link-border,solid s:16 r:20,0,0,20 bg:$button-link &hover(bg:$primary border:1,$primary,solid c:fff scale:1.1) anim:0.1s`)}>Sign in</Link>
            <Link href={{ pathname: "/u/signup" }} className={css(`tdn p:4,10 border:1,$button-link-border,solid s:16 r:0,20,20,0 bg:$button-link &hover(bg:$primary border:1,$primary,solid c:fff scale:1.1) anim:0.1s`)}>Create Account</Link>

        </Box>
    </Box>

}

export default Header