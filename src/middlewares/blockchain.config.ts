import { ethers } from "ethers";
import CertificateSystem from "../../build/contracts/CertificateSystem.json";

const CONTRACT_ABI: any[] = CertificateSystem.abi;
const CONTRACT_ADDRESS: string | undefined =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

if (!CONTRACT_ADDRESS) {
  throw new Error("Contract address is not set in environment variables.");
}

export const getContract = async () => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error(
      "Ethereum provider not available. Make sure MetaMask is installed."
    );
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS!, CONTRACT_ABI, signer);
};

export const initBlockchain = async (): Promise<void> => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error(
      "Ethereum provider not available. Make sure MetaMask is installed."
    );
  }

  // Request accounts
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // Auto switch to Ganache (chainId 1337 = 0x539)
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x539" }],
    });
    console.log("Switched to Ganache network");
  } catch (error: any) {
    // Chain not added yet — add it automatically
    if (error.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x539",
          chainName: "Ganache",
          rpcUrls: ["http://127.0.0.1:7545"],
          nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
        }],
      });
      console.log("Ganache network added and switched");
    } else {
      throw error;
    }
  }
};