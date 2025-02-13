"use client"
import { Box, Text } from "@zuzjs/ui"
import { ADMIN_EMAIL } from "@/config"

type ErrorProps = {
    code?: string | number | null,
    message?: string
}

const Error : React.FC<ErrorProps> = ( { code, message } ) => {

    return (
        <Box as={`app-error flex cols aic jcc abs abc c:777`}>
            <Text as={`s:50 b:900`}>{code || `ta'da`}</Text>
            <Text as={`${code == 404 ? `s:24` : `s:30`} ${code == 404 ? `b:900` : ``}`}>{message || `it's not you, it's us`}</Text>
            {!code && <Text as={`mt:20 s:18`}>we're experiencing an internal server problem.</Text>}
            {!code && <Text as={`s:18`}>please try again in few or contact <b>{ADMIN_EMAIL}</b></Text>}
        </Box>
    )

}

export default Error