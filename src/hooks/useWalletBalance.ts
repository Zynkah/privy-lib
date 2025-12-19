// ...existing code from previous stable version (single implementation only)...
import { useState, useEffect, useCallback, useRef } from "react";
import { useActiveWallet } from "./useActiveWallet";

export interface WalletBalance {
  ethereumBalance: string | null;
  solanaBalance: string | null;
  loading: boolean;
  error: string | null;
  refetchBalance: () => void;
}

export function useWalletBalance(): WalletBalance {
  const { activeWallet } = useActiveWallet();
  const [ethereumBalance, setEthereumBalance] = useState<string | null>(null);
  const [solanaBalance, setSolanaBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchingRef = useRef(false);

  const fetchBalances = useCallback(async () => {
    if (!activeWallet || fetchingRef.current) {
      return;
    }

    fetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      // For Ethereum wallets, try to get balance
      if (activeWallet.address && activeWallet.getEthereumProvider) {
        try {
          // Try to get provider and fetch balance
          const provider = await activeWallet.getEthereumProvider();
          if (provider && provider.request) {
            const balance = await provider.request({
              method: "eth_getBalance",
              params: [activeWallet.address, "latest"],
            });
            // Convert from hex wei to ETH
            const balanceInWei = parseInt(balance, 16);
            const balanceInEth = (balanceInWei / Math.pow(10, 18)).toFixed(4);
            setEthereumBalance(balanceInEth);
          } else {
            // If no provider available, set placeholder
            setEthereumBalance("0.0000");
          }
        } catch (providerError) {
          console.log(
            "Provider balance fetch failed, using placeholder:",
            providerError
          );
          setEthereumBalance("0.0000");
        }
      } else {
        setEthereumBalance(null);
      }

      // Solana placeholder (Privy doesn't support Solana balances in React SDK yet)
      setSolanaBalance("0.0000");
    } catch (fetchError) {
      console.error("Error fetching wallet balance:", fetchError);
      setError("Failed to fetch balance");
      setEthereumBalance(null);
      setSolanaBalance(null);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [activeWallet?.address]);

  // Reset balances when wallet changes
  useEffect(() => {
    if (activeWallet?.address) {
      fetchBalances();
    } else {
      setEthereumBalance(null);
      setSolanaBalance(null);
      setError(null);
    }
  }, [activeWallet?.address, fetchBalances]); // Include fetchBalances since it's stable with useCallback

  return {
    ethereumBalance,
    solanaBalance,
    loading,
    error,
    refetchBalance: fetchBalances,
  };
}
