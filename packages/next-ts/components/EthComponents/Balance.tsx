import { useState } from "react";
import { FaDollarSign, FaEthereum } from "react-icons/fa";

interface IBalance {
    address: string;
}
const Balance = ({ address }: IBalance) => {
    const [toggleBalance, setToggleBalance] = useState(false);
    return (
        <>
            <div className="stats shadow " onClick={() => setToggleBalance(!toggleBalance)}>
                <div className="stat flex flex-col items-center justify-center ">
                    <div className="stat-title text-2xl">
                        {toggleBalance === false ? <FaEthereum /> : <FaDollarSign />}
                    </div>
                    <div className="stat-value">{toggleBalance === false ? 100 : 2000}</div>
                    <div className="stat-desc">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Balance;
