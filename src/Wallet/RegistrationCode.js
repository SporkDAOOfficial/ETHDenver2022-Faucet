import { useContext, useRef } from "react";
import { motion } from "framer-motion";
import { ViewContext } from "../context/AppContext"

import buffiFetti from '../assets/buffifeti.png'
import { CodeInput } from '../components/Input'

const RegistrationCode = () => {
  const { user, dispatch } = useContext(ViewContext)
  const { address } = user
  const inputRef = useRef()

  const registerCode = async () => {
    const { value } = inputRef.current
    const url = process.env.REACT_APP_SERVER_URL
    const details = { 'code': value, 'address': address }
    var formBody = [];

    for (var property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
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
          console.log(res)
          // {code: '00003', tier: 1}
        } else {
          console.log(res)
          console.log(res.status)
          throw Error(res.text)
        }
      })
      .then(() => {
        dispatch({ type: 'REGISTERED', payload: true })
      })
      .catch(e => console.log(e))
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
