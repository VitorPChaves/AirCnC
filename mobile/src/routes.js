import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

import Splash from './pages/Splash';
import CheckIn from './pages/CheckIn';
import LoginUser from './pages/LoginUser';
import LoginCompany from './pages/LoginCompany';
import UserDashboard from './pages/UserDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import Book from './pages/Book';
import NewSpot from './pages/NewSpot';

export default function Routes() {
  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="CheckIn" component={CheckIn} options={{gestureEnabled:false}}/>
        <Stack.Screen name="LoginUser" component={LoginUser} />
        <Stack.Screen name="LoginCompany" component={LoginCompany} />
        <Stack.Screen name="UserDashboard" component= {UserDashboard} />
        <Stack.Screen name="CompanyDashboard" component={CompanyDashboard} />
        <Stack.Screen name="Book" component={Book} />
        <Stack.Screen name="NewSpot" component={NewSpot} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}