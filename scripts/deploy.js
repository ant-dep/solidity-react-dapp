const hre = require("hardhat");

async function main() {
  // contract we'd like to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  // defining message and deploy it
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  // wait for deployment
  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });