import { createContext, useEffect, useCallback } from 'react'
import { useImmerReducer } from 'use-immer'
import { ethers } from 'ethers'

import { initialState } from './initialState.js'
import { reducer } from '../reducers'

import buffiTruckAbi from '../abi/BuffiTruck.json'
import faucetAbi from '../abi/Faucet.json'

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
  const BuffiTruckAddress = '0xd4dCCaBF7710675f0A10af9ccbba2cfB4dc1F82B'
  const faucetAddress = '0x20c93befe36035FB246Fe3ef5408dF9922f04183'

  const setAccount = useCallback(async (provider, accounts, networkName, chainId, faucetAddress) => {
    if (accounts.length > 0) {
      try {
        // const balance = await buffiTruck.balanceOf(accounts[0])
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
            chainId,
            name,
            buffiTruck,
            faucet
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
    }

    window.ethereum.on('accountsChanged', () => {
      connectUser()
    })
    window.ethereum.on('chainChanged', () => {
      connectUser()
    })
    window.ethereum.on('disconnect', () => {
      dispatch({ type: 'SET_ACCOUNT', payload: initialState.user })
    })
  }, [connectUser, dispatch])

  const { contracts, isLoading, isConnected, isRegistered, name, chainId, provider, user, feedback, claimed } = state

  const connect = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(provider, accounts)
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
        isRegistered,
        provider,
        user,
        name,
        chainId,
        feedback,
        claimed,
        actions: { connect }
      }}>
      {children}
    </ViewContext.Provider>
  )
}
