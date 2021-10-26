import { useEffect, useState } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
// import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import { Web3Provider } from "@ethersproject/providers";

import _ from "lodash";
import {
  useEagerConnect,
  useInactiveListener,
} from "../lib/hooks/provider-hooks";
import {
  injected,
  walletconnect,
  portis,
  torus,
} from "../lib/contracts/connectors";
import { Spinner } from "../Spinner";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { walletMeta } from "assets/walletMeta";

enum ConnectorNames {
  MetaMask = "MetaMask",
  WalletConnect = "WalletConnect",
  Portis = "Portis",
  Torus = "Torus",
}

const connectorsByName: {
  [connectorName in ConnectorNames]: AbstractConnector;
} = {
  [ConnectorNames.MetaMask]: injected,

  [ConnectorNames.WalletConnect]: walletconnect,

  [ConnectorNames.Torus]: torus,
  [ConnectorNames.Portis]: portis,
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
function Header() {
  const { active, error, deactivate } = useWeb3React();

  return (
    // <>
    //   <h4>{active ? "🟢" : error ? "🔴" : "🟠"}</h4>
    // </>
    <header className="text-center mb-3">
      <h2 className="header2">Sign in with Web3</h2>
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

export default function Wallet() {
  const context = useWeb3React<Web3Provider>();
  const { connector, chainId, activate, deactivate, active, error } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <>
      <Header />

      <>
        <div className="walletButtonContainer grid gap-y-4 sm:grid-cols-2 grid-rows-2 flex-1">
          {(_.keys(connectorsByName) as ConnectorNames[]).map((name) => {
            const currentConnector = connectorsByName[name];
            const activating = currentConnector === activatingConnector;
            const connected = currentConnector === connector;
            const disabled =
              !triedEager || !!activatingConnector || connected || !!error;
            const nameLookupKey = name.toLowerCase();

            return (
              <div className="mx-auto block w-full h-full" key={name}>
                <button
                  className="network-btns text-center relative block w-full h-full"
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    setActivatingConnector(currentConnector);
                    activate(connectorsByName[name]);
                  }}
                >
                  {activating && (
                    <Spinner className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 h-8" />
                  )}
                  <img
                    src={walletMeta[nameLookupKey]?.uri}
                    alt=""
                    role="presentation"
                    className="mx-auto mb-2"
                    style={{ maxHeight: "50px" }}
                  />
                  <h3 className="header5 font-sans">{name}</h3>
                  <h4 className="web3-block-description">
                    {walletMeta[nameLookupKey]?.description}
                  </h4>
                </button>
              </div>
            );
          })}
        </div>
        {/* {!!(library && account) &&
					connector === connectorsByName[ConnectorNames.Network] &&
					chainId && (
						<div key="switch-network-button" className="button-target">
							<button
								onClick={() => {
									(connector as any).changeChainId(chainId === 1 ? 4 : 1);
								}}
							>
								Switch Networks
							</button>
						</div>
					)} */}
        {/* {connector === connectorsByName[ConnectorNames.WalletConnect] && (
					<div key="kill-walletconnect" className="button-target">
						<button
							onClick={() => {
								(connector as any).close();
							}}
						>
							Kill WalletConnect Session
						</button>
					</div>
				)} */}
        {/* {connector === connectorsByName[ConnectorNames.Fortmatic] && (
					<div key="kill-fortmatic" className="button-target">
						<button
							onClick={() => {
								(connector as any).close();
							}}
						>
							Kill Fortmatic Session
						</button>
					</div>
				)} */}
        {connector === connectorsByName[ConnectorNames.Portis] && (
          <>
            {chainId !== undefined && (
              <div key="switch-network-button-portis" className="button-target">
                <button
                  onClick={() => {
                    (connector as any).changeNetwork(chainId === 1 ? 100 : 1);
                  }}
                >
                  Switch Networks
                </button>
              </div>
            )}
            <div key="kill-portis" className="button-target">
              <button
                onClick={() => {
                  (connector as any).close();
                }}
              >
                Kill Portis Session
              </button>
            </div>
          </>
        )}
      </>
    </>
  );
}
