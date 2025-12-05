"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { GoogleDriveGISService } from "@/services/google-drive-gis.service";

interface GoogleDriveContextType {
  isSignedIn: boolean;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

const GoogleDriveContext = createContext<GoogleDriveContextType | undefined>(
  undefined,
);

interface GoogleDriveProviderProps {
  children: ReactNode;
}

export function GoogleDriveProvider({ children }: GoogleDriveProviderProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const initialize = async () => {
    try {
      setIsLoading(true);
      await GoogleDriveGISService.initialize();

      // Check if we have a valid token (either from storage or from redirect)
      const urlParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = urlParams.get("access_token");

      if (accessToken) {
        // We have a token from redirect, the service should have handled it
        setIsSignedIn(true);
        // Clean up URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      } else {
        // Check if we have a stored token
        setIsSignedIn(GoogleDriveGISService.isSignedIn());
      }
    } catch (error) {
      console.error("Failed to initialize Google Drive:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    try {
      setIsLoading(true);
      await GoogleDriveGISService.signIn();
      setIsSignedIn(true);
    } catch (error) {
      console.error("Failed to sign in to Google Drive:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await GoogleDriveGISService.signOut();
      setIsSignedIn(false);
    } catch (error) {
      console.error("Failed to sign out from Google Drive:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const value: GoogleDriveContextType = {
    isSignedIn,
    isLoading,
    signIn,
    signOut,
    initialize,
  };

  return (
    <GoogleDriveContext.Provider value={value}>
      {children}
    </GoogleDriveContext.Provider>
  );
}

export function useGoogleDrive(): GoogleDriveContextType {
  const context = useContext(GoogleDriveContext);
  if (context === undefined) {
    throw new Error("useGoogleDrive must be used within a GoogleDriveProvider");
  }
  return context;
}
