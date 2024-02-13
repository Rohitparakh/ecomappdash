import React, { Component,useState } from "react";
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
import {connect} from 'react-redux'

import {addToCart,decreaseQuantity} from '../../redux/actions/cartActions'

const Details = ({
  route,
  navigation,
  cartItems,
  addToCart,
  decreaseQuantity
}) => {
const item=route.params.item;
    var searchInCart=cartItems.filter((val,i)=>{
                              if(val.id==item.id)return val
                            })
    return (
        <View style={css.container}>
<Image style={css.productImg} source={{uri:`https://source.unsplash.com/190x150/?${item.title}`}}/>
          <Text style={css.productTitle}>{item.title}</Text>
          <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:15,marginRight:5}}>₹{item.price}.00</Text>
          <Text style={{textDecorationLine:'line-through',fontSize:15}}>₹{item.mrp}.00</Text>
          </View>

               {searchInCart.length>=1?(<>
                               <Text style={{marginTop:25,textTransform:'uppercase',letterSpacing:6}}>Select Quantity</Text>
                               <View style={{flex:1,flexDirection:'row',maxHeight:45,marginTop:5}}>
                               <TouchableOpacity onPress={()=>decreaseQuantity(item,null)}>
                               <Text style={{color:'#fff',backgroundColor:'#c01c27',padding:15}} >-</Text>
                               </TouchableOpacity>
                               <Text style={{color:'#fff',backgroundColor:'#666',paddingHorizontal:10,paddingVertical:15}}>{searchInCart[0].quantity}</Text>
                               <TouchableOpacity onPress={()=>addToCart(item,null,1,null,null)}>
                               <Text style={{color:'#fff',backgroundColor:'#c01c27',padding:15}}>+</Text>
                               </TouchableOpacity>
                               </View>
                               </>
                           ):(
                            <TouchableOpacity style={{backgroundColor:'#c01c27',padding:15,marginTop:25,width:'60%'}} onPress={()=>addToCart(item,null,1,null,null)}>
                           <Text style={{color:'#fff',textAlign:'center',textTransform:'uppercase',letterSpacing:6}}>Add to cart</Text>
                           </TouchableOpacity>)}
                            <Text style={{
                             marginTop:30,textTransform:'uppercase',letterSpacing:6,fontSize:18,fontWeight: 'bold'
                            }}>Description:</Text>   
                           <Text style={{
                             marginTop:10,
                             width:'80%'
                           }}>Dummy desc Dummy desc Dummy desc Dummy desc Dummy desc Dummy desc Dummy desc Dummy desc Dummy desc Dummy desc Dummy desc Dummy desc Dummy desc </Text>

        </View>
    )
}

const mapStateToProps=state=>{
  return{
    cartItems:state.cartData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Details);

const css=StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center'
  },
  productImg:{
      width:'80%',
      height: 200, 
      borderRadius: 5,
      marginTop:30,
      marginBottom:10
  },
  productTitle:{
    fontSize:20,
    marginVertical:10,
    textAlign:'left'
 

  }
})