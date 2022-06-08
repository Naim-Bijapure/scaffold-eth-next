import type { NextPage } from "next";
import { useAccount, useFeeData } from "wagmi";
import { AiOutlineHome } from "react-icons/ai";
const Home: NextPage = () => {
    // const { data, isLoading } = useAccount();
    const { data, isError, isLoading } = useFeeData();
    console.log("data: ", data);
    return (
        <div>
            <main>index page</main>
        </div>
    );
};

export default Home;
