// src/utils/ethers.js
import { ethers } from "ethers";

let readProvider = null;

/**
 * Returns a singleton read-only provider (Infura mainnet by default).
 */
export function getReadProvider(network = "mainnet") {
  if (readProvider) return readProvider;

  const key = import.meta.env.VITE_INFURA_KEY;
  if (!key) {
    throw new Error("VITE_INFURA_KEY not set in .env");
  }

  // you can switch to "goerli" or "sepolia" during testing
  const url = `https://${network}.infura.io/v3/${key}`;

  readProvider = new ethers.JsonRpcProvider(url);
  return readProvider;
}

/**
 * Returns ETH balance (string in ether) for the given address.
 */
export async function getEthBalance(address, network = "mainnet") {
  if (!address) throw new Error("Address is required");
  const provider = getReadProvider(network);
  const balanceBigInt = await provider.getBalance(address); // BigInt (wei)
  // format to human readable ether
  return ethers.formatEther(balanceBigInt); // returns string, e.g. "0.123456"
}
