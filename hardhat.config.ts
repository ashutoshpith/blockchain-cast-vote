import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/a4ec2dca292849b5b5f7075fdec338ff",
      accounts: {
        mnemonic:
          "egg arrange family slab develop flock maple comfort bleak wheat motion inmate",
      },
    },
  },
};

export default config;
