import RainbowKitWrapper from "../components/RainbowKitWrapper";

import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// ----------
import Layout from "../components/Layout";
import "../styles/globals.scss";

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
                <ToastContainer />
            </ThemeProvider>
        </>
    );
}

export default App;
