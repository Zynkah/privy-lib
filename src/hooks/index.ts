/**
 * Hooks Index - fare-privy-core
 * Micro hooks for clean wallet management
 */

// Authentication and connection management
export { useConnectedWallets } from "./useConnectedWallets";
export { useIsAuthenticated } from "./useIsAuthenticated";
export { useAuthActions } from "./useAuthActions";

// Active wallet management (simplified pattern)
export { useActiveWallet } from "./useActiveWallet";

// Address and balance management
export { useWalletAddresses } from "./useWalletAddresses";
export { useWalletBalance } from "./useWalletBalance";

/**
 * 🪝 MICRO HOOKS ARCHITECTURE:
 *
 * Each hook has a single responsibility:
 *
 * ✅ useConnectedWallets  - Wallet connection management (embedded vs external)
 * ✅ useActiveWallet      - Simple active wallet selection (based on working pattern)
 * ✅ useWalletAddresses   - Address extraction by chain type (ETH/SOL)
 * ✅ useIsAuthenticated   - Simple authentication status checking
 * ✅ useAuthActions       - Login/logout control for casino entry
 * ✅ useWalletBalance     - Simplified balance fetching with reliable pattern
 *
 * This modular approach makes testing easier, reduces bundle size for
 * users who only need specific functionality, and improves maintainability.
 */
