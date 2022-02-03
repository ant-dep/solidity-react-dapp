//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }
    // public : can be read from anywhere (frontend). view : reading from Blockchain
    function greet() public view returns (string memory) {
        return greeting; // returns a string (new greeting upadated)
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting; // updating the greeting with arguments passed in
    }
}
