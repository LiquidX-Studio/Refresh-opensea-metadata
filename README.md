# Refresh Opensea Metadata

When the metadata of an NFT collection is updated, we often have to manually update the metadata shown in the opensea.  `update_opensea.js` contains script that can be used to refresh the Metadata displayed in the opensea for a collection.

# Requirements

- [NodeJS 16+](https://nodejs.org/en/download)
- [yarn 1.22+](https://yarnpkg.com/getting-started/install)

# Usage

## 1. Clone repository

```sh
git clone https://github.com/LiquidX-Studio/Refresh-opensea-metadata.git
```

## 2. Go to directory

```sh
cd Refresh-opensea-metadata
```

## 3. Install dependencies

```sh
yarn install
```

## 4. Configure environment variables

Initialize a new `.env` file: 
- `CONTRACT` the contract address of collection in OpenSea
- `API_KEY` the OpenSea API Key, it's required to refresh collection in mainnet
- `START_TOKEN_ID` first metadata token ID that needs to be refreshed
- `END_TOKEN_ID` last metadata token ID that needs to be refreshed

## 5. Execute script

### Refresh collection in mainnet

```
node update_opensea.js
```

### Refresh collection in testnet

```
node update_opensea.js --test
```