import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { Provider } from "react-redux";
import { fetchAllOrders } from "./redux/actions/allOrdersActions";
import { fetchAllGroceries } from "./redux/actions/allGroceriesActions";
import { fetchOfferGroceries } from "./redux/actions/offerGroceriesActions";
import { calculateOfferGroceries } from "./redux/actions/offerGroceriesActions";
import { fetchCategories } from "./redux/actions/categoriesActions";
import { fetchUser } from "./redux/actions/userActions";
import rootReducer from "./redux/reducers/rootReducer";
import user from "./data/userData.json";
import { composeWithDevTools } from "redux-devtools-extension";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootSiblingParent } from 'react-native-root-siblings';


// import screens
import Welcome from './src/screens/Welcome';
import Search from './src/screens/Search';
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import EditAccount from './src/screens/EditAccount';
import Checkout from './src/screens/Checkout';
import Account from './src/screens/Account';
import Info from './src/screens/Info';
import Cart from './src/screens/Cart';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Register from './src/screens/Register';
import Thanks from './src/screens/Thanks';
import Order from './src/screens/Order';
import Orderview from './src/screens/Orderview';
import Redirect from './src/screens/Redirect';
import Reredirect from './src/screens/Reredirect';
import Settings from './src/screens/Settings';
import Header from './src/screens/section/Header';

const Stack = createStackNavigator();
const DrewerStack = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

export const APIbaseURL="http://192.168.29.50:8080/api";

let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};

const getLoggedUser=async()=>{
try{
   const jsonValue=await AsyncStorage.getItem('loggedUser');
  return jsonValue != null ? JSON.parse(jsonValue) : null;
}catch(error){
  console.log(error)
  return null}}

const getAllGroceriesServer=()=>{
  axios.get(APIbaseURL,axiosConfig)
  .then((response)=>{
    console.log("Data:"+response.data);
store.dispatch(fetchAllGroceries(response.data));
  })
  .catch((error)=>{
    console.log(`Error in app.js file fetching api product data : ${error}`)
  })
}
const getOfferGroceriesServer=()=>{

  axios.get(`${APIbaseURL}/offer`)
  .then((response)=>{
store.dispatch(fetchOfferGroceries(response.data))
  })
  .catch((error)=>{
    console.log(`Error in app.js file fetching api offer data ${error}`)
  })
}

const getCategoriesServer=()=>{
  axios.get(`${APIbaseURL}/categories`)
  .then((response)=>{
    console.log("Data:"+response.data);
store.dispatch(fetchCategories(response.data));
  })
  .catch((error)=>{
    console.log(`Error in app.js file fetching api category data ${error}`)
  })
}

const restt = axios.get(`http://192.168.29.50:8080/api`).then(()=>{
  console.log(restt)
})

//getting app data from server
getAllGroceriesServer();
// getOfferGroceriesServer();
// getCategoriesServer();

const HomeTabScreen = () => (
  <Tab.Navigator initialRouteName="Welcome" barStyle={{ backgroundColor: '#fff' }} activeColor="#333"
  inactiveColor="#333">
    <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}/>
    <Tab.Screen name="Search" component={Search} options={{
      tabBarLabel: 'Search',
      tabBarIcon: ({ color }) => (
        <AntDesign name="search1" size={24} color={color} />
      ),
    }}/>
    <Tab.Screen name="Cart" component={Cart} options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingcart" size={24} color={color} />
          ),
        }}/>
    <Tab.Screen name="Account" component={Account} options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}/>
    <Tab.Screen  name="Settings" component={Settings} options={{
      tabBarLabel: 'Settings',
      tabBarIcon: ({ color }) => (
        <AntDesign name="setting" size={24} color={color} />
      ),
    }} />
  </Tab.Navigator>
)
// Remove loggedUser value from asyncstorage
// removeValue = async () => {
//   try {
//     await AsyncStorage.removeItem('loggedUser')
//   } catch(e) {
//     // remove error
//   }

//   console.log('Done.')
// }
// removeValue()
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
const fetchLoggedUser=async()=>{
  const loggedUser= await getLoggedUser();
  if(loggedUser!==null){
  store.dispatch(fetchUser(loggedUser));  
  getOrderById(loggedUser._id) 
}
}
fetchLoggedUser()

const getOrderById=async(id)=>{
await axios.get(APIbaseURL+"/orders/user?id="+id)
.then((response)=>{
  console.log("Data Order:"+JSON.stringify(response.data));
  store.dispatch(fetchAllOrders(response.data));
})
.catch((error)=>{
  console.log(`Error in App.js file fetching api order data ${error}`)
}) 
}

// const getLoggedUserOrders=async()=>{
  // const loggedUser= await getLoggedUser();
  
//  getOrderById() 
// }
// getLoggedUserOrders()
// fetch products from json file
// store.dispatch(fetchOfferGroceries(offerGroceries));
// store.dispatch(fetchCategories(categories));
// store.dispatch(fetchUser(user));

export default function App() {
  
  return (
    <RootSiblingParent>
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Header" component={Header} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Home" component={HomeTabScreen}/>
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="EditAccount" component={EditAccount} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Thanks" component={Thanks} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Orderview" component={Orderview} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Redirect" component={Redirect} />
        <Stack.Screen name="Reredirect" component={Reredirect} />
      </Stack.Navigator>
    </NavigationContainer>
    <StatusBar style="dark" />
    </Provider>
    </RootSiblingParent>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }

})
