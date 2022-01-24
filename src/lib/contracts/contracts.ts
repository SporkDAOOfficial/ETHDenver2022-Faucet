// - React Imports
import { useMemo } from "react";

// - Utils
import addresses from "./address";

// - Web3 Import
import { chainIdToNetworkType, defaultNetworkId } from "./networks";
import { Faucet__factory, Faucet, ERC20__factory, ERC20 } from "../../types/ethers-contracts";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

export interface ContractAddresses {
  tokenFaucet: string;
  //foodToken: string;
}
export interface Contracts {
  // add types from type chain run typegen script
  tokenFaucet: Faucet;
  //foodToken: ERC20;
}

function useTokenFaucet(): Contracts | null {
  const context = useWeb3React<Web3Provider>();
  const { library, chainId } = context;
  const contract = useMemo((): Contracts | null => {
    let contracts;
    let signer: ethers.VoidSigner | ethers.Signer = new ethers.VoidSigner(
      ethers.constants.AddressZero
    );
    if (!library) {
      contracts = addresses[chainIdToNetworkType(defaultNetworkId)];
    } else {
      if (!chainId) {
        console.error(`No chainid detected;`);
        return null;
      }

      contracts = addresses[chainIdToNetworkType(chainId)];
      signer = library.getSigner();
    }

    if (!contracts) {
      console.error(`chain not supported`);
      return null;
    }

    return {
      tokenFaucet: Faucet__factory.connect(contracts.tokenFaucet, signer),
    };
  }, [library, chainId]);
  return contract;
}

export { useTokenFaucet };
