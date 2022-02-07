import { useContext } from "react"
import { motion } from "framer-motion"

import { walletMeta } from "assets/walletMeta"
import { ViewContext } from "../context/AppContext"

const Wallet = () => {
  const { actions } = useContext(ViewContext)
  const { connect } = actions

  return (
    <>
      <header className="text-center">
        <h2 className="header1">Sign in with Web3</h2>
      </header>
      <div className="walletButtonContainer">
        <div className="mx-auto block w-full h-full text-center">
          <button onClick={() => connect()} disabled={false} type="button" className="network-btns text-center relative block w-full h-full">
            <motion.img
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.075 }}
              className="mx-auto mb-10" src={walletMeta['metamask']?.uri} alt="" role="presentation" />
            <motion.h4
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="btn-primary">
              {walletMeta['metamask']?.description}
            </motion.h4>
          </button>
        </div>
      </div>
    </>
  )
}

export default Wallet
