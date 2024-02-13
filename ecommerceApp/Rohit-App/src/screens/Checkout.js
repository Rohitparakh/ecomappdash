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

const Checkout = () => {
    return (
        <View style={styles.container}>
          {/* <FlatText color='#000' textalign='center' text="Checkout screen" font="q_regular" size={20} /> */}
          <Text>Checkout Screen</Text>

        </View>
    )
}

export default Checkout
