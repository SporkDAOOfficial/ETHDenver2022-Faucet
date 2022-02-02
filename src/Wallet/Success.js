import { useContext } from "react";
import { motion } from "framer-motion";
import { ViewContext } from "../context/AppContext"

import buffifeti from '../assets/buffifeti.png'

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
              className="mx-auto mb-10" src={buffifeti} alt="Buffifeti" role="presentation" />
            <motion.a
              rel='noopener noreferrer'
              href='https://www.ethdenver.com/'
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="btn-secondary">
              Let's go to ETHDenver!
            </motion.a>
          </button>
        </div>
      </div>
    </>
  );
}

export default Wallet;
