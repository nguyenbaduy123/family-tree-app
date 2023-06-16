import React, {useState} from 'react';
import {Image} from 'react-native';
import Splash from './src/screens/auth/Splash';
import Signup from './src/screens/auth/Signup';
import Signin from './src/screens/auth/Signin';
import Event from './src/screens/app/Event';
import Genealogy from './src/screens/app/Genealogy';
import Account from './src/screens/app/Account';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from './src/utils/color';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AddEvent from './src/screens/addEvent';
import AddGenealogy from './src/screens/genealogy/addGenealogy';
import UpdateGenealogy from './src/screens/genealogy/updateGenealogy';
import UpdateProfile from './src/screens/profile/updateProfile';
import ViewProfile from './src/screens/profile/viewProfile';
import AddPeople from './src/screens/genealogy/addPeople';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let icon;

          if (route.name === 'Gia phả') {
            icon = focused
              ? require('./src/assets/tabs/genealogy.jpg')
              : require('./src/assets/tabs/genealogy.jpg');
          } else if (route.name === 'Sự kiện') {
            icon = focused
              ? require('./src/assets/tabs/event.png')
              : require('./src/assets/tabs/event.png');
          } else if (route.name === 'Tài khoản') {
            icon = focused
              ? require('./src/assets/tabs/account.png')
              : require('./src/assets/tabs/account.png');
          } 

          // You can return any component that you like here!
          return <Image style={{width: 30, height: 30}} source={icon} />;
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Gia phả" component={Genealogy} />
      <Tab.Screen name="Sự kiện" component={Event} />
      <Tab.Screen name="Tài khoản" component={Account} />
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
          <Stack.Screen
            name="UpdateGenealogy"
            component={UpdateGenealogy}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddEvent"
            component={AddEvent}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ViewProfile"
            component={ViewProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UpdateProfile"
            component={UpdateProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddPeople"
            component={AddPeople}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
