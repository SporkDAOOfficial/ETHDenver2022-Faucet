import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const GetTokens = () => {
  const context = useWeb3React<Web3Provider>();
  const { connector } = context;

  const getIt = () => {
    console.log("git it")
  }

  return (
    <div className="walletButtonContainer grid gap-y-4 sm:grid-cols-2 flex-1">
      <div className="mx-auto block w-full h-full">
        <button onClick={getIt} type="button"
          className="border-2 border-purple-800 font-bold text-purple-800 px-4 py-3 transition duration-300 ease-in-out hover:bg-purple-800 hover:text-white mr-6">
          Get Sum Tokenz
        </button>
      </div>
    </div>
  );
}

export default GetTokens