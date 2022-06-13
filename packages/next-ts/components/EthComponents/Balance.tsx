import { useState } from "react";
import { FaDollarSign, FaEthereum } from "react-icons/fa";

interface IBalance {
  address: string;
}
const Balance = ({ address }: IBalance): any => {
  const [toggleBalance, setToggleBalance] = useState(false);
  return (
    <>
      <div className="shadow stats" onClick={(): any => setToggleBalance(!toggleBalance)}>
        <div className="flex flex-col items-center justify-center stat">
          <div className="text-2xl stat-title">{toggleBalance === false ? <FaEthereum /> : <FaDollarSign />}</div>
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
