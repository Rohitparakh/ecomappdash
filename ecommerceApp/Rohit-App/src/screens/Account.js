import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Toast from 'react-native-root-toast';

import FlatText from '../components/FlatText';

import { styles } from '../../App'
import {connect} from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUser } from "../../redux/actions/userActions";


const Account = ({
  navigation,
  userData,
  fetchUser
}) => {

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('loggedUser')
      fetchUser(null)
      console.log('Logout Successful.')
     
      Toast.show('Logout successful.', {
        duration: 5500,
      position: -70,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      });

    } catch(e) {
console.log(e)}  

}



  return (
    <View style={{flex:1}}>
              {/* <FlatText color='#000' textalign='center' text="Account screen" font="q_regular" size={22} /> */}
              <Text style={{backgroundColor:'#eee',fontSize:25,textTransform:'uppercase',
              letterSpacing:5, textAlign:'center',color:'#c01c27',borderBottomColor:'#000',
              height:40,marginLeft:10,marginTop:30}}>Account Details</Text>

              
          {
          userData?(
          userData._id==""||userData._id==null||userData._id==undefined?(
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{textTransform:'uppercase',letterSpacing:6,marginVertical:15}}>You aren't logged in</Text>

          <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{backgroundColor:'red',padding:15,marginBottom:15}}>
          <Text style={{textTransform:'uppercase',letterSpacing:6}}>login</Text>
          </TouchableOpacity>
          <Text style={{fontSize:12,textTransform:'uppercase',letterSpacing:3,marginVertical:15}}>Don't have an account?</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Signup')} style={{backgroundColor:'orange',paddingVertical:15,paddingHorizontal:5}}>
          <Text style={{textTransform:'uppercase',letterSpacing:6}}>Sign Up</Text>
          </TouchableOpacity>
          </View>
          ):(
          <>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center', marginLeft:15, marginVertical:15}} >
                <Image
                  style={css.profileImg}
                  source={{ uri: `https://ui-avatars.com/api/?background=C01C27&color=fff&size=100&name=${encodeURIComponent(userData.name.trim())}` }}
                />
                <Text style={{fontSize:20}}>Hi, {userData.name}</Text>
          </View>
          <View style={css.dataContainer}>
          <Text style={css.heading}>Address Line 1</Text>
          <Text style={css.data}>{userData.addressLine1}</Text>
          </View>
          <View style={css.dataContainer}>
          <Text style={css.heading}>Address Line 2</Text>
          <Text style={css.data}>{userData.addressLine2}</Text>
          </View>
          <View style={css.dataContainer}>
          <Text style={css.heading}>Phone</Text>
          <Text style={css.data}>{userData.phone}</Text>
          </View>
          <View style={css.dataContainer}>
          <Text style={css.heading}>Email</Text>
          <Text style={css.data}>{userData.email}</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('EditAccount')}
          style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{padding:10,backgroundColor:'#c01c27',color:'#fff'}}>Edit Information</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={logout}
          style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{padding:10,backgroundColor:'#f45f6a',color:'#fff'}}>Logout</Text>
          </TouchableOpacity>
          </>
          )):(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text style={{textTransform:'uppercase',letterSpacing:6,marginVertical:15}}>You aren't logged in</Text>
  
            <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{backgroundColor:'red',padding:15,marginBottom:15}}>
            <Text style={{color:'white',textTransform:'uppercase',letterSpacing:6}}>login</Text>
            </TouchableOpacity>
            <Text style={{fontSize:12,textTransform:'uppercase',letterSpacing:3,marginVertical:15}}>Don't have an account?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Signup')} style={{backgroundColor:'orange',paddingVertical:15,paddingHorizontal:5}}>
            <Text style={{textTransform:'uppercase',letterSpacing:6}}>Sign Up</Text>
            </TouchableOpacity>
            </View>
          )
        }
          

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
    fetchUser:(user)=>{
      dispatch(fetchUser(user));
  }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Account)

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
fontWeight:'bold'
  },
  data:{
    fontSize:15
  },
  dataContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:10,
    borderBottomWidth :1,
    paddingVertical:15,
    borderBottomColor: '#aaa',
  }
})