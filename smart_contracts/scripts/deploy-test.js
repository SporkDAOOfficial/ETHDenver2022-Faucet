// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const ADMIN = "0x3b8372cDffE05b7fE7Fa1b638b66c754c77Ac555"; 
  const ALLOWED_HITS = 2; 
  const FOOD_TOKENS = 5; 

  // We get the token to deploy
  const BuffiTruck = await hre.ethers.getContractFactory("BuffiTruckTest");
  const buffiTruck = await BuffiTruck.deploy(ADMIN);

  await buffiTruck.deployed();

  console.log("BuffiTruck Token deployed to:", buffiTruck.address);

  // We get the faucet to deploy
  const Faucet = await hre.ethers.getContractFactory("FaucetTest");
  const faucet = await Faucet.deploy(
    ADMIN, 
    buffiTruck.address, 
    ALLOWED_HITS,
    FOOD_TOKENS
  );

  await faucet.deployed();

  console.log("Food truck token faucet:", faucet.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
