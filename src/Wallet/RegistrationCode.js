import { useContext, useRef } from "react";
import { motion } from "framer-motion";
import { ViewContext } from "../context/AppContext"
import { TierContext } from '../context/TierContext'

import buffiFetti from '../assets/buffifeti.png'
import { CodeInput } from '../components/Input'

const RegistrationCode = () => {
  const tierContext = useContext(TierContext)
  const { user, dispatch } = useContext(ViewContext)
  const { address } = user
  const inputRef = useRef()

  const registerCode = async () => {
    const { value } = inputRef.current
    const url = process.env.REACT_APP_SERVER_URL
    const details = { 'code': value, 'address': address }
    var formBody = []

    for (var property in details) {
      const encodedKey = encodeURIComponent(property)
      const encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + "=" + encodedValue)
    }
    formBody = formBody.join("&");

    async function postData(url) {
      const res = await fetch(url, {
        method: 'POST', mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody
      })
      return res.json()
    }

    postData(url)
      .then(res => {
        if (res.ok) {
          tierContext.updateTier(res.tier)
          // res example: { ok: true, code: '00003', tier: 1 }
        } else {
          throw Error(res.text)
        }
      })
      .then(() => dispatch({ type: 'REGISTERED', payload: true }))
      .catch((error) => console.log(error))
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
              src={buffiFetti} alt="Buffifeti" role="presentation"
              className="mx-auto mb-10" 
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.075 }}
            />
            <CodeInput innerRef={inputRef} />
            <motion.h4
              onClick={() => registerCode()}
              className="btn-primary"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              Submit
            </motion.h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrationCode
