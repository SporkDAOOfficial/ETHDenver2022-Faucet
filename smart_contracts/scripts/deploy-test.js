// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
require('dotenv').config();
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const ADMIN = "0xaa8EfDD887D38882f74b52dF18bd0c294F9eC4b9"; 
  const MINTER="0x7136fbDdD4DFfa2369A9283B6E90A040318011Ca";
  const MINT = '500000000000000000000000'; 
  const ALLOWED_HITS = 10;

  // We get the token to deploy
  const BuffiTruck = await hre.ethers.getContractFactory("BuffiTruckTest");
  const buffiTruck = await BuffiTruck.deploy(MINTER, MINT);

  await buffiTruck.deployed();

  console.log("BuffiTruck Token deployed to:", buffiTruck.address);

  // We get the faucet to deploy
  const Faucet = await hre.ethers.getContractFactory("FaucetTest");
  const faucet = await Faucet.deploy(
    ADMIN, 
    buffiTruck.address, 
    ALLOWED_HITS,
    [1,2,3],
    [2,4,6]
  );

  await faucet.deployed();

  console.log("Food truck faucet is here:", faucet.address);

  await buffiTruck.mint(faucet.address, MINT);
  const faucetBal = await buffiTruck.balanceOf(faucet.address)
  console.log("Faucet had this many BuffiTruck to give out", faucetBal);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
