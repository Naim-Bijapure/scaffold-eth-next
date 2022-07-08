pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT
import "forge-std/Test.sol";
import "../src/YourContract.sol";

contract YourContractTest is Test {
  uint256 testNumber;
  YourContract yc;

  function setUp() public {
    testNumber = 42;
    console.log("testNumber: ", testNumber);
    yc = new YourContract("yo default");
  }

  function testSetPuprpose() public {
    yc.setPurpose("MyPurpose");
  }

  function testFailSubtract43() public {
    string memory purpose = yc.purpose();
    console.log("purpose: ", purpose);
    assertEq(purpose, "MyPurpose");
  }
}
