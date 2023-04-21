import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React, { Component } from 'react';
import axios from 'axios'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/component/Main/Main'
import Authentication from './src/component/Authentication/Authentication'
import OderHistory from './src/component/OrderHistory/OrderHistory'
import ChangeInfo from './src/component/ChangeInfo/ChangeInfo'
import { NavigationContainer } from '@react-navigation/native';
import OrderHistory from './src/component/OrderHistory/OrderHistory';
import DetailProduct from './src/component/DetailProduct/DetailProduct';
const Stack = createNativeStackNavigator();
StatusBar.setHidden(true)
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MAIN" screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="MAIN" component={Main} />
          <Stack.Screen name="CHANGE_INFO" component={ChangeInfo} />
          <Stack.Screen name="ORDER_HISTORY" component={OrderHistory} />
          <Stack.Screen name="AUTHENTICATION" component={Authentication} />
          <Stack.Screen name="DETAIL_PRODUCT" component={DetailProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

