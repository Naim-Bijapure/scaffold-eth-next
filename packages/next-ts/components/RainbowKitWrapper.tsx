import { darkTheme, getDefaultWallets, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { chains, targedChains, wagmiClient } from "./configs/appContract.config";

// const { chains, provider } = configureChains(
//   [...targedChains],
//   [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
// );

// const { connectors } = getDefaultWallets({
//   appName: "Scaffol-eth-next",
//   chains,
// });

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider,
// });

const RainbowKitWrapper: React.FC<any> = ({ children }) => {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme());

  // set current rainbow theme
  useEffect(() => {
    if (theme === "light") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setCurrentTheme(lightTheme() as any);
    }

    if (theme === "dark") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setCurrentTheme(darkTheme() as any);
    }
  }, [theme]);

  return (
    <div>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={currentTheme}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
};
export default RainbowKitWrapper;
