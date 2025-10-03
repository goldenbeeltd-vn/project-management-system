/**
 * Auth Hooks với Redux
 */

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  initializeAuth,
  loginUser,
  registerUser,
  logoutUser,
  refreshUser,
  clearError,
} from "@/store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, loading, isAuthenticated, error } = useAppSelector(
    (state) => state.auth,
  );

  // Initialize auth on mount
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.rejected.match(result)) {
        throw new Error(result.payload as string);
      }
    },
    [dispatch],
  );

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      name: string;
      confirmPassword: string;
    }) => {
      const result = await dispatch(registerUser(data));
      if (registerUser.rejected.match(result)) {
        throw new Error(result.payload as string);
      }
    },
    [dispatch],
  );

  const logout = useCallback(async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.rejected.match(result)) {
      throw new Error(result.payload as string);
    }
  }, [dispatch]);

  const refreshUserData = useCallback(async () => {
    const result = await dispatch(refreshUser());
    if (refreshUser.rejected.match(result)) {
      throw new Error(result.payload as string);
    }
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    loading,
    isAuthenticated,
    error,
    login,
    logout,
    register,
    refreshUser: refreshUserData,
    clearError: clearAuthError,
  };
};
