// - React Imports
import React from "react";
import { useMemo } from 'react';

// - Utils
import {Maybe} from 'true-myth';
import addresses from './address';

// - Web3 Import 
import * as ethers from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { chainIdToNetworkType, defaultNetworkId, NETWORK_TYPES } from './networks';

import { NFT__factory, NFT } from "types";


 
export interface ContractAddresses {
    opolisNFT: string;
	opolisNFT1: string;

}

export interface Contracts {
	// add types from type chain run typegen script
	opolisNFT: NFT 

}

function useNFTContracts() : Contracts | null {
	const context = useWeb3React<Web3Provider>();
	const { library, active, chainId } = context;
	const contract = useMemo((): Contracts | null => {
		let contracts;
		let signer: ethers.VoidSigner | ethers.Signer = new ethers.VoidSigner(
			ethers.constants.AddressZero,
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
			opolisNFT: NFT__factory.connect(contracts.opolisNFT, signer),
		};
	}, [active, library, chainId]);
	return contract;
}
console.log((() => useNFTContracts()))
export { useNFTContracts };
