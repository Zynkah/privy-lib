/**
 * useConnectedWallets - Wallet connection management
 * Get active/connected wallets for both Ethereum and Solana
 */

import { useMemo } from "react";
import { usePrivy, useWallets as usePrivyWallets } from "@privy-io/react-auth";

export const useConnectedWallets = () => {
  const { ready, authenticated } = usePrivy();
  const { wallets } = usePrivyWallets();

  const connectedWallets = useMemo(
    () => wallets.filter((wallet) => wallet.linked),
    [wallets]
  );

  const primaryWallet = useMemo(() => {
    if (!ready || !authenticated || connectedWallets.length === 0) return null;
    return connectedWallets[0];
  }, [ready, authenticated, connectedWallets]);

  const embeddedWallet = useMemo(() => {
    return (
      connectedWallets.find((wallet) => wallet.connectorType === "embedded") ||
      null
    );
  }, [connectedWallets]);

  const externalWallet = useMemo(() => {
    return (
      connectedWallets.find((wallet) => wallet.connectorType !== "embedded") ||
      null
    );
  }, [connectedWallets]);

  return {
    /** All connected/linked wallets */
    connectedWallets,
    /** Primary wallet (first connected) */
    primaryWallet,
    /** Embedded Privy wallet if exists */
    embeddedWallet,
    /** External wallet (MetaMask, Phantom, etc.) if exists */
    externalWallet,
    /** Whether user is authenticated */
    isAuthenticated: authenticated && ready,
    /** Whether Privy is ready */
    isReady: ready,
  };
};
