import Link from "next/link";
import { useRouter } from "next/router";

import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { VscDebugAll } from "react-icons/vsc";
import { BsViewList } from "react-icons/bs";

/**----------------------
 * add new tab here
 * ---------------------*/
const navigationTabs = [
    { tabName: "Home", pageName: "/", icon: <AiOutlineHome /> },
    { tabName: "Debug", pageName: "/Debug", icon: <VscDebugAll /> },
    { tabName: "EthComponents", pageName: "/EthComponents", icon: <BsViewList /> },
    { tabName: "Help", pageName: "/Help", icon: <AiOutlineInfoCircle /> },
];

const NavigationTabs: React.FC = () => {
    const { pathname } = useRouter();

    return (
        <>
            <div className="m-2">
                <ul className="menu flex justify-center menu-horizontal bg-base-100 rounded-box ">
                    {navigationTabs.map((tab) => {
                        return (
                            <li
                                className={`${pathname === tab.pageName ? "bordered " : "tooltip tooltip-info"}`}
                                data-tip={tab.tabName}
                                key={tab.tabName}
                            >
                                <Link href={tab.pageName}>
                                    <a>{tab.icon}</a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};
export default NavigationTabs;
