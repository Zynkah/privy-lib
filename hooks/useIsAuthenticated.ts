/**
 * useIsAuthenticated - Simple authentication status checker
 * Check if user is authenticated with wallet connected
 */

import { usePrivy } from "@privy-io/react-auth";
import { useConnectedWallets } from "./useConnectedWallets";

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
