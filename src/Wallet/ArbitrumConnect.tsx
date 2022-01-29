import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

export default function ArbitrumConnect() {
  const context = useWeb3React<Web3Provider>();
  const { connector } = context;

  const connectArbitrum = async () => {
    const provider = await connector?.getProvider()
    if (provider) {
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x66EEB' }],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x66EEB',
                  chainName: 'Arbitrum Testnet',
                  rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
                  blockExplorerUrls: ['https://rinkeby-explorer.arbitrum.io'],
                },
              ],
            });
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
    }
  }

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      console.log("disconnect happening");
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  return (
    <div className="walletButtonContainer grid gap-y-4 sm:grid-cols-2 flex-1">
      <div className="mx-auto block w-full h-full">
        <button onClick={connectArbitrum} type="button"
          className="border-2 border-rose-400 font-bold text-rose-400 px-4 py-3 transition duration-300 ease-in-out hover:bg-rose-400 hover:text-white mr-6">
          Connect Arbitrum Rinkeby
        </button>
      </div>
    </div>
  );
}