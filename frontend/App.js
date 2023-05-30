import React, {useState} from 'react';
import {Image} from 'react-native';
import Splash from './src/screens/auth/Splash';
import Signup from './src/screens/auth/Signup';
import Signin from './src/screens/auth/Signin';
import Event from './src/screens/app/Event';
import Genealogy from './src/screens/app/Genealogy';
import Profile from './src/screens/app/Profile';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from './src/utils/color';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AddGenealogy from './src/screens/addGenealogy';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let icon;

          if (route.name === 'Genealogy') {
            icon = focused
              ? require('./src/assets/tabs/genealogy.jpg')
              : require('./src/assets/tabs/genealogy.jpg');
          } else if (route.name === 'Profile') {
            icon = focused
              ? require('./src/assets/tabs/profile.png')
              : require('./src/assets/tabs/profile.png');
          } else if (route.name === 'Event') {
            icon = focused
              ? require('./src/assets/tabs/event.png')
              : require('./src/assets/tabs/event.png');
          }

          // You can return any component that you like here!
          return <Image style={{width: 30, height: 30}} source={icon} />;
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Genealogy" component={Genealogy} />
      <Tab.Screen name="Event" component={Event} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const App = () => {

  const theme = {
    colors: {
      background: colors.white,
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddGenealogy"
            component={AddGenealogy}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
