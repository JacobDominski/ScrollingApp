import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home'
import Weather from './screens/Weather'
import Nasa from './screens/Nasa'
import Images from './screens/Images'

import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator()

/*this function is the first function to run in my app 
  it is a tab navigator to switch between four screens
  Home screen shows breaking news in the US
  Weather screen shows the weather at any city internationally
  Nasa screen shows the image of the day and images from mars
  Images screen shows random images

*/
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style={"Dark"}/>
      <Tab.Navigator 
        activeColor="#f0edf6"
        shifting={true}
      >
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="home" size={24} color={color} />
            ),
            tabBarColor: "#008cff"
          }}
        />
        <Tab.Screen 
          name="Weather" 
          component={Weather} 
          options={{
            tabBarLabel: "Weather",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="cloud-sun" size={24} color={color} />
            ),
            tabBarColor: "#7700ff"
          }}
        />
        <Tab.Screen 
          name="Nasa" 
          component={Nasa} 
          options={{
            tabBarLabel: "Nasa",
            tabBarIcon: ({ color }) => (
              <Ionicons name="planet" size={24} color={color} />
            ),
            tabBarColor: "#f765a3"
          }}
        />
        <Tab.Screen 
          name="Images" 
          component={Images} 
          options={{
            tabBarLabel: "Images",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="image" size={24} color={color} />
            ),
            tabBarColor: "#ffb300"
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

