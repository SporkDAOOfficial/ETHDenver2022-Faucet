import { useEffect, useState } from "react";
// import { ethers } from 'ethers'
// import FaucetTest from
  // '../../smart_contracts/artifacts/contracts/Faucet.sol/FaucetTest.json'
// const faucetAddress = "0x3B44F3d1408894431adA109852a49409BD691CD8"

import { useTokenFaucet } from "lib/contracts/contracts";

const GetTokens = () => {

  const contract = useTokenFaucet();

  async function getIt() {
    console.log('getting tokens?')
    try {
      const retVal = await contract?.tokenFaucet.hitMe();
      console.log(retVal)
    } catch (error) {
      console.log(`contract.hitMe error: ${error}`)
    }
  }

  return (
    <div className="walletButtonContainer grid gap-y-4 sm:grid-cols-4 flex-1">
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
