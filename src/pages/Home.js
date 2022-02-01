import { useEffect, useState, useContext } from "react";
import { ellipseAddress } from "../lib/utils";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { ViewContext } from "../context/AppContext"

import { Logo } from "components/Logo";
import Wallet from "Wallet/Wallet";
import ArbitrumConnect from "Wallet/ArbitrumConnect";
import GetTokens from "Wallet/GetTokens";

const Home = () => {
  const context = useWeb3React();
  const { active, error, account, library, connector } = context;
  const [activatingConnector, setActivatingConnector] = useState();
  const unsupportedChain = error instanceof UnsupportedChainIdError
  console.log(unsupportedChain)

	const { user, provider, contracts, state, dispatch, chainId } = useContext(ViewContext)

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  return (
    <div className="App min-h-screen flex flex-col overflow-y-auto sm:overflow-hidden">
      <header className="flex justify-between items-center p-4">
        <Logo />
        <div className="signin-button flex flex-col gap-y-1">
          {account && (
            <span className="text-white" title={account}>
              {ellipseAddress(account)}
              {!!library?.connection?.url && (
                <>
                  <br />
                  <span className="text-gray-400 text-center block">
                    {library?.connection?.url} {" | "}
                    <button
                      onClick={() => {
                        setActivatingConnector(undefined);
                        context.deactivate();
                      }}
                    >
                      deactivate
                    </button>
                  </span>
                </>
              )}
            </span>
          )}
        </div>
      </header>
      <main className="flex-grow relative">
        <div className="main-content shadow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-10 sm:px-4 rounded flex flex-col">
          { 
            unsupportedChain
              ? <ArbitrumConnect />
              : !active
                ? <Wallet />
                : active && <GetTokens />
          }
        </div>
      </main>
    </div>
  );
};

export default Home;
