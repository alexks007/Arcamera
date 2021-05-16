import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Platform, View } from 'react-native'
import WebView from 'react-native-webview'
import { request, PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { useSelector } from 'react-redux';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null)

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION])
        .then((statuses) => {
          if (statuses["android.permission.ACCESS_FINE_LOCATION"] === "granted" && statuses["android.permission.CAMERA"] === "granted") {
            setHasPermission("granted")
          }
        })
    } else if (Platform.OS === 'ios') {
      requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.LOCATION_ALWAYS])
        .then((statuses) => {
          if (statuses["ios.permission.LOCATION_ALWAYS"] === "granted" && statuses["ios.permission.CAMERA"] === "granted") {
            setHasPermission("granted")
          }
        })
    }
  })

  if (hasPermission !== 'granted') {
    return (
      <View>
        <Text>Camera or Device Location is not allowed!</Text>
      </View>
    )
  }

  return (
    <View>
      {
        console.log('https://continuous-nickel-amethyst.glitch.me/')
      }
      <WebView
        source={{ uri: 'https://continuous-nickel-amethyst.glitch.me/' }}
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  )
}



