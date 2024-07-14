const {vars} = require("hardhat/config");

const API_URL = vars.get("API_URL");
const WALLET_KEY = vars.get("WALLET_KEY");
const CONTRACT_ADDRESS = "0x902d2B63F4eb51c17838bc0E445865D0dA8C8f8b";

const contract = require("../artifacts/contracts/BlocksyContract.sol/BlocksyContract.json");

console.log(JSON.stringify(contract.abi));
const ethers = require("ethers");
const alchemyProvider = new ethers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(WALLET_KEY, alchemyProvider);
const blocksyContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
	const result = await blocksyContract.transferOwnership("0x9754B56ab0BF8D59E9384ce3318Dc33220dA320f")
	console.log("Ownership transferred: ", result);
}
main();