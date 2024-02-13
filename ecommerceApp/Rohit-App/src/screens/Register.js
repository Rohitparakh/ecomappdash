import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text
} from "react-native";

import FlatText from '../components/FlatText';
import{styles} from "../../App"

const Register = () => {
    return (
        <View style={styles.container}> 
          <Text>Register Screen</Text>
          {/* <FlatText color='#000' textalign='center' text="Register screen" font="q_regular" size={20} /> */}
        </View>
    )
}

export default Register
