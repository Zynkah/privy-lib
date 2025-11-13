import React, { useMemo } from "react";
import {
  PrivyProvider as _PrivyProvider,
  type PrivyClientConfig,
} from "@privy-io/react-auth";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";

export interface PrivyProviderProps {
  children: React.ReactNode;
  /**
   * Your Privy App ID (required)
   */
  appId: string;
  /**
   * Optional Privy Client ID for enhanced security
   */
  clientId?: string;
  /**
   * Custom Privy configuration for your casino
   * @see https://docs.privy.io/guide/react/configuration
   */
  config?: PrivyClientConfig;
  /**
   * Smart wallet configuration (e.g., Biconomy)
   * This should be the complete smart wallet config object
   */
  smartWalletConfig?: any;
  /**
   * Disable smart wallet integration
   */
  disableSmartWallets?: boolean;
  /**
   * Environment override for configuration selection
   */
  environment?: "production" | "staging" | "development";
  /**
   * Custom theme for your casino
   */
  theme?: {
    accentColor?: string;
    logo?: string;
    darkMode?: boolean;
  };
}

/**
 * Lightweight Privy authentication wrapper for casino applications
 * Compatible with the original farePrivy architecture
 *
 * @example
 * ```tsx
 * <PrivyProvider
 *   appId="your-app-id"
 *   theme={{ accentColor: "#0066ff" }}
 *   smartWalletConfig={biconomyConfig}
 * >
 *   <YourCasinoApp />
 * </PrivyProvider>
 * ```
 */
export const PrivyProvider: React.FC<PrivyProviderProps> = ({
  children,
  appId,
  clientId,
  config,
  smartWalletConfig,
  disableSmartWallets = false,
  environment,
  theme,
}) => {
  // Merge configurations (similar to original implementation)
  const finalConfig: PrivyClientConfig = useMemo(() => {
    let baseConfig: PrivyClientConfig = { ...config };

    // Apply environment-specific overrides
    if (environment) {
      if (environment === "development") {
        // Add development-specific overrides if needed
        baseConfig = {
          ...baseConfig,
          // Your dev overrides here
        };
      }
    }

    // Apply theme overrides
    if (theme) {
      baseConfig = {
        ...baseConfig,
        appearance: {
          ...baseConfig.appearance,
          ...(theme.accentColor && {
            accentColor: theme.accentColor as `#${string}`,
          }),
          ...(theme.logo && { logo: theme.logo }),
          ...(theme.darkMode !== undefined && {
            theme: theme.darkMode ? "dark" : "light",
          }),
        },
      };
    }

    return baseConfig;
  }, [config, environment, theme]);

  // If smart wallets are disabled, just use basic PrivyProvider
  if (disableSmartWallets) {
    return (
      <_PrivyProvider appId={appId} clientId={clientId} config={finalConfig}>
        {children}
      </_PrivyProvider>
    );
  }

  // With smart wallet support (matches original pattern with 'config' prop)
  return (
    <_PrivyProvider appId={appId} clientId={clientId} config={finalConfig}>
      <SmartWalletsProvider config={smartWalletConfig}>
        {children}
      </SmartWalletsProvider>
    </_PrivyProvider>
  );
};
