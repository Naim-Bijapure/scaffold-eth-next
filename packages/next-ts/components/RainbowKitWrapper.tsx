import { darkTheme, getDefaultWallets, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { Chain, chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
            [
                chain.localhost,
                chain.hardhat,
                chain.rinkeby,
                chain.goerli,
                chain.kovan,
                chain.mainnet,
                chain.polygon,
                chain.optimism,
                chain.arbitrum,
            ],
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
            setCurrentTheme(lightTheme() as any);
        }

        if (theme === "dark") {
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
