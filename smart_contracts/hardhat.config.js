require('dotenv').config();
require("@nomiclabs/hardhat-waffle");

const { ETHERSCAN_API_KEY, INFURA_PROJECT_ID, SEED } = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.5",
    settings: {
      optimizer: {
        enabled: true
      }
    }
  },
  defaultNetwork: "arbitrum",
  networks: {
    hardhat: {},
    rinkeby: {
			url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
			accounts: {
				mnemonic: SEED,
				count: 1,
			},
		},
		abitrum: {
			url: `https://arbitrum-rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: SEED,
        count: 1,
      }
		},
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY
  }
};;