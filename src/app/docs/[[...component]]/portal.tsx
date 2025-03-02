"use client"
import { Box } from '@zuzjs/ui';
import React, { ReactNode } from 'react';

const PreviewPortal : React.FC<{
    children: ReactNode
}> = ({ children }) => {


    return <Box as={`w:100% minH:50vh flex:1 flex aic jcc`}>
        {children}
    </Box>
}

export default PreviewPortal;