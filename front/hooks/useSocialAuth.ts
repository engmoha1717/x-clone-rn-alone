import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from 'expo-router';

export const useSocialAuth = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    setIsLoading(true);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
      router.replace("/(tabs)");
    } catch (err) {
      console.log("Error in social auth", err);
      const provider = strategy === "oauth_google" ? "Google" : "Apple";
      Alert.alert("Error", `Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSocialAuth };
};




// import { useSSO, useUser } from '@clerk/clerk-expo';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import * as WebBrowser from 'expo-web-browser';
// import { useEffect } from 'react';
// import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import Toast from 'react-native-toast-message';

// WebBrowser.maybeCompleteAuthSession();

// export const useWarmUpBrowser = () => {
//   useEffect(() => {
//     if (Platform.OS !== 'android') return;
//     void WebBrowser.warmUpAsync();
//     return () => {
//       void WebBrowser.coolDownAsync();
//     };
//   }, []);
// };

// export default function SignIn() {
  
//   useWarmUpBrowser();
//   const { user } = useUser()
//   const router = useRouter();
//   const { startSSOFlow } = useSSO();


//   // --- OAuth Handlers ---
//   const onGoogleSignIn = async () => {
//     try {
//       const { createdSessionId, setActive } = await startSSOFlow({
//         strategy: 'oauth_google',
//         // redirectUrl: AuthSession.makeRedirectUri(),
//       });

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });
//         // Don't manually navigate - let the useEffect handle it
//         Toast.show({
//           type: 'success',
//           text1: 'Welcome back!',
//           text2: 'Signed in successfully with Google',
//         });
//       }
//       if (setActive && createdSessionId) {
//         setActive({ session: createdSessionId });
//         router.replace("/(tabs)");
//       }
//     } catch (err: any) {
//       console.error('Google sign-in error:', err);
      
//       // Check if already signed in
//       if (err.message?.includes('already signed in')) {
//         Toast.show({
//           type: 'success',
//           text1: 'Already signed in',
//           text2: 'Redirecting...',
//         });
//         router.replace('/(tabs)');
//         return;
//       }
      
//       if (err.code === 'user_cancelled' || err.code === 'browser_closed') {
//         Toast.show({
//           type: 'info',
//           text1: 'Sign in cancelled',
//           text2: 'You can try again anytime',
//         });
//       } else {
//         Toast.show({
//           type: 'error',
//           text1: 'Sign-in failed',
//           text2: err.errors?.[0]?.message || err.message || 'Please try again',
//         });
//       }
//     }
//   };

//   const onFacebookSignIn = async () => {
//     try {
//       const { createdSessionId, setActive } = await startSSOFlow({
//         strategy: 'oauth_facebook',
//         // redirectUrl: AuthSession.makeRedirectUri(),
//       });

//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });
//         // Don't manually navigate - let the useEffect handle it
//         Toast.show({
//           type: 'success',
//           text1: 'Welcome back!',
//           text2: 'Signed in successfully with Facebook',
//         });
//       }
//     } catch (err: any) {
//       console.error('Facebook sign-in error:', err);
      
//       // Check if already signed in
//       if (err.message?.includes('already signed in')) {
//         Toast.show({
//           type: 'success',
//           text1: 'Already signed in',
//           text2: 'Redirecting...',
//         });
//         router.replace('/(tabs)');
//         return;
//       }
      
//       if (err.code === 'user_cancelled' || err.code === 'browser_closed') {
//         Toast.show({
//           type: 'info',
//           text1: 'Sign in cancelled',
//           text2: 'You can try again anytime',
//         });
//       } else {
//         Toast.show({
//           type: 'error',
//           text1: 'Sign-in failed',
//           text2: err.errors?.[0]?.message || err.message || 'Please try again',
//         });
//       }
//     }
//   };

//   // --- UI ---
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       className="flex-1 bg-islamic-900"
//     >
//       <ScrollView contentContainerClassName="flex-grow justify-center px-6">
//         <View className="items-center mb-12">
//           <View className="bg-islamic-700 p-6 rounded-full mb-4">
//             <Ionicons name="moon" size={48} color="#FFC107" />
//           </View>
//           <Text className="text-4xl font-bold text-white mb-2">Fast Ramadan</Text>
//           <Text className="text-islamic-100 text-center text-lg">
//             Share the blessing of food
//           </Text>
//         </View>



//         <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6">
//           <Text className="text-2xl font-bold text-white mb-6">Welcome Back</Text>

//           <View className="flex-row items-center my-4">
//             <View className="flex-1 h-px bg-white/20" />
//             <Text className="text-islamic-100 mx-4">Sign in with</Text>
//             <View className="flex-1 h-px bg-white/20" />
//           </View>

//           <TouchableOpacity
//             onPress={onGoogleSignIn}
//             className="bg-white rounded-xl py-4 flex-row items-center justify-center"
//           >
//             <Ionicons name="logo-google" size={20} color="#2E7D32" />
//             <Text className="text-islamic-900 font-bold text-base ml-2">
//               Continue with Google
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={onFacebookSignIn}
//             className="bg-white mt-2 rounded-xl py-4 flex-row items-center justify-center"
//           >
//             <Ionicons name="logo-facebook" size={20} color="#2E7D32" />
//             <Text className="text-islamic-900 font-bold text-base ml-2">
//               Continue with Facebook
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }
