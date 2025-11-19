/**
 * useWalletAddresses - Address extraction by chain type
 * Get wallet addresses organized by blockchain
 */

import { useMemo, useEffect } from "react";
import { useConnectedWallets } from "./useConnectedWallets";

export const useWalletAddresses = () => {
  const { connectedWallets } = useConnectedWallets();

  const ethereumAddresses = useMemo(() => {
    return connectedWallets
      .filter((w) => {
        // Multiple ways to check for Ethereum wallets
        const chainType = (w as any).chainType;
        const walletClientType = (w as any).walletClientType;
        const connectorType = w.connectorType;

        return (
          chainType === "ethereum" ||
          walletClientType === "ethereum" ||
          connectorType === "embedded" || // Embedded wallets are usually Ethereum
          connectorType === "injected" || // MetaMask, etc.
          !chainType // Default to Ethereum if no chain type specified
        );
      })
      .map((w) => w.address);
  }, [connectedWallets]);

  const solanaAddresses = useMemo(() => {
    return connectedWallets
      .filter((w) => {
        const chainType = (w as any).chainType;
        const walletClientType = (w as any).walletClientType;

        return chainType === "solana" || walletClientType === "solana";
      })
      .map((w) => w.address);
  }, [connectedWallets]);

  // Debug logging
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[fare-privy-core] Connected wallets:", connectedWallets);
      console.log("[fare-privy-core] Ethereum addresses:", ethereumAddresses);
      console.log("[fare-privy-core] Solana addresses:", solanaAddresses);
    }
  }, [connectedWallets, ethereumAddresses, solanaAddresses]);

  return {
    /** All Ethereum wallet addresses */
    ethereumAddresses,
    /** All Solana wallet addresses */
    solanaAddresses,
    /** Primary Ethereum address */
    primaryEthereumAddress: ethereumAddresses[0] || null,
    /** Primary Solana address */
    primarySolanaAddress: solanaAddresses[0] || null,
  };
};
