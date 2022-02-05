import { useContext, forwardRef, useRef, createRef } from "react";
import { motion } from "framer-motion";
import { ViewContext } from "../context/AppContext"

import buffiFetti from '../assets/buffifeti.png'

import { CodeInput } from '../components/Input'

const RegistrationCode = () => {
  const { isRegistered, dispatch } = useContext(ViewContext)

  const inputRef = useRef()

  const registerCode = async () => {
    console.log(inputRef)
    console.log(inputRef.current)

    const { value } = inputRef.current
    console.log(value)
    dispatch({type: 'REGISTERED', payload: true })

    // fetch(ur)
    //   .then(res => {
    //     if(res.ok) {
    //       return res.json()
    //     } else {
    //       throw Error('Registration Error')
    //     }
    //   })
    // .then(data => {
    //   console.log(data)
    //   dispatch({ type: 'REGISTERED', payload: true })
    // })
    // .catch(e => console.log(e))
  }

  return (
    <>
      <header className="text-center">
        <h2 className="header1">ETH Denver Registration Code</h2>
      </header>
      <div className="walletButtonContainer">
        <div className="mx-auto block w-full h-full text-center">
          <div className="text-center w-full h-full">
            <motion.img
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.075 }}
              className="mx-auto mb-10" src={buffiFetti} alt="Buffifeti" role="presentation"
            />
            <CodeInput innerRef={inputRef} />
            <motion.h4
              onClick={() => registerCode()}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="btn-primary">
              Submit
            </motion.h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrationCode;
