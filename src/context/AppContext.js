import React, { createContext, useEffect, useCallback } from 'react'

import buffiTruckAbi from '../abi/BuffiTruck.json'
import faucetAbi from '../abi/Faucet.json'

import { ethers } from 'ethers'
import { useImmerReducer } from 'use-immer'

import { initialState } from './initialState.js'
import { reducer } from '../reducers'

export const ViewContext = createContext(initialState)

//utils
export const bigNumberify = (amt) => {
  return ethers.utils.parseEther(amt)
}
export const smolNumberify = (amt, decimals = 18) => {
  return parseFloat(ethers.utils.formatUnits(amt, decimals))
}
//utils

export const ViewProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState)
  const BuffiTruckAddress = '0xD1924Dc661A3E0563deFE8E8028485211799e2b0'
  const faucetAddress = '0x3B44F3d1408894431adA109852a49409BD691CD8'

  const setAccount = useCallback(async (provider, accounts, networkName, chainId, faucetAddress) => {
    if (accounts.length > 0) {
      try {
        // const balance = await faucetAddress.balanceOf(accounts[0])
        const connectedAccount = {
          address: accounts[0],
          // balance: parseInt(smolNumberify(balance))
        }
        dispatch({ type: 'SET_ACCOUNT', payload: connectedAccount })
      } catch (e) {
        console.log(e)
      }
    } else {
      dispatch({ type: 'SET_ACCOUNT', payload: initialState.user })
    }
  }, [dispatch])

  const connectUser = useCallback(async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      if (provider) {
        const signer = await provider.getSigner()
        const { name, chainId } = await provider.getNetwork()
        const buffiTruck = new ethers.Contract(BuffiTruckAddress, buffiTruckAbi.abi, signer)
        const faucet = new ethers.Contract(faucetAddress, faucetAbi.abi, signer)
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        setAccount(provider, accounts, name, chainId, buffiTruck, faucet)
        dispatch({
          type: 'CONNECTED_PROVIDER',
          payload: {
            provider,
            signer,
            name
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
  }, [setAccount, dispatch])

  useEffect(() => {
    if (window.ethereum) {
      connectUser()

      // if (window.ethereum) {
      //   if (window.ethereum.isMetaMask) {
      //     window.ethereum.on('accountsChanged', () => {
      //       connectUser()
      //       window.location.replace('/')
      //     })
      //     window.ethereum.on('chainChanged', () => {
      //       connectUser()
      //       window.location.replace('/')
      //     })
      //   }
      // } else {
      //   // dispatch({
      //   //   type: 'INSTALL_METAMASK',
      //   //   instal: {}
      //   // })
      //   console.log("dispatch goes here")
      // }

    }
  }, [connectUser, dispatch])

  const { contracts, isLoading, isConnected, name, chainId, provider, user, feedback } = state

  const connect = async () => {
    console.log("beginning of connect()")
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(provider, accounts)
      console.log("set acount called")
    } catch (e) {
      // Dispatch an error message here
      console.log(e)
    }
  }

  return (
    <ViewContext.Provider
      value={{
        state,
        dispatch,
        contracts,
        isLoading,
        isConnected,
        provider,
        user,
        name,
        chainId,
        feedback,
        actions: { connect }
      }}>
      {children}
    </ViewContext.Provider>
  )
}
