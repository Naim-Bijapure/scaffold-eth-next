import Blockies from "react-blockies";

interface IAddressInput {
    value: string;
    onChange: (arg: any) => void;
}
const AddressInput = ({ value, onChange }: IAddressInput) => {
    return (
        <>
            <div className="form-control">
                <label className="input-group input-group-sm ">
                    <input
                        type="text"
                        placeholder="Enter address"
                        className="input input-bordered input-sm p-1  my-1 placeholder:p-3 "
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                    />

                    <span className="rounded-md w-10 p-0 bg-base-100 ">
                        <Blockies seed={value.toLowerCase()} size={10} />
                    </span>
                </label>
            </div>
        </>
    );
};

export default AddressInput;
