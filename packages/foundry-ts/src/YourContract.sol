//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract YourContract {
    event SetPurpose(address sender, string purpose);

    mapping(address => uint256) public balance;

    string public purpose = "Building Unstoppable Apps!!!";

    constructor(string memory startingPurpose) payable {
        purpose = startingPurpose;
    }

    function setPurpose(string memory newPurpose) public payable {
        purpose = newPurpose;
        emit SetPurpose(msg.sender, purpose);
    }

    receive() external payable {}

    fallback() external payable {}
}
