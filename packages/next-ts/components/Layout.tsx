import Header from "./Header";
import Footer from "./Footer";
import FaucetModal from "./FaucetModal";

const Layout: React.FC<any> = ({ children }) => {
    return (
        <>
            <div className="">
                <Header />
                <div className="h-[72vh] ">{children}</div>
                <FaucetModal />
                {/* <Footer /> */}
            </div>
        </>
    );
};
export default Layout;
