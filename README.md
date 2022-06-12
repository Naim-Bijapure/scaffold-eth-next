# 🏗 Scaffold-Eth-next Typescript

## Typescript 
This is the typescript repo of scaffold.eth with foundry, rainbowkit , wagmi hooks and nextjs.


The directories that you'll use are:

```bash
packages/next-ts/
packages/foundry-ts/
```

## Quick Start

Running the app

1. install your dependencies

   ```bash
   yarn install
   ```

2. start a foundry node

   ```bash
   yarn chain
   ```

3. run the app, `open a new command prompt`

   ```bash
   # build foundry & external contracts types
   yarn contracts:init 
   # deploy your foundry contracts
   yarn deploy --network xx (without --network it will deploy on localhost)
   # start the app
   yarn dev 
   ```
4. deploy on vercel. 
```bash
 yarn vercel:deploy
 ## (login vercel  at first time)
```

## Overview

Everything you need to build on Ethereum! 🚀 Quickly experiment with Solidity using a frontend that adapts to your smart contract:

![image](https://user-images.githubusercontent.com/22323693/173233298-69b090f3-92bc-44e6-ba91-25bd7425b120.png)

- 🔏 Edit your smart contract `YourContract.sol` in `packages/foundry-ts/src`
- 📝 Start Editing your frontend  at `packages/next-ts/pages`
- 💼  Update `DEPLOY_CONTRACTS` array you want to deploy at `pakages/foundry-ts/config/index.ts`
- 
- 📱 Open http://localhost:3000 to see the app

## Guides


- Check out [wagmi hooks  docs](https://wagmi.sh/docs/getting-started) for example of how to use hooks
- you can look at [speedrun ethereum](https://speedrunethereum.com/) to get started with scaffold-eth-typescript and web3.  
  - 🏁 Make sure to click on the typescript tab!

## 🏃💨 Speedrun Ethereum
Register as a builder [here](https://speedrunethereum.com) and start on some of the challenges and build a portfolio.
# More Information!

## 📚 Documentation

Documentation, tutorials, challenges, and many more resources, visit: [docs.scaffoldeth.io](https://docs.scaffoldeth.io)

Eth-hooks documentation is [here](https://scaffold-eth.github.io/eth-hooks/).  Learn how to use the contexts here.


### 🔭 Learning Solidity

Read the docs: https://docs.soliditylang.org

Go through each topic from [solidity by example](https://solidity-by-example.org) editing `YourContract.sol` in **🏗 scaffold-eth**


## 🛠 Buidl

Check out all the [active branches](https://github.com/austintgriffith/scaffold-eth/branches/active), [open issues](https://github.com/austintgriffith/scaffold-eth/issues), and join/fund the 🏰 [BuidlGuidl](https://BuidlGuidl.com)!

[Follow the full Ethereum Speed Run](https://medium.com/@austin_48503/%EF%B8%8Fethereum-dev-speed-run-bd72bcba6a4c)

### 💬 Support Chat

Join the telegram [support chat 💬](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA) to ask questions and find others building with 🏗 scaffold-eth!

### 🙏🏽 Support us!

Please check out our [Gitcoin grant](https://gitcoin.co/grants/2851/scaffold-eth) too!


## 🔐 P.S.About keys

You need an RPC and API keys for testnets and production deployments, create an [Alchemy](https://www.alchemy.com/) account and replace the value of `ALCHEMY_KEY = xxx` in `packages/vite-app-ts/.env` with your new keys.



