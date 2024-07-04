import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Initial from "./screens/initial";

const Tab = createNativeStackNavigator();


export default function Routes(){
  return(
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="/" component={Initial as React.FC} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}