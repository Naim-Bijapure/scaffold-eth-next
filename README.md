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

# NOTE !! : Rename .env.example file to .env file

- using only single .env file
- .env file at project root is required.

0. print all the basic project commands
   ```bash
   yarn scafold:help
   ```
1. install foundry and  project dependencies

   ```bash
   yarn install

   yarn setup
   ```

   it will install or update foundry

2. start a foundry node `open a new command prompt`

   ```bash
   yarn chain
   ```

3. run the app, `open a new command prompt`

   ```bash
   # build foundry & external contracts types
   yarn contracts:build
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

#### Template Configurations

##### Foundry configs

1. this template requires .env file rename **.env.example** file to **.env** file and add required id's
2. define created contracts inside `packages/foundry-ts/configs/index.ts` DEPLOY_CONTRACTS array
   ![2022-06-12_23-01](https://user-images.githubusercontent.com/22323693/173245694-eaf7b02e-2831-49ad-ab93-326470f6c589.png)

3. write test cases inside test folder follow [foundry doc](https://book.getfoundry.sh/forge/writing-tests.html)

4. installing forge packages
   follow [forge doc](https://book.getfoundry.sh/projects/dependencies.html)

##### Front end configs

1. contract setup
   go inside `packages/next-ts/components/configs/appContract.config.ts` file

- inside appContract.config.ts file add your contract json, and typechain factory module

2. target networks setup

- to define rainbow kit targeted networks inside .env file

- deployed contract's json file saved as ` foundry_contracts.json` file inside contracts dirctory

3. load a contract with hook

- to load a contract inside a component use useAppLoadContract() hook defined inside `packages/hooks/useAppLoadContract`
  ![2022-06-12_23-20](https://user-images.githubusercontent.com/22323693/173246408-9351e8ba-4b67-4a29-961f-3118359a641a.png)

4. to deploy web app on vercel.

- run `yarn vercel:deploy`
- fill up the vercel credentials and push the site

## Overview

Everything you need to build on Ethereum! 🚀 Quickly experiment with Solidity using a frontend that adapts to your smart contract:

![image](https://user-images.githubusercontent.com/22323693/173233298-69b090f3-92bc-44e6-ba91-25bd7425b120.png)

- 🔏 Edit your smart contract `YourContract.sol` in `packages/foundry-ts/src`
- 📝 Start Editing your frontend at `packages/next-ts/pages`
- 💼 Update `DEPLOY_CONTRACTS` array you want to deploy at `pakages/foundry-ts/config/index.ts`
-
- 📱 Open http://localhost:3000 to see the app

## Guides

- Check out [wagmi hooks docs](https://wagmi.sh/docs/getting-started) for example of how to use hooks
- you can look at [speedrun ethereum](https://speedrunethereum.com/) to get started with scaffold-eth-typescript and web3.
  - 🏁 Make sure to click on the typescript tab!

## 🏃💨 Speedrun Ethereum

Register as a builder [here](https://speedrunethereum.com) and start on some of the challenges and build a portfolio.

# More Information!

## 📚 Documentation

Documentation, tutorials, challenges, and many more resources, visit: [docs.scaffoldeth.io](https://docs.scaffoldeth.io)

Eth-hooks documentation is [here](https://scaffold-eth.github.io/eth-hooks/). Learn how to use the contexts here.

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
