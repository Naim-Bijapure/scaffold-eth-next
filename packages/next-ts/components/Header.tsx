

import { ConnectButton } from "@rainbow-me/rainbowkit";

import NavigationTabs from "./NavigationTabs";
import ThemeSwitch from "./ThemeSwitch";

const Header: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="navbar bg-base-100  shadow-sm">
          <div className="navbar-start">
            <a className="text-sm normal-case btn btn-ghost lg:text-xl">Scaffol-eth-next</a>
          </div>
          <div className="hidden navbar-center lg:flex"></div>
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
