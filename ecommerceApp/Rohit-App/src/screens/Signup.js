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
import{connect} from 'react-redux'
import{styles} from "../../App"
import axios from "axios";
import {APIbaseURL} from '../../App'
import { fetchUser } from "../../redux/actions/userActions";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({
    navigation,
fetchUser
}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('rohitparakh4@gmail.com');
    const [phone, setPhone] = useState(9840989414);
    const [addressLine1, setAddressLine1] = useState('612, Akash Ganga Apartments');
    const [addressLine2, setAddressLine2] = useState('Kilpauk, Chennai-10');
    const [password, setPassword] = useState('1111');

    const setItemAsyncStorage=async (key,value)=>{
        try{
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        }catch(error){
        //   console.log(error)
        }
      }

    const signup=async()=>{
        var newUser={
            'name':name,
            'email':email,
            'phone':phone,
            'password':password,
            'addressLine1':addressLine1,
            'addressLine2':addressLine2
        }
        // console.log(newUser)
        const res=await axios.post(`${APIbaseURL}/user/new`,newUser ).then(function (response) {
            if(response.data.code === 11000){
                // console.log('Email already is use')
            }else if(response.data.errors){
                // console.log(response.data.message)
            }else{
                // console.log(response.data)
                fetchUser(response.data);
               try {
                setItemAsyncStorage('loggedUser',response.data)
                Toast.show('Signup successful.', {
                    duration: 5500,
                  position: -70,
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                  delay: 0,
                  });
                } catch (error) {
                //    console.log(error)
               } 
                // console.log('Registered successfully');
                navigation.navigate('Account')
            }
          })
          .catch(function (error) {
            // console.log(error);
          });
    }
    return (
        <View style={styles.container}>
                <Text style={{fontSize:20,textTransform:'uppercase',letterSpacing:5,
            position:'absolute', top:30}}>Signup Screen</Text>
                <View style={{flexDirection:'row',alignItems:'center',flex:1,maxHeight:50,minWidth:'50%'}}>
            <Text style={{width:'20%'}}>Name: </Text>
                <TextInput style={{borderWidth:1,borderColor:'#000',width:'50%',height:40,borderRadius:3}}
                 value={name} onChangeText={setName}></TextInput>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',flex:1,maxHeight:50,minWidth:'50%'}}>
            <Text style={{width:'20%'}}>Email: </Text>
                <TextInput style={{borderWidth:1,borderColor:'#000',width:'50%',height:40,borderRadius:3}}
                 value={email} onChangeText={setEmail}></TextInput>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',flex:1,maxHeight:50,minWidth:'50%'}}>
            <Text style={{width:'20%'}}>Password: </Text>
                <TextInput style={{borderWidth:1,borderColor:'#000',width:'50%',height:40,borderRadius:3}}
                 value={password} onChangeText={setPassword} secureTextEntry></TextInput>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',flex:1,maxHeight:50,minWidth:'50%'}}>
            <Text style={{width:'20%'}}>Phone: </Text>
            <TextInput style={{borderWidth:1,borderColor:'#000',width:'50%',height:40,borderRadius:3}}
                 value={phone.toString()} onChangeText={e=>setPhone(parseInt(e))} keyboardType={'numeric'}></TextInput>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',flex:1,maxHeight:50,minWidth:'50%'}}>
            <Text style={{width:'20%'}}>Address Line 1: </Text>
                <TextInput style={{borderWidth:1,borderColor:'#000',width:'50%',height:40,borderRadius:3}}
                 value={addressLine1} onChangeText={setAddressLine1}></TextInput>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',flex:1,maxHeight:50,minWidth:'50%'}}>
            <Text style={{width:'20%'}}>Address Line 2: </Text>
                <TextInput style={{borderWidth:1,borderColor:'#000',width:'50%',height:40,borderRadius:3}}
                 value={addressLine2} onChangeText={setAddressLine2}></TextInput>
            </View>
    
            <TouchableOpacity onPress={signup} style={{padding:15,backgroundColor:'#c01c27',margin:15,width:'60%'}}>
                <Text style={{color:'white',textAlign:'center',letterSpacing:5,textTransform:'uppercase'}}>Signup</Text>
            </TouchableOpacity>
          {/* <FlatText color='#000' textalign='center' text="Signup screen" font="q_regular" size={20} /> */}
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

export default connect(null,mapDispatchToProps)(Signup)
