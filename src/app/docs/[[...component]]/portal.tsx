"use client"
import { Box } from '@zuzjs/ui';
import React, { ReactNode } from 'react';

const PreviewPortal : React.FC<{
    children: ReactNode
}> = ({ children }) => {


    return <Box as={`w:calc[100vw - 300px] minH:50vh flex:1 flex aic jcc p:50 --comp-preview-box`}>
        {children}
    </Box>
}

export default PreviewPortal;