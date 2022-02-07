import { Web3Provider } from "@ethersproject/providers"
import { useWeb3React } from "@web3-react/core"

export const Unconfirmed = () => {
  const context = useWeb3React<Web3Provider>()
  const { deactivate } = context

  return (
    <>
      <header className="text-center mb-4">
        <h2 className="header2 mb-4">Oh no!</h2>
        <h3 className="header3 italic mb-6 px-4 sm:px-4">
          Make sure you have both NFTs in your wallet
        </h3>
      </header>
      <div>
        <a
          className="btn-primary mx-auto block mb-6 text-center"
          href={process.env.REACT_APP_CALENDLY_UNCONFIRMED}
          rel="noopener noreferrer"
          target="_blank"
        >
          Schedule call anyway
        </a>
        <p className="section-description text-center px-4 md:px-24">
          It looks like you don’t have both NFT’s in your wallet. That’s okay,
          you can still sign-up for the best payroll and benefits service for
          crypto-first freelancers.
        </p>
        <p className="text-center my-4">or</p>
        <button
          className="btn-primary mx-auto block mb-6"
          onClick={() => deactivate()}
        >
          Change wallet
        </button>
      </div>
    </>
  )
}
