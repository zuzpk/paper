"use client"
import { Box, Text } from "@zuzjs/ui";

export default function Home() {
  return <Box as={`w:100vw flex aic jcc h:90vh cols gap:15`}>
      <Text as={`text-clip bgi:gradient-to-right-$primary-$secondary s:36 b:900`}>@zuzjs/ui boilerplate</Text>
      <Text as={`s:18`}>Get started by editing <code>src/app/page.tsx</code>.</Text>  
    </Box>
}
