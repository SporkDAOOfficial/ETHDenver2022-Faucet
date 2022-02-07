import { useContext } from "react";
import { motion } from 'framer-motion'
import { ViewContext } from "../context/AppContext"
import { TierContext } from '../context/TierContext'

import buffiGweiImg from '../assets/buffToken.png'
import getBuffImg from '../assets/buffigwei-1.png'

const GetTokens = () => {
  const tierContext = useContext(TierContext)
  const { contracts, isLoading, dispatch, claimed } = useContext(ViewContext)
  const { faucet } = contracts

  async function addBuff() {
    try {
      console.log(`Calling hitMe(${tierContext.tier})`)
      const hitMe = await faucet.hitMe(tierContext.tier)
      dispatch({ type: 'SET_LOADING', payload: true })
      await hitMe.wait()
      const buffiTokenAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: '0xD1924Dc661A3E0563deFE8E8028485211799e2b0',
            symbol: "BUFF",
            decimals: 18,
            image: buffiGweiImg
          }
        }
      })

      if (buffiTokenAdded) {
        dispatch({ type: 'SET_CLAIMED', payload: true })
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
        <h2 className="header1">Claim BuffiGWEI Tokens</h2>
      </header>
      <div className="walletButtonContainer">
        <div className="mx-auto block w-full h-full">
          <button onClick={addBuff} disabled={isLoading || claimed} 
            type="button" 
            className="network-btns text-center relative block w-full h-full"
          >
            <motion.img
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.075 }}
              className="mx-auto mb-10" src={getBuffImg} alt="" role="presentation" />
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
