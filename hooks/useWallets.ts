/**
 * Simplified wallet hooks for casino clients
 * No external dependencies - ready to use!
 */

import { useMemo } from "react";
import {
  usePrivy,
  useWallets as usePrivyWallets,
  useLogin,
  useLogout,
  type ConnectedWallet,
} from "@privy-io/react-auth";

/**
 * Get active/connected wallets
 * Works with both Ethereum and Solana wallets
 */
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

/**
 * Get wallet addresses by chain type
 */
export const useWalletAddresses = () => {
  const { connectedWallets } = useConnectedWallets();

  const ethereumAddresses = useMemo(
    () =>
      connectedWallets
        .filter((w) => (w as any).chainType === "ethereum")
        .map((w) => w.address),
    [connectedWallets]
  );

  const solanaAddresses = useMemo(
    () =>
      connectedWallets
        .filter((w) => (w as any).chainType === "solana")
        .map((w) => w.address),
    [connectedWallets]
  );

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

/**
 * Check if user is authenticated with wallet
 */
export const useIsAuthenticated = () => {
  const { user, ready, authenticated } = usePrivy();
  const { connectedWallets } = useConnectedWallets();

  const hasWallet = connectedWallets.length > 0;
  const isFullyAuthenticated = authenticated && ready && hasWallet;

  return {
    /** User is authenticated and has wallet connected */
    isAuthenticated: isFullyAuthenticated,
    /** User object from Privy */
    user,
    /** Number of connected wallets */
    walletCount: connectedWallets.length,
    /** Privy ready state */
    isReady: ready,
  };
};

/**
 * Handle user login - perfect for casino entry buttons
 */
export const useAuthActions = () => {
  const { login } = useLogin();
  const { logout } = useLogout();
  const { ready, authenticated } = usePrivy();

  return {
    /** Login function - opens Privy modal */
    login,
    /** Logout function - disconnects user */
    logout,
    /** Whether actions are ready to use */
    isReady: ready,
    /** Whether user is currently authenticated */
    isAuthenticated: authenticated,
  };
};
