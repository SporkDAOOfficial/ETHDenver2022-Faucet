import dotenv from "dotenv";
import express from "express";
import cors from "cors"

import { Wallet, Contract, providers, utils } from "ethers";
// TODO: ensure these are up to date
import { abi as faucetAbi } from "./abi/Faucet.json";
import { abi as tokenAbi } from "./abi/BuffiTruck.json";
import Airtable from "airtable";
import bodyParser from "body-parser";

dotenv.config();

// check env vars
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
const atBase = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID as string
);

// instantiate provider / signer / contract
const provider = new providers.JsonRpcProvider(process.env.RPC_URL);
const adminSigner = new Wallet(process.env.ADMIN_PK as string, provider);
const FAUCET_ADDRESS = process.env.FAUCET_ADDRESS as string;
const faucetContract = new Contract(FAUCET_ADDRESS, new utils.Interface([
  "function setAllowedWallet(address addr) external",
  "function token() view returns(address)"
]), adminSigner);

// setup express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = { origin: allowedOrigins  };
app.use(cors());

// output useful eth/token balances
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

app.post("/", async (req, res) => {
  try {
    const { code, address } = req.body;

    // validate params
    if (!code || !code.length) {
      res.status(500).json("No code provided");
    }

    if (!utils.isAddress(address)) {
      res.status(500).send(`Provided address invalid: ${address}`);
    }

    // handle code auth: get record with code
    return atBase(process.env.AIRTABLE_TABLE as string)
      .select({
        filterByFormula: `({Code} = '${code}')`
      })
      .firstPage(async (err, records) => {
        if (err) {
          return res.status(500).send({
            text: "Error retrieving code",
            err: err.toString()
          });
        }

        if (!records || !records.length) {
          return res.status(500).send({
            text: "code not found in db"
          });
        }

        if(records.length > 1){
          console.warn(`Record with code ${code} appears ${records.length } times in db...`);
        }

        const record = records[0];
        if (record.get("Faucet")) {
          return res.status(500).send({
            text: "Code already claimed in db"
          });
        }
        // update record:
        return atBase(process.env.AIRTABLE_TABLE as string).update(
          [
            {
              id: record.id as string,
              fields: {
                Faucet: true,
                ETH_Address: address
              }
            }
          ],
          async (err: any) => {
            if (err) {
              return res.status(500).json({
                text: "failed to update record",
                err: err.toString()
              });
            }
            try {
              const txResponse = await faucetContract.setAllowedWallet(address);
              const txRec = await txResponse.wait();
              
              console.log('Successfully added', code, txRec.transactionHash);
              
              return res.status(200).json({
                ok: true,
                code: code,
                tier: record.get("Tier ")
              });
            } catch (err) {
              return res.status(500).json({
                text: "Error:",
                // @ts-ignore
                err: err.toString()
              });
            }
          }
        );
      });

  } catch (err) {
    return res.status(500).json({
      text: "Error:",
      // @ts-ignore
      err: err.toString()
    });
  }
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(process.env.PORT, () => {
  console.log(`server started at port ${process.env.PORT}`);
  // show balances on startup:
  logBalances();
});
