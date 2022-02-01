import { useContext } from "react";

import { motion } from 'framer-motion'

import buffigwei from '../assets/buffigwei-1.png'
import { ViewContext } from "../context/AppContext"

const GetTokens = () => {
  const { contracts, isLoading, dispatch } = useContext(ViewContext)
  const { faucet } = contracts

  async function getSum() {
    try {
      const hitMe = await faucet.hitMe()
      dispatch({ type: 'SET_LOADING', payload: true })
      await hitMe.wait()
      dispatch({ type: 'SET_CLAIMED', payload: true })
      const buffiTokenAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: '0x3B44F3d1408894431adA109852a49409BD691CD8',
            symbol: "BUFF",
            decimals: 18,
            image: buffigwei
          }
        }
      })

      if (buffiTokenAdded) {
        console.log('Buffitoken Added!')
      } else {
        console.log('Something went terribly wrong')
      }
    } catch (error) {
      console.log(`contract.hitMe error: ${error}`)
    }
  }

  return (
    <>
      <header className="text-center">
        <h2 className="header1">Claim your Bufficorn Tokens</h2>
      </header>
      <div className="walletButtonContainer">
        <div className="mx-auto block w-full h-full">
          <button onClick={getSum} disabled={isLoading} type="button" className="network-btns text-center relative block w-full h-full">
            <motion.img
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.075 }}
              className="mx-auto mb-10" src={buffigwei} alt="" role="presentation" />
            <motion.h4
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="btn-primary">
              Get Tokens
            </motion.h4>
          </button>
        </div>
      </div>
    </>
  );
}

export default GetTokens
