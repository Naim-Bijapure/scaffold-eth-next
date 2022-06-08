import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC<any> = ({ children }) => {
    return (
        <>
            <Header />
            <div className="h-[70vh]">{children}</div>
            <Footer />
        </>
    );
};
export default Layout;
