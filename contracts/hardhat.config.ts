import {HardhatUserConfig, vars} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const WALLET_KEY = vars.get("WALLET_KEY");

const config: HardhatUserConfig = {
  solidity: "0.8.21",
  networks: {
    // for mainnet
    'base-mainnet': {
      url: 'https://mainnet.base.org',
      accounts: [`${WALLET_KEY}`],
      gasPrice: 1000000000,
    },
    // for testnet
    'base-sepolia': {
      url: 'https://sepolia.base.org',
      accounts: [`${WALLET_KEY}`],
      gasPrice: 1000000000,
    },
  }
};

export default config;
