import { useEffect, useState } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import { Web3Provider } from "@ethersproject/providers";

import _ from "lodash";

import { injected } from "../lib/contracts/connectors";
import { Spinner } from "../components/Spinner";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { walletMeta } from "assets/walletMeta";

export enum ConnectorNames {
  MetaMask = "MetaMask",
}

const connectorsByName: {
  [connectorName in ConnectorNames]: AbstractConnector;
} = {
  [ConnectorNames.MetaMask]: injected,
};

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Header = () => {
  const {
    account,
    // activate,
    active,
    chainId,
    // library,
    connector,
    deactivate,
    error,
    // provider,
    // setError,
  } = useWeb3React();

  return (
    // <>
    //   <h4>{active ? "🟢" : error ? "🔴" : "🟠"}</h4>
    // </>
    <header className="text-center">
      <h2 className="header1">Sign in with Web3</h2>
      {active ||
        (error && (
          <div className="text-error">
            <p>{getErrorMessage(error)}</p>
            <button
              className="text-black hover:underline"
              aria-label="Deactivate and start over"
              onClick={() => deactivate()}
            >
              Click here
            </button>{" "}
            to start over.
          </div>
        ))}
    </header>
  );
}

const Wallet = () => {
  const context = useWeb3React<Web3Provider>();
  const { connector, active, activate, error } = context;

  const connectArbitrum = async () => {
    const provider = await connector?.getProvider()
    if (provider) {
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x66EEB' }],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x66EEB',
                  chainName: 'Arbitrum Testnet',
                  rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
                  blockExplorerUrls: ['https://rinkeby-explorer.arbitrum.io'],
                },
              ],
            });
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
    }
  }

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      console.log("disconnect happening");
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  return (
    <>
      <Header />
      <>
        <div className="walletButtonContainer grid gap-y-4 sm:grid-cols-2 flex-1">
          {(_.keys(connectorsByName) as ConnectorNames[]).map((name) => {
            const currentConnector = connectorsByName[name];
            const activating = currentConnector === activatingConnector;
            const connected = currentConnector === connector;
            const disabled = !!activatingConnector || connected || !!error;
            const nameLookupKey = name.toLowerCase();

            return (
              <div className="mx-auto block w-full h-full" key={name}>
                {
                  (active === true)
                    ? <span>You are Connected</span>
                    : <button className="network-btns text-center relative block w-full h-full" type="button"
                      disabled={disabled}
                      onClick={() => {
                        setActivatingConnector(currentConnector);
                        activate(connectorsByName[name]);
                      }}
                    >
                      {activating && (
                        <Spinner className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 h-8 z-10" />
                      )}
                      <img className="mx-auto mb-2" src={walletMeta[nameLookupKey]?.uri} alt="" role="presentation" style={{ maxHeight: "70px" }} />
                      <h3 className="header5 font-sans">{name}</h3>
                      <h4 className="web3-block-description">{walletMeta[nameLookupKey]?.description}</h4>
                    </button>
                }
              </div>
            );
          })}
        </div>
      </>
    </>
  );
}

export default Wallet;