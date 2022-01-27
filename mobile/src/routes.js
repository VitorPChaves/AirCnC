import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

import CheckIn from './pages/CheckIn';
import LoginUser from './pages/LoginUser';
import LoginCompany from './pages/LoginCompany';
import List from './pages/List';
import Dashboard from './pages/Dashboard';
import Book from './pages/Book';
import NewSpot from './pages/NewSpot';

export default function Routes() {
  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CheckIn" component={CheckIn} />
        <Stack.Screen name="LoginUser" component={LoginUser} />
        <Stack.Screen name="LoginCompany" component={LoginCompany} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Book" component={Book} />
        <Stack.Screen name="NewSpot" component={NewSpot} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}