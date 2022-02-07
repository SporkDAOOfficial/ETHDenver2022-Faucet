import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Confirmed } from "./Confirmed";
import { Unconfirmed } from "./Unconfirmed";
import { BigNumber, BigNumberish, ethers } from "ethers";
import { useTokenFaucet } from "lib/contracts/contracts";

export const CheckEligibility = () => {
  const { account } = useWeb3React();

  const contract = useTokenFaucet();

  useEffect(() => {
    if (!account) {
      return;
    }
    (async () => {
      try {
        const balance: BigNumberish | BigNumber | any =
          await contract?.tokenFaucet.balanceOf(account);

        if (typeof account !== "undefined") {
          //Check whether account has been funded
        } else {
          //Call token faucet
        }
      } catch (e) {
        setConfirmed(false);
      }

      // console.log("balance1", balance.toLocaleString());
    })();
  }, [account, contract?.tokenFaucet]);

  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  async function CheckEligibility(){
    //function to check eligibility to claim tokens from faucet
  }
  async function requestTokens() {
    //function to call the request tokens method
  }

  return confirmed == null ? (
    <>
      <header className="text-center mb-4">
        <h2 className="header2 mb-4">Welcome!</h2>
        <h3 className="header3 italic mb-6 px-4 sm:px-10">
          See if you’re eligible for a special gift from Opolis
        </h3>
      </header>
      <div>
        <button
          className="btn-primary mx-auto block mb-6"
          onClick={requestTokens}
        >
          Confirm eligibility
        </button>
        <p className="section-description text-center px-4 md:px-24">
          We’re checking to see if you have both Opolis NFTs from NFT.NYC
        </p>
      </div>
    </>
  ) : confirmed ? (
    <Confirmed />
  ) : (
    <Unconfirmed />
  );
};
