import { darkTheme, getDefaultWallets, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { Chain, chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { targedChains, targetNetowrks } from "./configs/appContract.config";

const RainbowKitWrapper: React.FC<any> = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme());

  const [chains, setChains] = useState<Chain[]>();
  const [provider, setProvider] = useState<any>();
  const [wagmiClient, setWagmiClient] = useState<any>(undefined);

  /**----------------------
   * load rainbow confgs
   * ---------------------*/
  useEffect(() => {
    const { chains, provider } = configureChains(
      [...targedChains],
      [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
    );
    setChains(chains);

    const { connectors } = getDefaultWallets({
      appName: "My RainbowKit App",
      chains,
    });

    const wagmiClient = createClient({
      autoConnect: true,
      connectors,
      provider,
    });
    setWagmiClient(wagmiClient);
  }, []);

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
      {wagmiClient !== undefined && (
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains as Chain[]} theme={currentTheme}>
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
      )}
    </div>
  );
};
export default RainbowKitWrapper;
