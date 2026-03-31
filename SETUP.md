# BlockCertify — Setup Guide

## Prerequisites
- Node.js 18+
- Truffle: `npm install -g truffle`
- Ganache Desktop: https://trufflesuite.com/ganache/
- MetaMask browser extension
- MongoDB running locally OR MongoDB Atlas URI

---

## Step 1 — Install dependencies
```bash
npm install
```

## Step 2 — Start Ganache
- Open Ganache Desktop
- Click "Quickstart Ethereum"
- Make sure it runs on port **7545**

## Step 3 — Deploy the smart contract
```bash
truffle compile --all
truffle migrate --reset
```
After migration completes, copy the **contract address** shown:
```
contract address:    0xYourNewAddressHere
```

## Step 4 — Update .env with new contract address
Edit the `.env` file and replace:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourNewAddressHere
```

## Step 5 — Connect MetaMask to Ganache
- Open MetaMask → Add Network → Add manually:
  - Network Name: Ganache
  - RPC URL: http://127.0.0.1:7545
  - Chain ID: 1337
  - Currency: ETH
- Import a Ganache account using its private key

## Step 6 — Run the app
```bash
npm run dev
```
Open http://localhost:3000

---

## What was fixed
1. `contracts/CertificateContract.sol` → renamed to `CertificateSystem.sol`
2. Added SPDX license identifier to contract
3. `truffle-config.js` → updated solc version from 0.8.0 to 0.8.21
4. Created `migrations/1_initial_migration.js`
5. Created `migrations/2_deploy_contracts.js`
6. `blockchain.config.ts` → fixed `JsonRpcProvider` to `BrowserProvider` for MetaMask
7. Created `.env` file with your credentials
8. Created `build/contracts/CertificateSystem.json` (ABI placeholder so Next.js doesn't crash before deploy)
