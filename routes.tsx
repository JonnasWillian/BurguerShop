import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Initial from './screens/initial';
import ItemDetails from './screens/ItemDetails';
import OrderSummary from './screens/OrderSummary';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen name="/" component={Initial as React.FC} options={{ headerShown: false }} />
        <Stack.Screen name="ItemDetails" component={ItemDetails as React.FC} options={{ headerShown: false }} />
        <Stack.Screen name="OrderSummary" component={OrderSummary as React.FC} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
