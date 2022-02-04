import dotenv from "dotenv";
import express from "express";
import { Wallet, Contract, providers, utils } from "ethers";
// TODO: ensure these are up to date
import { abi as faucetAbi } from "./abi/Faucet.json";
import { abi as tokenAbi } from "./abi/BuffiTruck.json";

dotenv.config();

// check env variables
[
  "RPC_URL",
  "ADMIN_PK",
  "FAUCET_ADDRESS",
  "PORT",
  "AIRTABLE_BASE_ID",
  "AIRTABLE_TABLE",
  "AIRTABLE_API_KEY"
].forEach((envVar: string) => {
  if (!process.env[envVar]) {
    throw new Error("Missing environmental variable " + envVar);
  }
});

// instantiate provider / signer / contract
const provider = new providers.JsonRpcProvider(process.env.RPC_URL);
const adminSigner = new Wallet(process.env.ADMIN_PK as string, provider);
const FAUCET_ADDRESS = process.env.FAUCET_ADDRESS as string;
const faucetContract = new Contract(FAUCET_ADDRESS, faucetAbi, adminSigner);

const app = express();

const logBalances = async () => {
  const adminBalance = await provider.getBalance(adminSigner.address);
  console.log();
  console.log(`*** Admin wallet address: ${adminSigner.address} *** `);
  console.log(
    `*** Admin ETH balance: ${utils.formatEther(adminBalance)} ETHER *** `
  );
  const tokenAddress = (await faucetContract.token()) as string;
  const tokenContract = new Contract(tokenAddress, tokenAbi, provider);

  console.log();
  console.log(`*** Faucet address ${FAUCET_ADDRESS} *** `);
  const faucetEthBalance = await provider.getBalance(FAUCET_ADDRESS);

  console.log(
    `*** Faucet ETH Balance: ${utils.formatEther(faucetEthBalance)} Ether *** `
  );
  const faucetTokenBalance = await tokenContract.balanceOf(FAUCET_ADDRESS);

  console.log(
    `*** Faucet Token Balance: ${utils.formatEther(faucetTokenBalance)} *** `
  );
};

const handleCodeAuth = (code: string): boolean => {
  return true;
};

app.post("/:code/:address", async (req, res) => {
  try {
    const { code, address } = req.params;

    // validate params
    if (!code.length) {
      res.status(500).send("No code provided");
    }

    if (!utils.isAddress(address)) {
      res.status(500).send(`Provided address invalid: ${address}`);
    }

    // handle code

    // check result of handle code (500 if error)

    // check if already in whitelist

    // if not, add to whitelist

    const txResponse = faucetContract.setAllowedWallet();
    await txResponse.wait();
    // tier
    // res.status(200)with the receipt

    res.status(500).send("already a thing");
  } catch (err) {}
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(process.env.PORT, () => {
  console.log(`server started at port ${process.env.PORT}`);
  // show balances on startup:
  logBalances();
});

// TODO?:  sanityScript: ensure all claimed codes are indeed in whitelist

// if (require.main === module){

// }
