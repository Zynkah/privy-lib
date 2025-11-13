# fare-privy-core

A lightweight React library for Privy authentication and wallet management, designed for casino and gaming applications on **Ethereum and Solana**.

## 🚀 Current Features (v1.3.0)

- **🔐 Real Privy Auth**: Full Privy authentication integration
- **🎰 Casino-Ready**: Pre-configured for casino/gaming use cases
- **⛓️ Multi-Chain**: Support for both Ethereum and Solana networks
- **💼 Wallet State**: Valtio-based wallet switching state management
- **🎨 Themeable**: Customize colors and branding per casino
- **🪝 Simple Hooks**: 3 dependency-free hooks for wallet operations
- **⚡ TypeScript**: Full TypeScript support with type declarations
- **🧪 Tested**: Complete test suite
- **📦 Lightweight**: Minimal dependencies, focused API

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
  useConnectedWallets,
  useIsAuthenticated
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

Three simple, **dependency-free** hooks to access wallet data in your casino:

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

📖 **[See complete hook documentation →](./HOOKS.md)**

## 📚 API Reference

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