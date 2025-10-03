/**
 * Auth Slice for Redux
 * Slice quản lý authentication state với Redux Toolkit
 */

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authService, type User } from "@/lib/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
};

// Async thunks
export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { rejectWithValue }) => {
    try {
      const storedUser = authService.getUser();

      if (storedUser && authService.isAuthenticated()) {
        // Verify user with server
        const currentUser = await authService.getCurrentUser();
        return currentUser;
      } else {
        // Clear invalid auth data
        authService.clearAuth();
        return null;
      }
    } catch (error) {
      console.error("Initialize auth error:", error);
      authService.clearAuth();
      return rejectWithValue("Failed to initialize authentication");
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const authResponse = await authService.login(credentials);
      return authResponse.user;
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Login failed",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    data: {
      email: string;
      password: string;
      name: string;
      confirmPassword: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const authResponse = await authService.register(data);
      return authResponse.user;
    } catch (error) {
      console.error("Register error:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Registration failed",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return null;
    } catch (error) {
      console.error("Logout error:", error);
      return rejectWithValue("Logout failed");
    }
  },
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = await authService.getCurrentUser();
      return currentUser;
    } catch (error) {
      console.error("Refresh user error:", error);
      return rejectWithValue("Failed to refresh user data");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload && authService.isAuthenticated();
    },
  },
  extraReducers: (builder) => {
    // Initialize Auth
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated =
          !!action.payload && authService.isAuthenticated();
        state.error = null;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Refresh User
    builder
      .addCase(refreshUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated =
          !!action.payload && authService.isAuthenticated();
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
