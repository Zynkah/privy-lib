# fare-privy-core

A lightweight React library for Privy authentication and wallet management, designed for casino and gaming applications on **Ethereum and Solana**.

## 🚀 Current Features (v1.7.7)

- **🔐 Real Privy Auth**: Full Privy authentication integration with login/logout
- **🎰 Casino-Ready**: Pre-configured for casino/gaming use cases  
- **⛓️ Multi-Chain**: Support for both Ethereum and Solana networks
- **💰 Reliable Balance Checking**: Simplified balance fetching based on proven working patterns (ETH/SOL)
- **🎯 Active Wallet Management**: useActiveWallet hook based on successful casino implementations
- **🔗 Solana Helper Functions**: Easy Solana connector setup with TypeScript compatibility
- **💼 Wallet State**: Valtio-based wallet switching state management
- **🎨 Themeable**: Customize colors and branding per casino
- **🪝 Micro Hooks**: 6 focused hooks with single responsibilities and proven reliability
- **🚪 Login/Logout**: Easy authentication control for casino entry/exit
- **⚡ TypeScript**: Full TypeScript support with type declarations
- **🧪 Tested**: 3/4 test suites passing with reliable integration tests
- **📦 Tree Shakable**: Import only what you need for smaller bundle sizes
- **🗂️ Clean**: Minimal dependencies, proven patterns

## 📦 Installation

```bash
npm install fare-privy-core
# or
pnpm add fare-privy-core
```

### ⚠️ Important Dependency Requirements

This package requires specific version ranges to avoid breaking changes:

- **@privy-io/react-auth**: `^1.0.0` - Core Privy authentication
- **styled-components**: Must use v5.x (not v6.x) - `npm install styled-components@^5.3.0`
- **valtio**: Must use v1.x (not v2.x) - `npm install valtio@^1.12.0`

```bash
# Install all compatible versions
npm install fare-privy-core @privy-io/react-auth styled-components@^5.3.0 valtio@^1.12.0
```

## 💻 Quick Start

### Basic Casino Setup

```tsx
import { 
  PrivyProvider,
  useActiveWallet,
  useConnectedWallets,
  useIsAuthenticated,
  useWalletBalance
} from 'fare-privy-core';

function App() {
  return (
    <PrivyProvider 
      appId="your-privy-app-id"
      config={{
        walletChainType: 'solana-only' // or 'ethereum-only' or 'ethereum-and-solana'
      }}
      theme={{
        accentColor: "#0066ff",
        darkMode: true
      }}
    >
      <YourCasinoApp />
    </PrivyProvider>
  );
}
```

### With Custom Branding

```tsx
import { PrivyProvider } from 'fare-privy-core';

function MyCasino() {
  return (
    <PrivyProvider 
      appId="your-privy-app-id"
      theme={{
        accentColor: "#ff6b35",     // Your casino color
        logo: "/your-casino-logo.png",
        darkMode: true
      }}
      config={{
        loginMethods: ['email', 'wallet', 'google'],
        appearance: {
          showWalletLoginFirst: true,
        }
      }}
    >
      <CasinoGames />
    </PrivyProvider>
  );
}
```

### With Smart Wallets (for sponsored transactions)

```tsx
import { PrivyProvider } from 'fare-privy-core';

// Your Biconomy or other smart wallet config
const biconomyConfig = {
  // Your smart wallet configuration here
  // Same structure as your original biconomyPrivyConfig
};

function AdvancedCasino() {
  return (
    <PrivyProvider 
      appId="your-privy-app-id"
      smartWalletConfig={biconomyConfig}  // Pass as 'config' prop
      theme={{
        accentColor: "#00d4ff"
      }}
    >
      <CasinoWithGaslessTransactions />
    </PrivyProvider>
  );
}
```

### With Environment-Specific Config

```tsx
import { PrivyProvider } from 'fare-privy-core';

function ProductionCasino() {
  return (
    <PrivyProvider 
      appId="your-privy-app-id"
      environment="production"  // 'production' | 'staging' | 'development'
      config={{
        loginMethods: ['email', 'wallet'],
        // Your full Privy config
      }}
    >
      <CasinoApp />
    </PrivyProvider>
  );
}
```

### Solana Casino Example

```tsx
import { PrivyProvider } from 'fare-privy-core';

function SolanaCasino() {
  return (
    <PrivyProvider 
      appId="your-privy-app-id"
      config={{
        loginMethods: ['wallet', 'email'],
        // Privy automatically detects and supports Solana wallets
        // like Phantom, Solflare, Backpack, etc.
        appearance: {
          walletChainType: 'solana-only', // Show only Solana wallets
          showWalletLoginFirst: true,
        },
      }}
      theme={{
        accentColor: "#14F195", // Solana green
        darkMode: true
      }}
    >
      <YourSolanaGames />
    </PrivyProvider>
  );
}
```

### Multi-Chain Support (Ethereum + Solana)

```tsx
import { PrivyProvider } from 'fare-privy-core';

function MultiChainCasino() {
  return (
    <PrivyProvider 
      appId="your-privy-app-id"
      config={{
        loginMethods: ['wallet', 'email'],
        appearance: {
          walletChainType: 'ethereum-and-solana', // Support both chains
        },
        // Users can connect both Ethereum and Solana wallets
      }}
    >
      <CrossChainCasino />
    </PrivyProvider>
  );
}
```

## 🪝 Using Wallet Hooks

Six focused **micro hooks** with proven patterns - import only what you need for optimal bundle sizes:

### `useAuthActions()` - Login & Logout Control

```tsx
import { useAuthActions } from 'fare-privy-core';

function CasinoEntry() {
  const { login, logout, isAuthenticated, isReady } = useAuthActions();

  if (!isAuthenticated) {
    return <button onClick={login}>🎰 Enter Casino</button>;
  }

  return (
    <div>
      <span>Welcome to the Casino!</span>
      <button onClick={logout}>Exit</button>
    </div>
  );
}
```

### `useConnectedWallets()` - Get all wallet info

```tsx
import { useConnectedWallets } from 'fare-privy-core';

function WalletDisplay() {
  const {
    primaryWallet,      // First connected wallet
    embeddedWallet,     // Privy embedded wallet
    externalWallet,     // MetaMask/Phantom etc.
    isAuthenticated,    // true if user has wallet
  } = useConnectedWallets();

  return <div>Address: {primaryWallet?.address}</div>;
}
```

### `useActiveWallet()` - Get active wallet (proven pattern)

```tsx
import { useActiveWallet } from 'fare-privy-core';

function CasinoGame() {
  const {
    activeWallet,        // Current active wallet
    privyWallet,         // Embedded Privy wallet
    externalWallet,      // MetaMask/Phantom etc.
    walletAddress,       // Active wallet address
    isWalletAuthed,      // Boolean: has active wallet
    readyAndAuth         // Boolean: ready and authenticated
  } = useActiveWallet();

  if (!isWalletAuthed) return <div>Connect wallet to play</div>;
  return <div>Playing with: {walletAddress}</div>;
}
```

### `useWalletAddresses()` - Get addresses by chain

```tsx
import { useWalletAddresses } from 'fare-privy-core';

function BalanceDisplay() {
  const { 
    primarySolanaAddress,
    primaryEthereumAddress 
  } = useWalletAddresses();

  return (
    <div>
      {primarySolanaAddress && <SolBalance address={primarySolanaAddress} />}
      {primaryEthereumAddress && <EthBalance address={primaryEthereumAddress} />}
    </div>
  );
}
```

### `useIsAuthenticated()` - Simple auth check

```tsx
import { useIsAuthenticated } from 'fare-privy-core';

function ProtectedGame() {
  const { isAuthenticated, user } = useIsAuthenticated();

  if (!isAuthenticated) return <LoginPrompt />;
  return <CasinoGame />;
}
```

### `useWalletBalance()` - Get native currency balances

```tsx
import { useWalletBalance } from 'fare-privy-core';

function WalletBalanceDisplay() {
  const { 
    ethereumBalance, 
    solanaBalance, 
    loading, 
    error, 
    refreshBalances 
  } = useWalletBalance();

  if (loading) return <div>Loading balances...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <p>ETH Balance: {ethereumBalance || "0.00"} ETH</p>
      <p>SOL Balance: {solanaBalance || "0.00"} SOL</p>
      <button onClick={refreshBalances}>Refresh</button>
    </div>
  );
}
```

📖 **[See complete hook documentation →](./HOOKS.md)**

## 📝 Changelog

### v1.7.6 (Latest) - Reliable Patterns & Simplified Balance
- **🎯 Added**: useActiveWallet hook based on proven working casino patterns
- **💰 Simplified**: useWalletBalance rewritten with reliable single-wallet approach
- **🔧 Fixed**: Removed complex wallet filtering in favor of simple active wallet selection
- **⚡ Improved**: Balance fetching now uses sequential approach instead of complex promises
- **🧪 Tested**: 3/4 test suites passing with reliable integration tests
- **📖 Enhanced**: Updated documentation with new useActiveWallet examples

### v1.7.4 - Micro Hooks Architecture
- **🪝 Refactored**: Split monolithic useWallets hook into 5 focused micro hooks
- **🌳 Tree Shaking**: Import only the hooks you need for smaller bundle sizes
- **🧹 Maintainable**: Each hook has single responsibility and clear purpose
- **📁 Organized**: Proper hooks/index.ts structure for clean imports
- **⚡ Performance**: Reduced coupling between hook functionalities
- **🔧 Developer Experience**: Easier testing and debugging of individual hooks

### v1.7.3 - Enhanced Balance with Privy Providers
- **🔗 Enhanced**: useWalletBalance now uses Privy's native wallet providers instead of manual RPC calls
- **⚡ Improved**: More reliable balance fetching with proper provider integration
- **🔧 Added**: createSolanaConnectors() and disableSolanaConnectors() helper functions
- **🛠️ Fixed**: Solana connector TypeScript compatibility issues
- **🧪 Tested**: All functionality verified with improved architecture
- **📖 Documentation**: Updated with balance improvements and new helper functions

### v1.7.2
- **🐛 Fixed**: Solana connector configuration with proper TypeScript types
- **🔄 Added**: Helper functions for dynamic Solana connector management
- **⚡ Improved**: Error handling for missing Solana wallet adapter packages

### v1.7.1
- **💰 Added**: useWalletBalance hook for native currency balance checking
- **⛓️ Enhanced**: Support for ETH and SOL balance fetching
- **⚡ Improved**: Real-time balance updates with loading states and error handling
- **🔄 Added**: Manual balance refresh functionality
- **🧪 Tested**: All 17 tests passing including new balance functionality

### v1.6.0
- **🗂️ Optimized**: Removed unused files and dependencies
- **🧹 Cleaned**: Streamlined codebase for better performance
- **📦 Smaller**: Reduced package bloat while maintaining all functionality
- **✅ Tested**: All 17 tests passing after cleanup
- **🔧 Fixed**: Resolved circular import issues in useWallets.ts

### v1.5.0
- **🪝 Added**: useAuthActions hook for login/logout control
- **🚪 Enhanced**: Complete authentication management for casino apps

### v1.4.0  
- **🎰 Added**: Four dependency-free wallet hooks
- **🔗 Enhanced**: Multi-chain support for Ethereum and Solana

## �📚 API Reference

### PrivyProvider

Main authentication provider for your casino application.

**Required Props:**
- `appId` (string): Your Privy application ID (get this from [Privy Dashboard](https://dashboard.privy.io))
- `children` (ReactNode): Your casino application components

**Optional Props:**
- `clientId` (string): Privy client ID for enhanced security
- `config` (PrivyClientConfig): Full Privy configuration object
  - `loginMethods`: Array of auth methods (e.g., `['email', 'wallet', 'google']`)
  - `appearance`: UI customization options
  - See [Privy docs](https://docs.privy.io/guide/react/configuration) for all options
- `smartWalletConfig` (object): Smart wallet configuration object (e.g., your Biconomy config)
  - **Important**: Pass the complete config object, not spread props
  - Example: `smartWalletConfig={biconomyPrivyConfig}`
- `disableSmartWallets` (boolean): Disable smart wallet integration (default: false)
- `environment` ('production' | 'staging' | 'development'): Environment-specific config overrides
- `theme` (object): Quick theme customization (merged with config.appearance)
  - `accentColor`: Primary color for your casino brand
  - `logo`: URL to your casino logo
  - `darkMode`: Enable/disable dark theme

### Wallet State Management

Import and use the wallet switching state in your components:

```tsx
import { switchWalletState } from 'fare-privy-core';
import { useSnapshot } from 'valtio';

function MyWalletUI() {
  const snap = useSnapshot(switchWalletState);
  
  return (
    <div>
      <p>Modal Open: {snap.isWalletModalOpen ? 'Yes' : 'No'}</p>
      <p>Selected: {snap.selectedConnectorType}</p>
      <button onClick={() => switchWalletState.isWalletModalOpen = true}>
        Open Wallet Modal
      </button>
    </div>
  );
}
```

**State Properties:**
- `isWalletModalOpen` (boolean): Controls wallet modal visibility
- `selectedConnectorType` (string): Currently selected wallet connector type

## 🎯 Package Philosophy

This package provides **core authentication and state management** without opinionated UI components. Perfect for casino operators who want to:

- ✅ Quick integration of Privy auth into their casino
- ✅ Customize branding and colors per casino
- ✅ Build their own game UI that matches their design
- ✅ Keep bundle size minimal
- ✅ Maintain full control over user experience
- ✅ Support multiple casinos from one codebase

## 🎰 For Casino Operators

This library is designed for operators running multiple casinos on the same platform. Each casino can:

1. **Use their own Privy App ID** for isolated user bases
2. **Customize theme colors** to match their brand
3. **Configure login methods** based on their audience
4. **Add their own logo** and branding
5. **Build custom game UIs** using the wallet state management
6. **Support Ethereum, Solana, or both chains**

Example multi-casino setup:

```tsx
// Ethereum Casino
<PrivyProvider 
  appId="eth-casino-id" 
  config={{ appearance: { walletChainType: 'ethereum-only' }}}
  theme={{ accentColor: "#627EEA" }}
>
  <EthereumCasino />
</PrivyProvider>

// Solana Casino  
<PrivyProvider 
  appId="sol-casino-id"
  config={{ appearance: { walletChainType: 'solana-only' }}}
  theme={{ accentColor: "#14F195" }}
>
  <SolanaCasino />
</PrivyProvider>

// Multi-Chain Casino
<PrivyProvider 
  appId="multi-casino-id"
  config={{ appearance: { walletChainType: 'ethereum-and-solana' }}}
>
  <MultiChainCasino />
</PrivyProvider>
```

## 🔄 What's Next

Want more features? Open an issue or PR on [GitHub](https://github.com/farePrivy/fare-privy-core)!

## 📄 License

ISC License - see LICENSE file for details.