export enum NETWORK_TYPES {
  MAINNET = "MAINNET",
  RINKEBY = "RINKEBY",
  ROPSTEN = "ROPSTEN",
  LOCAL = "LOCAL",
  KOVAN = "KOVAN",
  POLYGON = "POLYGON",
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
    case 42:
      return NETWORK_TYPES.KOVAN;
    case 137:
      return NETWORK_TYPES.POLYGON;
    default:
      return NETWORK_TYPES.LOCAL;
  }
};
