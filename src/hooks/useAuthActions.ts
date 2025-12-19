/**
 * useAuthActions - Login and logout control
 * Handle user authentication - perfect for casino entry buttons
 */

import { usePrivy, useLogin, useLogout } from "@privy-io/react-auth";

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
