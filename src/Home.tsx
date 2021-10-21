import { providers } from "ethers";
import { useCallback, useEffect, useReducer, useState } from "react";
import Web3Modal from "web3modal";
import { ellipseAddress } from "./lib/utils";
import { ButtonIcon } from "./ButtonIcon";
import { Welcome } from "./Welcome";
import { providerOptions } from "./lib/providers";


import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useNFTContracts } from "lib/contracts";
import Wallet from "Wallet";



const Home = (): JSX.Element => {
  const context = useWeb3React<Web3Provider>();
	const { account, active, library } = useWeb3React(); 
  const [_balance, setBalance] = useState<number | undefined | any>()

  const contract = useNFTContracts();

  useEffect(() => {
		if (!account) {
			return;
		}
		const fetchTokenBalance =  (async () => {

			const balance = await contract?.opolisNFT.balanceOf(account);
      setBalance(balance)
		})();
		//fetchTokenBalance();
	}, [account]);

  console.log(_balance, 'balance of nfts')
  console.log(account, active, library, '89') 


  
 
  
  
  

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  

  return (
    <div className="App bg-blackish min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4">
        <div className="logo">
          <img src="/OPOLIS_Text_White.png" alt="Opolis logo" />
        </div>
        <div className="signin-button flex flex-col gap-y-1">
         
            <>
              <button
                type="button"
                className="btn-primary with-icon"
              >
                <ButtonIcon />
               
                  {/* <span title={account}>{ellipseAddress(account)}</span> */}
              
                  <span>Connect Wallet</span>
                
              </button>
             
                <button
                  type="button"
                  className="text-gray-400 text-sm"
                >
                  Disconnect wallet
                </button>
            
            </>
      
        </div>
      </header>
      <main className="bg-white flex-grow relative">
          <div className="main-content shadow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-10 sm:px-4">
            {/* <Welcome disconnect={disconnect} /> */}
            <Wallet />
          </div>
      </main>
    </div>
  );
};

export default Home;
