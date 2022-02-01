export const initialState = {
  contracts: {
    buffiTruck: null,
    faucet: null
  },
  isLoading: true,
  isConnected: false,
  name: null,
  chainId: null,
  provider: null,
  signer: null,
  user: {
    accounts: [],
    address: '',
    balance: 0
  },
  feedback: {
    error: ''
  },
  content: {

  }
}