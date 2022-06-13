pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

// import "hardhat/console.sol";

// NOTE : vs code giving warning  on forge-std import but works on compilation ignore it.
import "forge-std/Test.sol";
import "openzeppelin-contracts/contracts/utils/Address.sol";

// import "@openzeppelin/contracts/utils/Address.sol";

contract YourContract {
  event SetPurpose(address sender, string purpose);

  string public purpose;

  constructor(string memory startingPurpose) payable {
    purpose = startingPurpose;
  }

  function setPurpose(string memory newPurpose) public {
    purpose = newPurpose;
    // console.log(msg.sender, "set purpose to", purpose);
    emit SetPurpose(msg.sender, purpose);
  }

  // to support receiving ETH by default
  receive() external payable {}

  fallback() external payable {}
}
