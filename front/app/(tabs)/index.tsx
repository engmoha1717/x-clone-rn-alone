import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import SignOutButton from '@/components/SignOutButton'
import {  RefreshControl, ScrollView, Text, View } from "react-native";
import PostComposer from "@/components/PostComposer";
import PostsList from "@/components/PostsList";

const HomeScreen = () => {
  const [isRefetching, setIsRefetching] = useState(false);

  const handlePullToRefresh=async ()=>{}
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
        <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
        <Text className="text-xl font-bold text-gray-900">Home</Text>
        <SignOutButton />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handlePullToRefresh}
            tintColor={"#1DA1F2"}
          />
        }
      >
        <PostComposer />
        <PostsList />
      </ScrollView>

      

    </SafeAreaView>
  )
}

export default HomeScreen

