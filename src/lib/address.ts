import { ContractAddresses } from './contracts';
import { NETWORK_TYPES } from './networks';

const addresses: { [network in NETWORK_TYPES]: ContractAddresses } = {
  [NETWORK_TYPES.KOVAN]: {
    opolisNFT: '0xd9145CCE52D386f254917e481eB44e9943F39138'
  },
} as any;

export default addresses;