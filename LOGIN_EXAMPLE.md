# 🎰 Login/Logout Example

Here's exactly how to use the new `useAuthActions` hook for Privy login/logout:

## Quick Example

```tsx
import { 
  PrivyProvider, 
  useAuthActions, 
  useConnectedWallets 
} from 'fare-privy-core';

function App() {
  return (
    <PrivyProvider appId="your-privy-app-id">
      <CasinoApp />
    </PrivyProvider>
  );
}

function CasinoApp() {
  const { login, logout, isAuthenticated, isReady } = useAuthActions();
  const { primaryWallet } = useConnectedWallets();

  // Wait for Privy to be ready
  if (!isReady) {
    return <div>Loading Privy...</div>;
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div>
        <h1>🎰 Welcome to the Casino!</h1>
        <p>Connect your wallet to start playing</p>
        <button onClick={login}>
          Connect Wallet & Enter Casino
        </button>
      </div>
    );
  }

  // Show casino interface if authenticated
  return (
    <div>
      <header>
        <h1>🎰 Casino Dashboard</h1>
        <div>
          <span>Wallet: {primaryWallet?.address?.slice(0, 6)}...{primaryWallet?.address?.slice(-4)}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      
      <main>
        <h2>🎮 Your Games</h2>
        <p>Start playing your favorite casino games!</p>
        {/* Your casino games here */}
      </main>
    </div>
  );
}
```

## What Happens

### Login (`login()`)
- Opens Privy's authentication modal
- User can connect with:
  - Email + embedded wallet
  - External wallets (MetaMask, Phantom, etc.)
  - Social logins (Google, Twitter, etc.)
- Returns promises for success/error handling

### Logout (`logout()`)
- Disconnects all wallets
- Clears user session
- Returns to login screen
- Cleans up Privy state

## Advanced Usage with Error Handling

```tsx
function AdvancedCasinoApp() {
  const { login, logout, isAuthenticated } = useAuthActions();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login();
      console.log('✅ User logged in successfully!');
    } catch (error) {
      console.error('❌ Login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log('✅ User logged out successfully!');
    } catch (error) {
      console.error('❌ Logout failed:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Connecting...' : '🎰 Enter Casino'}
      </button>
    );
  }

  return (
    <div>
      <button onClick={handleLogout}>Exit Casino</button>
      <CasinoGames />
    </div>
  );
}
```

## ✅ YES! You can now login/logout from your Privy wallet!

The `useAuthActions` hook provides:
- ✅ `login()` - Opens Privy authentication modal
- ✅ `logout()` - Disconnects user and clears session  
- ✅ `isAuthenticated` - Current auth status
- ✅ `isReady` - Whether Privy is ready to use

Just import and use! 🚀