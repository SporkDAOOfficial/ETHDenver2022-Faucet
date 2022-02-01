import { useEffect, useState, useContext } from "react";
// import { useWeb3React } from "@web3-react/core";
// import { Web3Provider } from "@ethersproject/providers";

import { ViewContext } from "../context/AppContext"

export default function ArbitrumConnect() {
  // const context = useWeb3React<Web3Provider>();
  // const { connector } = context;

  const { provider } = useContext(ViewContext)

  const connectArbitrum = async () => {
    // const provider = await connector?.getProvider()
    if (provider) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x66eeb' }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x66eeb', // A 0x-prefixed hexadecimal string
                  blockExplorerUrls: ['https://rinkeby-explorer.arbitrum.io'],
                  chainName: 'Arbitrum Rinkeby',
                  nativeCurrency: {
                    decimals: 18,
                    name: 'Ether',
                    symbol: 'ARETH' // 2-6 characters long
                  },
                  rpcUrls: ['https://rinkeby.arbitrum.io/rpc']
                },
              ],
            });
          } catch (addError) {
            // user rejects the request to "add chain" or param values are wrong, maybe you didn't use hex above for `chainId`?
            console.log(`wallet_addEthereumChain Error: ${addError.message}`)
            console.log(addError)
          }
        }
        // handle other "switch" errors
      }
    }
  }

  // handle logic to recognize the connector currently being activated
  // const [activatingConnector, setActivatingConnector] = useState<any>();
  //
  // useEffect(() => {
  //   if (activatingConnector && activatingConnector === connector) {
  //     console.log("disconnect happening");
  //     setActivatingConnector(undefined);
  //   }
  // }, [activatingConnector, connector]);

  return (
    <div className="walletButtonContainer grid gap-y-4 sm:grid-cols-2 flex-1">
      <div className="mx-auto block w-full h-full">
        <button onClick={connectArbitrum} type="button"
          className="border-2 border-purple-800 font-bold text-purple-800 px-4 py-3 transition duration-300 ease-in-out hover:bg-purple-800 hover:text-white mr-6">
          Connect Arbitrum Rinkeby
        </button>
      </div>
    </div>
  );
}
