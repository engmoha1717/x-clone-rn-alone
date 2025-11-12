/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { useApiClient, userApi } from "../utils/api";

export const useUserSync = () => {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const api = useApiClient();
  const [hasAttemptedSync, setHasAttemptedSync] = useState(false);

  const syncUserMutation = useMutation({
    mutationFn: () => userApi.syncUser(api),
    onSuccess: (response: any) => {
      console.log("✅ User synced successfully:", response.data);
      setHasAttemptedSync(true);
    },
    onError: (error: any) => {
      console.error("❌ User sync failed:", error.message);
      console.error("📊 Status:", error.response?.status);
      console.error("📋 Response data:", error.response?.data);
      console.error("🔑 Request headers:", error.config?.headers);
      console.error("🌐 Request URL:", error.config?.url);
      setHasAttemptedSync(true);
    },
  });

  // auto-sync user when signed in
  useEffect(() => {
    const attemptSync = async () => {
      // Wait for Clerk to be fully loaded
      if (!isLoaded) return;
      
      // Check if user is signed in and hasn't been synced yet
      if (isSignedIn && !hasAttemptedSync && !syncUserMutation.isPending) {
        try {
          // Verify token is available before attempting sync
          const token = await getToken();
          if (token) {
            console.log("Token obtained, syncing user...");
            syncUserMutation.mutate();
          } else {
            console.error("No token available for sync");
          }
        } catch (error) {
          console.error("Failed to get token:", error);
        }
      }
    };

    attemptSync();
  }, [isSignedIn, isLoaded, hasAttemptedSync]);

  return {
    isLoading: syncUserMutation.isPending,
    error: syncUserMutation.error,
    data: syncUserMutation.data,
    isSynced: !!syncUserMutation.data || hasAttemptedSync,
  };
};





















// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { useAuth } from "@clerk/clerk-expo";
// import { useApiClient, userApi } from "../utils/api";

// export const useUserSync = () => {
//   const { isSignedIn } = useAuth();
//   const api = useApiClient();

//   const syncUserMutation = useMutation({
//     mutationFn: () => userApi.syncUser(api),
//     onSuccess: (response: any) => console.log("User synced successfully:", response.data.user),
//     onError: (error) => console.error("User sync failed:", error),
//   });

//   // auto-sync user when signed in
//   useEffect(() => {
//     // if user is signed in and user is not synced yet, sync user
//     if (isSignedIn && !syncUserMutation.data) {
//       syncUserMutation.mutate();
//     }
//   }, [isSignedIn]);

//   return null;
// };
