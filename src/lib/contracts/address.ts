import { ContractAddresses } from "./contracts";
import { NETWORK_TYPES } from "./networks";

const addresses: { [network in NETWORK_TYPES]: ContractAddresses } = {
  [NETWORK_TYPES.POLYGON]: {
    opolisNFT1: "0x81b563d92ABC481A4F14a68660457285d758Aa4c",
    opolisNFT2: "0x90332605810DcE5FCaA0454f1E0A70597d4E83b7",
  },
} as any;

export default addresses;
