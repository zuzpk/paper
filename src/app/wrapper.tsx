"use client"
import { AppStore } from "@/store";
import createStore from "@zuzjs/store";
import { Box } from "@zuzjs/ui";
import "@zuzjs/ui/styles";
import { ReactNode, useEffect } from "react";
import Authenticate from "./oauth";

const Wrapper = ({ children } : Readonly<{ children: ReactNode; }>) => {

    return <Main>{children}</Main>

}

const Main = ({ children } : Readonly<{ children: ReactNode; }>) => {

    const { Provider } = createStore(`app`, AppStore.App)
    const { Provider: UserProvider } = createStore(`user`, AppStore.User)
    
    useEffect(() => {}, []);

    return <Provider>
        <UserProvider>
            <Box as={`app flex minH:100vh cols`}>
                <Authenticate />
                {/* <Header /> */}
                {children as React.ReactNode}
            </Box>
        </UserProvider>
    </Provider>

}

export default Wrapper