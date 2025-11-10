import { View, Text,Image } from 'react-native'
import React from 'react'

const PostComposer = () => {
  return (
    <View className="border-b border-gray-100 p-4 bg-white">
      {/* <View className="flex-row">
        <Image source={{ uri: user?.imageUrl }} className="w-12 h-12 rounded-full mr-3" />
        <View className="flex-1">
          <TextInput
            className="text-gray-900 text-lg"
            placeholder="What's happening?"
            placeholderTextColor="#657786"
            multiline
            value={content}
            onChangeText={setContent}
            maxLength={280}
          />
        </View>
      </View> */}

      <Text>PostComposer</Text>
    </View>
  )
}

export default PostComposer