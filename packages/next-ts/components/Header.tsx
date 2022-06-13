import { useRouter } from "next/router";
import Link from "next/link";

import ThemeSwitch from "./ThemeSwitch";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { FaBurn } from "react-icons/fa";
import { VscDebugAll } from "react-icons/vsc";
import NavigationTabs from "./NavigationTabs";

const Header: React.FC = () => {
    return (
        <>
            <div className="flex flex-col items-center">
                <div className="navbar bg-base-100  shadow-sm">
                    <div className="navbar-start">
                        <a className="btn btn-ghost normal-case text-sm lg:text-xl">Scaffol-eth-next</a>
                    </div>
                    <div className="navbar-center hidden lg:flex"></div>
                    <div className="navbar-end">
                        <div className="mx-5">
                            <ConnectButton
                                // chainStatus={"name"}
                                accountStatus={{
                                    smallScreen: "avatar",
                                    largeScreen: "full",
                                }}
                                showBalance={{
                                    smallScreen: false,
                                    largeScreen: true,
                                }}
                            />
                        </div>
                        <ThemeSwitch />
                    </div>
                </div>

                {/* navigatin menu tabs  */}
                <NavigationTabs />
            </div>
        </>
    );
};
export default Header;
