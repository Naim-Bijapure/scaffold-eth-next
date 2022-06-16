import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "../components/Layout";
import RainbowKitWrapper from "../components/RainbowKitWrapper";

// ----------

import "../styles/globals.scss";

function App({ Component, pageProps }: AppProps): React.ReactElement {
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
