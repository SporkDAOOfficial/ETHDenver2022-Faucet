export enum NETWORK_TYPES {
  MAINNET = "MAINNET",
  RINKEBY = "RINKEBY",
  ARBITRUM_RINKEBY = "ARBITRUM RINKEBY",
  ROPSTEN = "ROPSTEN",
  LOCAL = "LOCAL",
  KOVAN = "KOVAN",
  GNOSISCHAIN = "GNOSIS CHAIN",
}

export const defaultNetworkId: number = Number(1);

export const chainIdToNetworkType = (chainId: number): NETWORK_TYPES => {
  switch (chainId) {
    case 1:
      return NETWORK_TYPES.MAINNET;
    case 3:
      return NETWORK_TYPES.ROPSTEN;
    case 4:
      return NETWORK_TYPES.RINKEBY;
    case 421611:
      return NETWORK_TYPES.ARBITRUM_RINKEBY;
    case 42:
      return NETWORK_TYPES.KOVAN;
    case 100:
      return NETWORK_TYPES.GNOSISCHAIN;
    default:
      return NETWORK_TYPES.LOCAL;
  }
};
