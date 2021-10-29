// - React Imports
import { useMemo } from "react";

// - Utils
import addresses from "./address";

// - Web3 Import
import { chainIdToNetworkType, defaultNetworkId } from "./networks";
import { NFT__factory, NFT } from "types";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

export interface ContractAddresses {
  opolisNFT1: string;
  opolisNFT2: string;
}
export interface Contracts {
  // add types from type chain run typegen script
  opolisNFT1: NFT;
  opolisNFT2: NFT;
}

function useNFTContracts(): Contracts | null {
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
      opolisNFT1: NFT__factory.connect(contracts.opolisNFT1, signer),
      opolisNFT2: NFT__factory.connect(contracts.opolisNFT2, signer),
    };
  }, [library, chainId]);
  return contract;
}

export { useNFTContracts };
