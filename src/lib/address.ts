import { ContractAddresses } from './contracts';
import { NETWORK_TYPES } from './networks';

const addresses: { [network in NETWORK_TYPES]: ContractAddresses } = {
  [NETWORK_TYPES.KOVAN]: {
    opolisNFT: 'ADD ADDRESS HERE'
  },
} as any;

export default addresses;