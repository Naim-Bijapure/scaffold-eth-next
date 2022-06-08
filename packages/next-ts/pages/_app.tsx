import RainbowKitWrapper from "../components/RainbowKitWrapper";

import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";

//@ts-ignore
// import { themeChange } from "theme-change";
import { ThemeProvider } from "next-themes";
import "@rainbow-me/rainbowkit/styles.css";

function App({ Component, pageProps }: AppProps) {
    const [currentTheme, setCurrentTheme] = useState<any>();

    return (
        <>
            <ThemeProvider defaultTheme="light">
                <RainbowKitWrapper>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </RainbowKitWrapper>
            </ThemeProvider>
        </>
    );
}

export default App;
