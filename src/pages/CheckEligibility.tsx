import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { Confirmed } from "./Confirmed";
import { Unconfirmed } from "./Unconfirmed";
import { BigNumber, BigNumberish, ethers } from "ethers";
import { useNFTContracts } from "lib/contracts/contracts";

export const CheckEligibility = () => {
  const { account } = useWeb3React();
  const [_balance1, setBalance1] = useState<
    BigNumberish | BigNumber | undefined | any
  >();

  const [_balance2, setBalance2] = useState<
    BigNumberish | BigNumber | undefined | any
  >();

  const contract = useNFTContracts();

  useEffect(() => {
    if (!account) {
      return;
    }
    (async () => {
      try {
        const balance: BigNumberish | BigNumber | any =
          await contract?.opolisNFT1.balanceOf(account);

        if (typeof account !== "undefined") {
          setBalance1(ethers.utils.formatUnits(balance));
        } else {
          setConfirmed(false);
        }
      } catch (e) {
        setConfirmed(false);
      }

      // console.log("balance1", balance.toLocaleString());
    })();

    (async () => {
      try {
        const balance: BigNumberish | BigNumber | any =
          await contract?.opolisNFT2.balanceOf(account);

        if (typeof account !== "undefined") {
          setBalance2(ethers.utils.formatUnits(balance));
        } else {
          setConfirmed(false);
        }
      } catch (e) {
        setConfirmed(false);
      }

      // console.log("balance2", balance.toLocaleString());
    })();
  }, [account, contract?.opolisNFT1, contract?.opolisNFT2]);

  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  async function confirmEligibility() {
    setConfirmed(_balance1 > 0 && _balance2 > 0);
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
          onClick={confirmEligibility}
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
