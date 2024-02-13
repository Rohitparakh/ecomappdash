import Toast from 'react-native-root-toast';
import React, { Component,useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  TextInput
} from "react-native";

import{APIbaseURL,styles} from "../../App"
import axios from "axios";
import { fetchUser } from "../../redux/actions/userActions";
import{connect} from 'react-redux'

// import {AsyncStorage} from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({
  navigation,
  fetchUser
}) => {
  const [email, setEmail] = useState('rohitparakh4@gmail.com');
  const [password, setPassword] = useState('1111');

  const setItemAsyncStorage=async (key,value)=>{
    try{
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    }catch(error){
      // console.log(error)
    }
  }

  const login=async()=>{
    const paramsObject = new URLSearchParams();
    paramsObject.append('email', email);
    await axios.get(`${APIbaseURL}/user/login`,{
      params: paramsObject
    }).then((response)=>{
if(response.data.errors){
  console.log(response.data.errors)
}
if(response.data[0].password === password){
console.log("No Error"+response.data[0])
  fetchUser(response.data[0]);
  
setItemAsyncStorage('loggedUser',response.data[0])  
Toast.show('Login successful', {
  duration: 5500,
position: -70,
shadow: true,
animation: true,
hideOnPress: true,
delay: 0,
});
  navigation.navigate('Home')
}else{
  // console.log('Wrong password')
  Toast.show('Wrong Password', {
    duration: 5500,
  position: -70,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
  });
}
    }).catch((error)=>{
      console.log(error)
    })
  }

    return (
        <View style={styles.container}>
                <Text style={{fontSize:20,textTransform:'uppercase',letterSpacing:5,
            position:'absolute', top:30}}>Login Screen</Text>
                <View style={{flexDirection:'row',alignItems:'center',flex:1,maxHeight:50,minWidth:'50%'}}>
            <Text style={{width:'20%'}}>Email: </Text>
                <TextInput style={{borderWidth:1,borderColor:'#000',width:'50%',height:40,borderRadius:3}}
                 value={email} onChangeText={setEmail}></TextInput>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',flex:1,maxHeight:50,minWidth:'50%'}}>
            <Text style={{width:'20%'}}>Password: </Text>
                <TextInput style={{borderWidth:1,borderColor:'#000',width:'50%',height:40,borderRadius:3}}
                 value={password} onChangeText={setPassword} secureTextEntryexpo publish ></TextInput>
            </View>
            <TouchableOpacity onPress={login} style={{padding:15,backgroundColor:'#c01c27',margin:15,width:'60%'}}>
                <Text style={{color:'white',textAlign:'center',letterSpacing:5,textTransform:'uppercase'}}>Login</Text>
            </TouchableOpacity>
            </View>
    )
}

const mapDispatchToProps=dispatch=>{
  return{
    fetchUser:(user)=>{
      dispatch(fetchUser(user));
  }
  }
}

export default connect(null,mapDispatchToProps)(Login)
