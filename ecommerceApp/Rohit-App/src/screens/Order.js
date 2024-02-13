import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";

import FlatText from '../components/FlatText';
import{styles} from "../../App"

const Order = () => {
    return (
        <View style={styles.container}>
          <Text>Order Screen</Text>
          {/* <FlatText color='#000' textalign='center' text="Order screen" font="q_regular" size={20} /> */}
        </View>
    )
}

export default Order
