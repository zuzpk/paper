"use client"
import { APP_NAME } from '@/config';
import { AppStore } from '@/store';
import createStore from '@zuzjs/store';
import { Box } from '@zuzjs/ui';
import React, { useEffect } from 'react';
import Preview from './preview';
import Sidebar from './sidebar';

const Page : React.FC = (_props) => {

    const { Provider } = createStore(`docs`, AppStore.Docs)
    
    useEffect(() => {
        document.title = `${APP_NAME} Docs`
    }, [])

    return <Provider>
        <Box as={`w:100vw flex gap:10`}>
            <Sidebar />
            <Preview />
        </Box>
    </Provider>

}

export default Page;