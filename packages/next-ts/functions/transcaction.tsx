import { ContractTransaction, Overrides } from "ethers";
import { Watch } from "react-loader-spinner";
import { toast } from "react-toastify";

export type ContractTransactionType = (...any) => Promise<ContractTransaction>;
const NotificationMsg = ({ closeToast, toastProps }: any) => (
    <>
        <div className="flex justify-center items-center border-l-8 border-cyan-300 ">
            <Watch color="#79c3f7" height={40} />
            <div>Executing transcaction</div>
        </div>
    </>
);

const transcactor = async (tx: ContractTransactionType, argsData?: any, txData?: Overrides & { from?: string }) => {
    let executeTx: ContractTransaction = await tx.apply(this, [...argsData, txData !== undefined ? txData : null]);

    toast(<NotificationMsg />, { autoClose: false, position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: false });

    let rcpt = await executeTx.wait();
    toast.dismiss();

    toast.success("transcaction finished");

    return rcpt;
};

export default transcactor;
