const hre = require("hardhat");

async function main() {
  // contract we'd like to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  // defining message and deploy it
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  // wait for deployment
  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
