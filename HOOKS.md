# 🎰 fare-privy-core - Wallet Hooks Guide

Simple, dependency-free React hooks for your casino clients using Privy authentication.

## 🚀 Available Hooks

### `useAuthActions()` - Login & Logout for Casino Entry
Essential authentication functions for casino apps.

```typescript
import { useAuthActions } from 'fare-privy-core';

function CasinoEntry() {
  const { login, logout, isAuthenticated, isReady } = useAuthActions();

  if (!isReady) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div>
        <h1>🎰 Welcome to the Casino!</h1>
        <button onClick={login}>
          Connect Wallet & Enter
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome Back!</h2>
      <button onClick={logout}>Exit Casino</button>
      <GamesList />
    </div>
  );
}
```

### `useConnectedWallets()`
Get all connected wallets (embedded & external) with authentication status.

```typescript
import { useConnectedWallets } from 'fare-privy-core';

function CasinoWallet() {
  const {
    connectedWallets,    // All connected wallets
    primaryWallet,       // First connected wallet
    embeddedWallet,      // Privy embedded wallet
    externalWallet,      // MetaMask/Phantom etc.
    isAuthenticated,     // User authenticated & has wallet
    isReady,            // Privy is ready
  } = useConnectedWallets();

  if (!isAuthenticated) return <LoginButton />;

  return (
    <div>
      <h2>Primary Wallet</h2>
      <p>{primaryWallet?.address}</p>
      <p>Type: {primaryWallet?.connectorType}</p>
      <p>Chain: {primaryWallet?.chainType}</p>
    </div>
  );
}
```

### `useWalletAddresses()`
Get wallet addresses separated by chain type (Ethereum/Solana).

```typescript
import { useWalletAddresses } from 'fare-privy-core';

function CasinoBalance() {
  const {
    ethereumAddresses,        // All ETH addresses
    solanaAddresses,          // All SOL addresses
    primaryEthereumAddress,   // Primary ETH address
    primarySolanaAddress,     // Primary SOL address
  } = useWalletAddresses();

  return (
    <div>
      {primarySolanaAddress && (
        <div>
          <h3>Solana Wallet</h3>
          <p>{primarySolanaAddress}</p>
          <SolanaBalance address={primarySolanaAddress} />
        </div>
      )}
      {primaryEthereumAddress && (
        <div>
          <h3>Ethereum Wallet</h3>
          <p>{primaryEthereumAddress}</p>
          <EthBalance address={primaryEthereumAddress} />
        </div>
      )}
    </div>
  );
}
```

### `useIsAuthenticated()`
Simple authentication check with user info.

```typescript
import { useIsAuthenticated } from 'fare-privy-core';

function CasinoHeader() {
  const {
    isAuthenticated,  // User authenticated & has wallet
    user,            // Privy user object
    walletCount,     // Number of connected wallets
    isReady,        // Privy ready state
  } = useIsAuthenticated();

  if (!isReady) return <Loading />;
  if (!isAuthenticated) return <LoginButton />;

  return (
    <div>
      <p>Welcome, {user?.wallet?.address}</p>
      <p>Connected Wallets: {walletCount}</p>
    </div>
  );
}
```

## 🎮 Complete Casino Example

```typescript
import {
  PrivyProvider,
  useConnectedWallets,
  useWalletAddresses,
  useIsAuthenticated,
  useAuthActions,
} from 'fare-privy-core';

// 1. Wrap your app with PrivyProvider
function App() {
  return (
    <PrivyProvider
      appId="your-privy-app-id"
      config={{
        walletChainType: 'solana-only', // or 'ethereum-only' or 'ethereum-and-solana'
        appearance: {
          theme: 'dark',
          accentColor: '#ff0000',
        },
      }}
    >
      <YourCasino />
    </PrivyProvider>
  );
}

// 2. Use hooks in your casino components
function YourCasino() {
  const { isAuthenticated } = useIsAuthenticated();
  const { login } = useAuthActions();
  const { primaryWallet } = useConnectedWallets();
  const { primarySolanaAddress } = useWalletAddresses();

  if (!isAuthenticated) {
    return (
      <div>
        <h1>🎰 Welcome to the Casino!</h1>
        <button onClick={login}>Connect & Play</button>
      </div>
    );
  }

  return (
    <div>
      <CasinoHeader wallet={primaryWallet} />
      <GamesList />
      <WalletBalance address={primarySolanaAddress} />
    </div>
  );
}

function CasinoHeader({ wallet }) {
  const { logout } = useAuthActions();
  
  return (
    <header>
      <h1>🎰 My Casino</h1>
      <div>
        <span>{wallet?.address.slice(0, 6)}...{wallet?.address.slice(-4)}</span>
        <span>{wallet?.chainType}</span>
        <button onClick={logout}>Exit</button>
      </div>
    </header>
  );
}
```

## 🔧 Hook Return Types

### `useAuthActions()`
```typescript
{
  login: () => void;           // Open Privy login modal
  logout: () => Promise<void>; // Disconnect user & clear session
  isReady: boolean;           // Whether functions are ready
  isAuthenticated: boolean;   // Current auth status
}
```

### `useConnectedWallets()`
```typescript
{
  connectedWallets: ConnectedWallet[];  // All linked wallets
  primaryWallet: ConnectedWallet | null;
  embeddedWallet: ConnectedWallet | null;
  externalWallet: ConnectedWallet | null;
  isAuthenticated: boolean;
  isReady: boolean;
}
```

### `useWalletAddresses()`
```typescript
{
  ethereumAddresses: string[];
  solanaAddresses: string[];
  primaryEthereumAddress: string | null;
  primarySolanaAddress: string | null;
}
```

### `useIsAuthenticated()`
```typescript
{
  isAuthenticated: boolean;
  user: User | null;
  walletCount: number;
  isReady: boolean;
}
```

## 💡 Common Patterns

### Multi-Wallet Support
```typescript
function WalletSwitcher() {
  const { connectedWallets, primaryWallet } = useConnectedWallets();

  return (
    <select defaultValue={primaryWallet?.address}>
      {connectedWallets.map((wallet) => (
        <option key={wallet.address} value={wallet.address}>
          {wallet.chainType} - {wallet.address.slice(0, 8)}...
        </option>
      ))}
    </select>
  );
}
```

### Conditional Chain Rendering
```typescript
function GamesList() {
  const { primaryEthereumAddress, primarySolanaAddress } = useWalletAddresses();

  return (
    <div>
      {primarySolanaAddress && <SolanaGames />}
      {primaryEthereumAddress && <EthereumGames />}
    </div>
  );
}
```

### Protected Routes
```typescript
function ProtectedCasinoRoute({ children }) {
  const { isAuthenticated, isReady } = useIsAuthenticated();

  if (!isReady) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
}
```

## 📦 No External Dependencies!

These hooks are **self-contained** - they only use Privy's built-in APIs. No need to:
- ❌ Add chain configuration stores
- ❌ Set up logging services
- ❌ Install error tracking
- ❌ Configure app-specific utilities

Just import and use! 🎉
