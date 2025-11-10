import { Stack } from "expo-router";
import '../global.css'
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


export default function RootLayout() {
  return(
    <ClerkProvider tokenCache={tokenCache}>
       <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      <StatusBar style="inverted" />
     </QueryClientProvider>
    </ClerkProvider>
  )
}


