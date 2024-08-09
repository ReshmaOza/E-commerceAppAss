import React from 'react';
import { Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsStack from './ProductsStack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import OverView from '../screens/overview/OverView';
import OrderScreens from '../screens/orders/OrderScreens';

const Tab = createBottomTabNavigator();
const orderIcon = require('../assets/images/orders.png');
const productsIcon = require('../assets/images/product.png');
const overviewIcon = require('../assets/images/overview.png');
const profileIcon = require('../assets/images/person.png');

const Routes = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Products"
            
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                  let iconSource;
      
                  switch (route.name) {
                    case 'Order':
                      iconSource = orderIcon;
                      break;
                    case 'Products':
                      iconSource = productsIcon;
                      break;
                    case 'Overview':
                      iconSource = overviewIcon;
                      break;
                    case 'Profile':
                      iconSource = profileIcon;
                      break;
                    default:
                      break;
                  }
      
                  return (
                    <Image
                      source={iconSource}
                      style={{
                        width: 22,
                        height: 22,
                        tintColor: focused ? '#6B6062' : '#6B6062'
                      }}
                      resizeMode="contain"
                    />
                  );
                },
                tabBarLabel: ({ focused }) => {
                    const color = focused ? '#6B6062' : '#6B6062';
                    return (
                      <Text style={{ color, fontSize: 12,lineHeight:18 }}>
                        {route.name}
                      </Text>
                    );
                  },
                  tabBarActiveTintColor: '#000',
                  tabBarInactiveTintColor: '#666',
              })}
            >
                <Tab.Screen name="Order" component={OrderScreens} />
                <Tab.Screen name="Products" component={ProductsStack} />
                <Tab.Screen name="Overview" component={OverView} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
