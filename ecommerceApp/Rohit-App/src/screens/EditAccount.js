import Toast from 'react-native-root-toast';
import React, { Component,useState,useEffect } from "react";;
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput
} from "react-native";
import axios from "axios";
import { styles,APIbaseURL } from '../../App';
import {connect} from 'react-redux';
import {editUser} from '../../redux/actions/userActions'
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditAccount = ({
  navigation,
  userData,
  editUser
}) => {

const [name, setName] = useState(userData.name)
const [addressLine1, setAddressLine1] = useState(userData.addressLine1)
const [addressLine2, setAddressLine2] = useState(userData.addressLine2)
const [phone, setPhone] = useState(userData.phone)
const [email, setEmail] = useState(userData.email)

const[user,setUser]= useState(userData)

const setItemAsyncStorage=async (key,value)=>{
  try{
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  }catch(error){
    console.log(error)
  }
}

const editUserServer=async()=>{
  const res=await axios.post(`${APIbaseURL}/user/edit`,user ).then(function (response) {
    if(response.data.errors){
      console.log(response.data.errors)
     }
     Toast.show('Account edited successfully.', {
      duration: 5500,
    position: -70,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    });
      setItemAsyncStorage('loggedUser',response.data);
 })
}

const onSubmit=()=>{
    setUser({
        ...userData,
        ['name']:name,
    ['addressLine1']:addressLine1,
    ['addressLine2']:addressLine2,
    ['phone']:parseInt(phone),
    ['email']:email,
    })
    setTimeout(() => {
    navigation.navigate('Home',{route:'Account'})      
    }, 1000);
}

useEffect(() => {
    editUser(user)
    editUserServer();

}, [user])


  return (
    <View style={{flex:1}}>
              <Text style={{backgroundColor:'#eee',fontSize:25,textTransform:'uppercase',
              letterSpacing:5, textAlign:'center',color:'#c01c27',borderBottomColor:'#000',
              height:40,marginLeft:10,marginTop:30}}>Account Details</Text>

              
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center', marginLeft:15, marginVertical:15}} >
                <Image style={css.profileImg}
                source={{ uri: `https://ui-avatars.com/api/?background=C01C27&color=fff&size=100&name=${encodeURIComponent(userData.name.trim())}` }}
                />
                <Text style={{fontSize:20}}>Hi, {userData.name}</Text>
          </View>
          <View style={css.dataContainer}>
          <Text style={css.heading}>Name</Text>
          <TextInput value={name} onChangeText={setName} style={css.dataInput}></TextInput>
          </View>
          <View style={css.dataContainer}>
          <Text style={css.heading}>Address Line 1</Text>
          <TextInput value={addressLine1} onChangeText={setAddressLine1} style={css.dataInput}></TextInput>
          </View>
          <View style={css.dataContainer}>
          <Text style={css.heading}>Address Line 2</Text>
          <TextInput value={addressLine2} onChangeText={setAddressLine2} style={css.dataInput}></TextInput>
          </View>
          <View style={css.dataContainer}>
          <Text style={css.heading}>Phone</Text>
          <TextInput numeric keyboardType={'numeric'} onChangeText={(e)=>setPhone(parseInt(e))} value={phone.toString()} style={css.dataInput}></TextInput>
          </View>
          <View style={css.dataContainer}>
          <Text style={css.heading}>Email</Text>
          <TextInput value={email} onChangeText={setEmail} style={css.dataInput}></TextInput>
          </View>
          <TouchableOpacity onPress={onSubmit}
          style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{padding:15,backgroundColor:'#c01c27',color:'#fff'}}>Save</Text>
          </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = state => {
  return {
    userData:state.userData.user
  };
};

const mapDispatchToProps=dispatch=>{
    return{
        editUser: (item) => {
      dispatch(editUser(item));
    }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditAccount)

const css=StyleSheet.create({
  profileImg: {
    width: 45,
    height: 45,
    borderRadius: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight:15
  },
  heading:{
    fontSize:16,
    fontWeight:'bold',
    maxWidth:'40%'
  },
  dataInput:{
    fontSize:15,
    borderColor:'#999',
    borderWidth:1,
    width:'60%',
    padding:10
  },
  dataContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginHorizontal:10,
    // borderBottomWidth :1,
    paddingVertical:15,
    // borderBottomColor: '#aaa',
  }
})