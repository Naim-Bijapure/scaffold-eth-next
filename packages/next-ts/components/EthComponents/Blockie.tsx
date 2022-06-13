import React from "react";
import Blockies from "react-blockies";

interface IBlockie {
  address: string;
  scale: number;
}
const Blockie = ({ address, scale }: IBlockie): React.ReactElement => {
  return (
    <>
      <div className=" blockies ">
        <Blockies seed={address?.toLowerCase()} size={scale} />
      </div>
    </>
  );
};

export default Blockie;
