import { useEffect, useState, useContext } from "react";

import { ViewContext } from "../context/AppContext"

import { Logo } from "components/Logo";
import Pill from "components/Pill";
import Wallet from "Wallet/Wallet";
import ArbitrumConnect from "Wallet/ArbitrumConnect";
import GetTokens from "Wallet/GetTokens";

const Home = () => {

	const { user, provider, chainId } = useContext(ViewContext)
  const { address } = user

  const renderView = () => {
    switch (true) {
      case !address && provider:
        return <Wallet />
      case address && (chainId !== 421611):
        return <ArbitrumConnect />
      case address && (chainId === 421611):
        return <GetTokens />
      default:
        return <Wallet />
    }
  }

  return (
    <div className="App min-h-screen flex flex-col overflow-y-auto sm:overflow-hidden">
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
