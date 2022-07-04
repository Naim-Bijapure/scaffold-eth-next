import { useEffect, useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";

interface IEtherInput {
  value: number;
  onChange: (arg: any) => void;
  price: number;
}
const EtherInput = ({ value, onChange, price }: IEtherInput): any => {
  const [isEth, setIsEth] = useState(false);
  const [finalValue, setFinalValue] = useState(value);

  const toggleValue = (): any => {
    // on usd to eth converion
    if (!isEth === true && finalValue > 0 && price > 0) {
      const value = finalValue / price;
      setFinalValue(value);
    }
    // on eth to usd converion
    if (!isEth === false && finalValue > 0 && price > 0) {
      const value = finalValue * price;
      setFinalValue(value);
    }

    setIsEth(!isEth);
  };

  useEffect(() => {
    setFinalValue(value);
  }, [value]);

  console.log("finalValue: ", finalValue);

  return (
    <>
      <div className="form-control ">
        <div className="input-group ">
          <input
            type="text"
            placeholder="Enter eth amount"
            className="input input-bordered"
            onChange={(e): any => onChange(+e.target.value)}
            value={finalValue}
          />
          <button className="btn  btn-secondary " onClick={toggleValue}>
            <AiOutlineSwap />
            {isEth === true ? "eth" : "usd"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EtherInput;
