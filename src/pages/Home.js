import { useContext, useEffect } from "react";

import Confetti from 'react-confetti'

import { ViewContext } from "../context/AppContext"
import { Logo } from "components/Logo";
import Pill from "components/Pill";
import Wallet from "Wallet/Wallet";
import ArbitrumConnect from "Wallet/ArbitrumConnect";
import GetTokens from "Wallet/GetTokens";
import Success from "Wallet/Success";

import useAirtable from '../lib/hooks/useAirtable';

const Home = () => {
  const { user, provider, chainId, claimed } = useContext(ViewContext)
  const { address } = user

  const renderView = () => {
    switch (true) {
      case !address && provider:
        return <Wallet />
      case claimed:
        return <Success />
      case address && (chainId !== 421611):
        return <ArbitrumConnect />
      case address && (chainId === 421611):
        return <GetTokens />
      default:
        return <Wallet />
    }
  }

  const { data, getData } = useAirtable();
  useEffect(() => {
    async function onPageLoad() {
      await getData()
    }
    onPageLoad()
  }, [])

  data && console.log(data)

  return (
    <div className="App min-h-screen flex flex-col overflow-y-auto sm:overflow-hidden">
      {claimed && (
        <Confetti
          height={window.innerHeight}
          numberOfPieces={300}
          width={window.innerWidth} />
      )}
      <header className="flex justify-between items-center p-4">
        <Logo />
        <Pill />
      </header>
      <main className="flex-grow relative">
        <div className="main-content shadow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-10 sm:px-4 rounded flex flex-col">
          {renderView()}
        </div>
      </main>

    </div>
  );
};

export default Home;
