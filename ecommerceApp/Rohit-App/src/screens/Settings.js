import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { styles } from '../../App';
import { AntDesign } from '@expo/vector-icons'; 


const Settings = ({
  navigation,
  orders
}) => {

  const _renderOrders=({item,index})=>{
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Details',{ item })}>
                 <View style={css.renderCartItem}>
 
                 <View style={{flex:1,flexDirection:'row',alignItems:'center',marginLeft:15}}>
                     <Text style={{marginRight:5}}>{++index}.</Text>
                   {/* <Image style={css.renderItemImg} source={{uri:`https://source.unsplash.com/190x150/?${item.title}`}}></Image> */}
                   <View style={{marginLeft:15,flex:1,justifyContent:'center'}}>
                     {/* <Text>{item.title}</Text> */}
                     <Text>₹ {item.price}</Text>
                   </View>
                   </View>
                   <View style={{position:'absolute',top:15,right:'20%',maxHeight:45,marginRight:-15}}>
                          <View style={{flex:1,flexDirection:'row'}}>
                                <TouchableOpacity onPress={()=>decreaseQuantity(item,null)}>
                                <Text style={{color:'#fff',backgroundColor:'#c01c27',padding:15}} >-</Text>
                                </TouchableOpacity>
                                <Text style={{flex:0,color:'#fff',backgroundColor:'#666',paddingHorizontal:10,paddingVertical:15}}>{item.quantity}</Text>
                                <TouchableOpacity onPress={()=>addToCart(item,null,1,null,null)}>
                                <Text style={{color:'#fff',backgroundColor:'#c01c27',padding:15}}>+</Text>
                                </TouchableOpacity>
                                </View>
                   </View>
                   <TouchableOpacity style={{marginRight:15}} onPress={()=>deleteFromCart(item)}>
                                {/* <Text style={{color:'#fff',backgroundColor:'#c01c27',padding:15}}> */}
                                <AntDesign name="delete" size={20} color="#c01c27" style={{paddingHorizontal:15}} />
                                {/* </Text> */}
 
                                </TouchableOpacity>
                 </View>
 </TouchableOpacity>
 )
   }

  return (
    <View style={styles.container}>
          <Text>Your Orders</Text>
          <ScrollView>
          <FlatList
              data={orders}
              renderItem={({item,index})=>_renderOrders({item,index})}
              keyExtractor={item=>item._id.toString()}
                  />
          </ScrollView>

    </View>
  )
}


const mapStateToProps = state => {
  return {
   orders:state.allOrdersData.allOrders
  };
};


export default connect(mapStateToProps)(Settings)


const css=StyleSheet.create({
  renderItemImg: {
     width: 75, 
     height: 75, 
     borderRadius: 5,
     justifyContent:'center'
 },
 renderCartItem:{
     flex:1,
     flexDirection:'row',
     width:'100%',
     justifyContent:'space-evenly',
     alignItems:'center',
     marginTop: 10,
     paddingBottom: 10,
     marginBottom: 10
 }
})