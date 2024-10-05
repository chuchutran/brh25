import { Text, View } from 'react-native'
import { Tabs, Redirect} from 'expo-router'
import React from 'react'

const TabIcon =({ icon, color, name, focused}) => {
  
}

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (

            )
          }}
          />
      </Tabs>
    </>
  )
}

export default TabsLayout
