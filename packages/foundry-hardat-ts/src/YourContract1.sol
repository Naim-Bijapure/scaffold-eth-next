pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT


import "@openzeppelin/contracts/utils/Address.sol";
// NOTE:  forge-std lib support on only forge compile and test
// and  hardhat/console.sol only support for hardhat deploy 

// import "forge-std/Test.sol";
import "hardhat/console.sol";

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract1 {
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

    function N() public {
        purpose = "yo";
        console.log("purpose: ", purpose);
        // console.log(msg.sender, "set purpose to", purpose);
        emit SetPurpose(msg.sender, purpose);
    }

    // to support receiving ETH by default
    receive() external payable {}

    fallback() external payable {}
}
