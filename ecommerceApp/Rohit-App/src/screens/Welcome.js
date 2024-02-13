import React, { Component } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text
} from "react-native";
import{styles} from "../../App"
import FlatText from '../components/FlatText';

const Welcome = ({navigation}) => {
    return (
        <View style={styles.container}>
          {/* <FlatText color='#000' textalign='center' text="Welcome screen" font="q_regular" size={20} /> */}
          <Text>Welcome</Text>
          <Button
          style={css.primaryButton}
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
    )
}

export default Welcome

const css=StyleSheet.create({
  primaryButton:{
    backgroundColor:'#000000',
    paddingHorizontal:10,
    color:'black',
    paddingVertical:5,
    letterSpacing:1
  }
})
