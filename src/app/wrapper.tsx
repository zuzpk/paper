"use client"
import { APP_VERSION } from "@/config";
import createStore from "@zuzjs/store"
import { Box, useColorScheme } from "@zuzjs/ui";
import { useEffect, ReactNode } from "react";
import Header from "./header";
import "@zuzjs/ui/styles"

const Wrapper = ({ children } : Readonly<{ children: ReactNode; }>) => {

    // const { colorScheme } = useColorScheme()

    // useEffect(() => {
    
    //     document.body.classList.remove(`auto`, `dark`, `light`)
    //     document.body.classList.add(colorScheme!)
    
    // });

    // console.log(colorScheme)

    return <Main>{children}</Main>

}

// Removed duplicate import of ReactNode

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Main = ({ children } : Readonly<{ children: ReactNode; }>) => {

    const { Provider } = createStore(`app`, {
        version: APP_VERSION,
        debug: true,
        token: null,
        theme: `system`
    })

    const { Provider: UserProvider } = createStore(`user`, {
        loading: true,
        ID: null
    })
    
    useEffect(() => {}, []);

    return <Provider>
        <UserProvider>
            <Box as={`app flex minH:100vh cols`}>
                <Header />
                {children as React.ReactNode}
            </Box>
        </UserProvider>
    </Provider>

}

export default Wrapper