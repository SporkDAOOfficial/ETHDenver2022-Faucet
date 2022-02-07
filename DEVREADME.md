# ETHDenver Faucet App 

## Goals and Requirements

**Goal**: Create a simple web app where ETHDenver attendees who have already downloaded or otherwise setup MetaMask mobile to switch their network to Arbitrum-Rinkeby, collect 0.01 Abitrum Rinkeby ETH, and then collect a number of food truck tokens -- 1 token per meal. 

**Requirements**: 

Basic UX Flow: 
1. Connect to the web app with MetaMask mobile --> page updates -->
2. Click button to add Arbitrum Rinkeby as a network and switch the MetaMask mobile app to that network --> page updates --> 
3. Click botton to: 
   3a. Get 0.01 Aribtrum Rinkeby ETH from an ETH faucet @Arbitrum Team: Need help setting this piece up
   3b. Call the hitMe(lvl) method in the Faucet contract to recieve food truck tokens 
   *Note: for the test the lvl = 1, 2, or 3 and should give out 2, 4, 6 tokens respectively. 
4. If successful, navigate to a page where there's a buttton to add the food truck tokens to their MetaMask wallet UI 
5. Final view that has a link to a page on the ETHDenver website. @ETHDenver Team: Will need help with this. 

Here's the figma files: https://www.figma.com/file/MeXkI030yMrmbA7I5DiMxm/Product-Flow?node-id=0%3A1

Requirements: 
1. Button to add Arbitrum Rinkeby as a network that switches the walle to that network using the MetaMask api method. 
2. Button that calls the ETH faucet and then (upon success) calls the hitMe() method. 
3. Button that adds the food truck token to the user's MetaMask token list using the MetaMask api method. 
4. Final view with a link to the ETHDenver website.  
5. Error view for when someone has already claimed food truck tokens to an address with button that takes them to final view.

**MetaMask API Methods**
* https://metamask.github.io/api-playground/api-documentation/#wallet_addEthereumChain
* https://metamask.github.io/api-playground/api-documentation/#wallet_switchEthereumChain
* https://docs.metamask.io/guide/registering-your-token.html#example

**Network Details**

Network Name
- Arbitrum Rinkeby
Network URL
- https://rinkeby.arbitrum.io/rpc
Chain ID
- 421611
Currency Symbol
- ARETH
Block Explorer URL
- https://rinkeby-explorer.arbitrum.io

## Getting App Started 

The app is split into two main parts, a react app and smart contracts. 

### Deploying the React App 

1. Yarn Install
2. Enter the Faucet contract address into config.js
3. Yarn start 

This will open the app on your local host. 

Check `sample.env` file for values needed, create your own `.env` file for each part, "smart_contracts", "server" and in the root React client app.

### Deploying the Smart Contracts 

1. `cd into smart_contracts`
2. `Yarn Install` 
3. Create .env file 
4. Add ETHERSCAN_API_KEY, INFURA_PROJECT_ID, SEED as environment variables to the .env file (remember not to save or push your Seed Phrase to a remote repository)
5. In deploy-test.js add your preferred address as the ADMIN 
6. Run `npx hardhat run --network abitrum scripts/deploy-test.js`


Addresses if you want to use existing contracts: 

BuffiTruck Token: 0xd4dCCaBF7710675f0A10af9ccbba2cfB4dc1F82B
Faucet: 0x20c93befe36035FB246Fe3ef5408dF9922f04183
FaucetAdmin: 0xaa8EfDD887D38882f74b52dF18bd0c294F9eC4b9

@Dev - Bill can mint tokens and sent them to the faucet contract or your wallet. 