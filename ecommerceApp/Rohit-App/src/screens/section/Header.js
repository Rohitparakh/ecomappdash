import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import FlatText from "../../components/FlatText";
import HeadText from "../../components/HeadText";
// import AsyncStorage from "@react-native-community/async-storage";
// import config from '../../../config/config.json';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';

const Header=({
  navigation,
  userData})=> {
  // console.warn(props)
    return (
      <View style={css.headerContainer}>
        <View style={{flex:1}}>
          {/* <FlatText
            style={css.deliverTo}
            text="Delivery To"
            font="q_semibold"
            color="#333"
            size={17}
          /> */}
          <Text
            style={(css.deliverTo, {fontSize:20,color:'#333'})}
            >Delivery To</Text>
          <View style={css.dFlex}>
            <SimpleLineIcons
              style={css.locationIcon}
              name="location-pin"
              size={15}
              color="#666"
            />
            {/* <HeadText
              text={this.state.address}
              font="q_medium"
              color="#666"
              size={14}
              width={50}
            /> */}
            <Text
            style={{flex:1,fontSize:14,color:'#666',width:60}}
            >{userData?.addressLine1?(userData.addressLine1):("Login to set location")}</Text>
          </View>
        </View>
      {userData?.name?(
      <View 
      >
      <TouchableOpacity onPress={()=>navigation.navigate('Account')}>
        <Image
          style={css.profileImg}
          source={{ uri: `https://ui-avatars.com/api/?background=C01C27&color=fff&size=100&name=${encodeURIComponent(userData.name.trim())}` }}
        />
      </TouchableOpacity>
      </View>
      ):null}
        
      </View>
    );
  }

const mapStateToProps= state=>{
  return{
userData:state.userData.user
  }
}

export default connect(mapStateToProps)(Header);


const css = StyleSheet.create({
  headerContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  //   shadowColor: "#000",
  //   shadowOffset: {
	//     width: 0,
	//     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 10.84,
  //   elevation:7
  },
  profileImg: {
    width: 45,
    height: 45,
    borderRadius: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
  dFlex: {
    flexDirection: "row",
  },
  arrowIcon: {
    paddingLeft: 5,
    paddingTop: 1,
  },
  locationIcon: {
    marginTop: 4,
    marginRight: 5
  }
});
