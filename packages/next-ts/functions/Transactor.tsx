import { ContractTransaction, Overrides } from "ethers";
import { Watch } from "react-loader-spinner";
import { toast } from "react-toastify";

export type ContractTransactionType = (...any) => Promise<ContractTransaction>;
const NotificationMsg = ({ closeToast, toastProps }: any) => (
  <>
    <div className="flex items-center justify-center border-l-8 border-cyan-300">
      <Watch color="#79c3f7" height={40} />
      <div>Executing transcaction</div>
    </div>
  </>
);

const Transactor = async (tx: ContractTransactionType, argsData?: any, txData?: Overrides & { from?: string }) => {
  const executeTx: ContractTransaction = await tx.apply(this, [...argsData, txData !== undefined ? txData : null]);

  // reading current theme from localstorage
  let theme = localStorage.getItem("theme");
  theme = theme === null ? "light" : theme;

  toast(<NotificationMsg />, {
    autoClose: false,
    position: toast.POSITION.BOTTOM_RIGHT,
    closeOnClick: false,
    theme: theme as any,
  });

  const rcpt = await executeTx.wait();
  toast.dismiss();

  toast.success("transcaction finished", {
    position: toast.POSITION.BOTTOM_RIGHT,
    theme: theme as any,
  });

  return rcpt;
};

export default Transactor;
