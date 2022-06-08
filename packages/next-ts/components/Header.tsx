import { useRouter } from "next/router";
import Link from "next/link";

import ThemeSwitch from "./ThemeSwitch";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { FaBurn } from "react-icons/fa";
import { VscDebugAll } from "react-icons/vsc";

const Header: React.FC = () => {
    const { pathname } = useRouter();
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
                {/* TODO: make dynamic ading paths on a seperate file */}
                <div className="m-2">
                    <ul className="menu flex justify-center menu-horizontal bg-base-100 rounded-box ">
                        <li className={`${pathname === "/" ? "bordered " : "tooltip tooltip-info"}`} data-tip="Home">
                            <Link href={"/"}>
                                <a>
                                    <AiOutlineHome />
                                </a>
                            </Link>
                            ️
                        </li>
                        <li
                            className={`${pathname === "/Debug" ? "bordered " : "tooltip tooltip-info"}`}
                            data-tip="Debug"
                        >
                            <Link href={"/Debug"}>
                                <a>
                                    <VscDebugAll />
                                </a>
                            </Link>
                        </li>

                        <li
                            className={`${pathname === "/Help" ? "bordered " : "tooltip tooltip-info"}`}
                            data-tip="Help"
                        >
                            <Link href={"/Help"}>
                                <a>
                                    <AiOutlineInfoCircle />
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
export default Header;
