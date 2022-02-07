import { useState, createContext } from 'react'

const TierContext = createContext()
const TierProvider = ({ children }) => {

  const [tierData, setTierData] = useState({
    tier: 0,
    updateTier: value => setTierData(data => (
      { ...data, tier: value }
    ))
  })

  return <TierContext.Provider value={tierData}>{children}</TierContext.Provider>
}

export { TierContext, TierProvider }