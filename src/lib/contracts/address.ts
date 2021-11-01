import { ContractAddresses } from "./contracts";
import { NETWORK_TYPES } from "./networks";

const addresses: { [network in NETWORK_TYPES]: ContractAddresses } = {
  [NETWORK_TYPES.POLYGON]: {
    opolisNFT1: process.env.REACT_APP_OPOLIS_NFT_1,
    opolisNFT2: process.env.REACT_APP_OPOLIS_NFT_2,
  },
} as any;

export default addresses;
