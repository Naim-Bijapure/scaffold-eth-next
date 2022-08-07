import Blockies from "react-blockies";

interface IAddressInput {
  value: string;
  onChange: (arg: any) => void;
}
const AddressInput = ({ value, onChange }: IAddressInput): any => {
  return (
    <>
      <div className="form-control ">
        <label className="input-group input-group-sm">
          <input
            type="text"
            placeholder="Enter address"
            className="input input-bordered"
            value={value}
            onChange={(event): any => onChange(event.target.value)}
          />

          <span className="w-10 p-0 rounded-md bg-base-100">
            <Blockies seed={value && value.toLowerCase()} size={12} />
          </span>
        </label>
      </div>
    </>
  );
};

export default AddressInput;
