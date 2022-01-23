import { ContractAddresses } from "./contracts";
import { NETWORK_TYPES } from "./networks";

const addresses: { [network in NETWORK_TYPES]: ContractAddresses } = {
  [NETWORK_TYPES.GNOSISCHAIN]: {
    tokenFaucet: process.env.REACT_APP_TOKEN_FAUCET
  },
} as any;

export default addresses;
