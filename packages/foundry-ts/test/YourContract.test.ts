import { expect, use } from "chai";
import { deployContract, MockProvider, solidity } from "ethereum-waffle";
import { Contract } from "ethers";
import { YourContract, YourContract__factory } from "generated/contract-types";

use(solidity);

/** ----------------------
 * test contracts with ehterjs and waffle
 * ---------------------*/

// refer waffle doc for test cases => https://ethereum-waffle.readthedocs.io/en/latest/index.html
describe("Test  YourContract ", () => {
  const [wallet, walletTo] = new MockProvider().getWallets();
  let yourContract: YourContract | Contract;

  before(async () => {
    yourContract = await deployContract(wallet, YourContract__factory, ["defaultPurpose"]);
    console.log("yourContract: address ", yourContract.address);
  });

  it("set purpose", async () => {
    await yourContract.setPurpose("testingPurpose");
    expect(await yourContract.purpose()).to.equal("testingPurpose");
  });

  it("get purpose", async () => {
    const purpose = await yourContract.purpose();
    expect(purpose).to.equal("testingPurpose");
  });
});
