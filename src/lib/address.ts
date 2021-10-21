import { ContractAddresses } from "./contracts";
import { NETWORK_TYPES } from "./networks";

const addresses: { [network in NETWORK_TYPES]: ContractAddresses } = {
  [NETWORK_TYPES.POLYGON]: {
    opolisNFT: "0xb2a032aF5356f35215125C7FD5DDf99ee2d4b3d8",
  },
} as any;

export default addresses;
