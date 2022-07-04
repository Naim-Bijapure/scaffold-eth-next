import "@rainbow-me/rainbowkit/styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import Layout from "../components/Layout";
import RainbowKitWrapper from "../components/RainbowKitWrapper";
import StoreProvider from "../store/StoreProvider";

// ----------

import "../styles/globals.scss";

function App({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <>
      <ThemeProvider defaultTheme="light">
        <StoreProvider>
          <RainbowKitWrapper>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitWrapper>
          <ToastContainer />
        </StoreProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

