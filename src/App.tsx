// MetaMask, Wallet Connect, Torus, Portis
import { useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";

interface Props {
  fullAddress?: string;
  formattedAddress?: string;
}

function App() {
  const [account, setAccount] = useState<Props>({});

  useEffect(() => {
    disconnect();
  }, []);

  const providerOptions = {
    /* See Provider Options Section */
  };

  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required
  });

  async function disconnect() {
    web3Modal.clearCachedProvider();
    setAccount({});
  }

  async function onClick() {
    const provider = await web3Modal.connect();

    try {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();

      if (accounts) {
        let str = accounts[0];
        const formattedAddress = `${str.substring(0, 6)}…${str.substring(
          str.length - 4
        )}`;
        setAccount({
          fullAddress: accounts[0],
          formattedAddress,
        });
      }

      // // Subscribe to accounts change
      // provider.on("accountsChanged", (accounts: string[]) => {
      //   console.log(accounts);
      // });

      // // Subscribe to chainId change
      // provider.on("chainChanged", (chainId: number) => {
      //   console.log(chainId);
      // });

      // // Subscribe to provider connection
      // provider.on("connect", (info: { chainId: number }) => {
      //   console.log(info);
      // });

      // // Subscribe to provider disconnection
      // provider.on("disconnect", (error: { code: number; message: string }) => {
      //   console.log(error);
      // });
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="App bg-blackish min-h-screen">
      <header className="flex justify-between items-center px-4 py-4">
        <div className="logo">
          <img src="/OPOLIS_Text_White.png" alt="Opolis logo" />
        </div>
        <div className="signin-button flex gap-x-3">
          <button className="btn-primary with-icon" onClick={onClick}>
            <svg
              width="18"
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 18V7a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v11"
                style={{
                  fill: "none",
                  stroke: "var(--brand-blackish)",
                  strokeWidth: "2",
                }}
              />
              <path
                d="M3 11a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2M3 15a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2"
                style={{
                  fill: "none",
                  stroke: "var(--brand-blackish)",
                  strokeWidth: "2",
                }}
              />
              <path d="m18.106 17.789-.211.422a3.236 3.236 0 0 1-5.789 0l-.211-.422A3.238 3.238 0 0 0 9 16H2v7a3 3 0 0 0 3 3h20a3 3 0 0 0 3-3v-7h-7a3.236 3.236 0 0 0-2.894 1.789z" />
            </svg>
            {account?.fullAddress ? (
              <span title={account?.fullAddress}>
                {account.formattedAddress}
              </span>
            ) : (
              <span>Connect wallet</span>
            )}
          </button>
          {account?.fullAddress && (
            <button
              type="button"
              className="text-gray-300 text-justify text-sm"
              onClick={disconnect}
            >
              Disconnect
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
