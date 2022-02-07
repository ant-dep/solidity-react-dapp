pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
  string public name = "Solidity React Token";
  string public symbol = "SRT";
  uint public totalSupply = 1000000;
  address public owner;
  mapping(address => uint) balances;

  constructor() {
      // giving all the supply to its creator
    balances[msg.sender] = totalSupply;
    owner = msg.sender;
  }

  function transfer(address to, uint amount) external {
      // checks if account balance is enough
    require(balances[msg.sender] >= amount, "Not enough tokens");
    // decude from sender
    balances[msg.sender] -= amount;
    // add to receiver
    balances[to] += amount;
  }

  function balanceOf(address account) external view returns (uint) {
      // check account balance
    return balances[account];
  }
}