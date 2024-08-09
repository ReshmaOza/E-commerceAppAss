import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductCategoriesScreen from '../screens/products/ProductCategoriesScreen';
import SubCategoriesScreen from '../screens/products/SubCategoriesScreen';
import SearchScreen from '../screens/products/SearchScreen';

const Stack = createStackNavigator();

const ProductsStack = () => {
    return (
      <Stack.Navigator initialRouteName="ProductCategories">
        <Stack.Screen name="ProductCategories" component={ProductCategoriesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SubCategories" component={SubCategoriesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };
  
  export default ProductsStack;
