import { ellipseAddress } from "../lib/utils";

import { Web3Provider } from "@ethersproject/providers";

import Wallet from "Wallet/Wallet";
import { CheckEligibility } from "pages/CheckEligibility";
import { Logo } from "components/Logo";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { useEffect, useState } from "react";

const Home = (): JSX.Element => {
  const context = useWeb3React<Web3Provider>();
  const { active, account, library, connector } = context;
  const [activatingConnector, setActivatingConnector] = useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  return (
    <div className="App bg-blackish min-h-screen flex flex-col">
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
      <main className="bg-white flex-grow relative">
        <div className="main-content shadow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-10 sm:px-4 rounded flex flex-col">
          {active ? <CheckEligibility /> : <Wallet />}
        </div>
      </main>
    </div>
  );
};

// Web3 Wallet
function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function wrappedApp() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Home />
    </Web3ReactProvider>
  );
}

export default wrappedApp;
