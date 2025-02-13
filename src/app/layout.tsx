"use client"
import "@/app/css/app.scss";
import Wrapper from "./wrapper";
import { GA_MEASUREMENT_ID } from "@/config";
import Script from "next/script";
import { ThemeProvider, useColorScheme } from "@zuzjs/ui";
// import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const RootLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.zuzcdn.net" />
        <link rel="stylesheet" href="https://fonts.zuzcdn.net/public/wj0HGfqhv/style.css" />
      </head>
      <body>
        <ThemeProvider>
          <Wrapper>{children}</Wrapper>
          {GA_MEASUREMENT_ID != "__" && <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />}
          {GA_MEASUREMENT_ID != "__" && <Script id={`google-ga`}>
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');`}
          </Script>}
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout