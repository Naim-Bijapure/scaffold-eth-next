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
  string public newPuprpose = "this is new default purpose ";

  mapping(address => string) public mappedData;

  enum Status {
    Pending,
    Shipped,
    Accepted,
    Rejected,
    Canceled
  }

  Status public status;

  uint256[] public arr;

  constructor(string memory startingPurpose) payable {
    purpose = startingPurpose;
  }

  function setPurpose(string memory _newPurpose) public {
    purpose = _newPurpose;
    // console.log(msg.sender, "set purpose to", purpose);
    emit SetPurpose(msg.sender, purpose);
  }

  function setNewPurpose(
    string memory _newPurpose,
    uint256 data2,
    uint256 data3
  ) public {
    newPuprpose = _newPurpose;
    // console.log(msg.sender, "set purpose to", purpose);
    emit SetPurpose(msg.sender, purpose);
  }

  function setMappings(address _address, string memory data) public {
    mappedData[_address] = data;

    emit SetPurpose(msg.sender, purpose);
  }

  function setEnumStatus(Status _status, string memory data) public returns (string memory) {
    status = _status;

    emit SetPurpose(msg.sender, purpose);
    return data;
  }

  function getArray(string memory data) public view returns (uint256[] memory) {
    return arr;
  }

  function setPupshArray(uint256 value) public {
    arr.push(value);
  }

  function setPureFunction(string memory data) public view returns (string memory) {
    return "cool view return function";
  }

  function setPayableFunction(string memory data) public payable returns (string memory) {
    return "cool this is payable ";
  }

  // to support receiving ETH by default
  receive() external payable {}

  fallback() external payable {}
}
