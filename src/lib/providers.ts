import Portis from "@portis/web3";
import Torus from "@toruslabs/torus-embed";
import WalletConnectProvider from "@walletconnect/web3-provider";

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "INFURA_ID", // required
    },
  },
  torus: {
    package: Torus, // required
    options: {
      networkParams: {
        host: "https://localhost:8545", // optional
        chainId: 1337, // optional
        networkId: 1337, // optional
      },
      config: {
        buildEnv: "development", // optional
      },
    },
  },
  portis: {
    package: Portis, // required
    options: {
      id: "PORTIS_ID", // required
    },
  },
};
