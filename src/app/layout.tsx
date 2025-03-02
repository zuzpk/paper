"use client"
import "@/app/css/app.scss";
import { GA_MEASUREMENT_ID } from "@/config";
import { ThemeProvider } from "@zuzjs/ui";
import Script from "next/script";
import Wrapper from "./wrapper";

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