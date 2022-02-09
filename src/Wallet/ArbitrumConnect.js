import { useContext } from "react"
import { motion } from 'framer-motion'

import { ViewContext } from "../context/AppContext"
import arbitrumLogo from '../assets/arbitrum-logo.svg'

export default function ArbitrumConnect() {
  const { provider } = useContext(ViewContext)
  
  const connectArbitrum = async () => {
    if (provider) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x66eeb' }],
        })
      } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask.
        console.log(error)
        // if (error.code === 4902 || error?.data?.originalError?.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x66eeb', // A 0x-prefixed hexadecimal string
                  blockExplorerUrls: ['https://rinkeby-explorer.arbitrum.io'],
                  chainName: 'Arbitrum Rinkeby',
                  nativeCurrency: {
                    decimals: 18,
                    name: 'Ether',
                    symbol: 'ARETH' // 2-6 characters long
                  },
                  rpcUrls: ['https://rinkeby.arbitrum.io/rpc']
                },
              ],
            })
          } catch (error) {
            // user rejects the request to "add chain" or param values are wrong, maybe you didn't use hex above for `chainId`?
            console.log(`wallet_addEthereumChain Error: ${error.message}`)
            console.log(error)
          }
        // }
        // handle other "switch" errors
      }
    }
  }

  return (
    <>
      <header className="text-center">
        <h2 className="header1">Oops</h2>
        <p>You aren't connected to Arbitrum Rinkeby</p>
      </header>
      <div className="walletButtonContainer">
        <div className="mx-auto block w-full h-full text-center">
          <button onClick={connectArbitrum} disabled={false} type="button"
            className="network-btns text-center relative block w-full h-full"
          >
            <motion.img
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.075 }}
              className="mx-auto mb-5" src={arbitrumLogo} alt="" role="presentation" />
            <motion.h4
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="btn-primary">
              Connect Network
            </motion.h4>
          </button>
        </div>
      </div>
    </>
  )
}
