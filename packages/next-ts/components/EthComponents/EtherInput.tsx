import { useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";

interface IEtherInput {
    value: number;
    onChange: (arg: any) => void;
}
const EtherInput = ({ value, onChange }: IEtherInput) => {
    const [toggleBalance, setToggleBalance] = useState(false);
    return (
        <>
            <div className="form-control ">
                <div className="input-group ">
                    <input
                        type="text"
                        placeholder="Enter eth amount"
                        className="input input-bordered"
                        onChange={(e) => onChange(+e.target.value)}
                        value={value}
                    />
                    <button className="btn  btn-secondary ">
                        <AiOutlineSwap />
                        eth
                    </button>
                </div>
            </div>
        </>
    );
};

export default EtherInput;
