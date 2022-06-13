import { QRCodeSVG } from "qrcode.react";

interface IPunkBlockie {
  address: string;
  scale: number;
}
const PunkBlockie = ({ address, scale }: IPunkBlockie): any => {
  return (
    <>
      <div className="w-full">
        <QRCodeSVG className="rounded-lg" scale={scale} value={address?.toLowerCase()} />
      </div>
    </>
  );
};

export default PunkBlockie;
