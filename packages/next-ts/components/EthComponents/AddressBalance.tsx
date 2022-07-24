import Blockies from "react-blockies";
import CopyToClipBoard from "react-copy-to-clipboard";
import { IoCopyOutline } from "react-icons/io5";

interface IAddress {
  address: string;
}
const AddressBalance = ({ address }: IAddress): any => {
  //   <Blockies
  //     seed="Jeremy" {/* the only required prop; determines how the image is generated */}
  //     size={10} {/* number of squares wide/tall the image will be; default = 15 */}
  //     scale={3} {/* width/height of each square in pixels; default = 4 */}
  //     color="#dfe" {/* normal color; random by default */}
  //     bgColor="#ffe" {/* background color; random by default */}
  //     spotColor="#abc" {/* color of the more notable features; random by default */}
  //     className="identicon" {/* optional class name for the canvas element; "identicon" by default */}
  //   />

  return (
    <>
      <div className="flex items-center justify-between p-1 border-2 rounded-xl  ">
        <div className="rounded-xl blockies">
          <Blockies seed={address ? address?.toLowerCase() : "aaaaa"} size={11} />
        </div>
        <div className="m-2 ">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
        <div className="">
          <CopyToClipBoard text={address}>
            {/* <button className="text-xl btn btn-ghost tooltip tooltip-top tooltip-info tooltip--open" data-tip={address}> */}
            <button className="text-xl btn btn-ghost">
              <IoCopyOutline />
            </button>
          </CopyToClipBoard>
        </div>
        <div className="flex items-center self-stretch justify-center w-24  bd--red bg-base-200">
          <div className="">$11</div>
        </div>
      </div>
    </>
  );
};

export default AddressBalance;
