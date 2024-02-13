import React, { useState,useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import{APIbaseURL, styles} from "../../App"
import { connect } from "react-redux";
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import {addToCart,decreaseQuantity,deleteFromCart,deleteAllFromCart} from '../../redux/actions/cartActions'

const Cart = ({
  navigation,
  cartItems,
  userData,
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  deleteAllFromCart
}) => {
  const [price, setPrice] = useState(0)
  const [serverOrder,setServerOrder] = useState({});

  const _renderCart=({item,index})=>{
   return (
     <TouchableOpacity onPress={() => navigation.navigate('Details',{ item })}>
                <View style={css.renderCartItem}>

                <View style={{flex:1,flexDirection:'row',alignItems:'center',marginLeft:15}}>
                    <Text style={{marginRight:5}}>{++index}.</Text>
                  <Image style={css.renderItemImg} source={{uri:`https://source.unsplash.com/190x150/?${item.title}`}}></Image>
                  <View style={{marginLeft:15,flex:1,justifyContent:'center'}}>
                    <Text>{item.title}</Text>
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
   
  const computeOrderFromCart=()=>{
    setPrice(0)

    cartItems.forEach((item)=>{
     setPrice((prev)=>prev+(item.price*item.quantity))

    })

  }
  
  useEffect(() => {
    setPrice(0)
    computeOrderFromCart()  
  }, [cartItems])

  useEffect(() => {

    if(serverOrder!=[] && userData!=undefined){
      axios.post(APIbaseURL+'/order/new',serverOrder)
      .then((response)=>{
        setTimeout(() => {
          deleteAllFromCart()
          navigation.navigate('Settings')
        }, 1000);
      }).catch(()=>{
      })
    }

  }, [serverOrder,userData])

  const placeOrder=()=>{
    let Order=cartItems.map((item)=>{
      return{quantity:item.quantity,
        productId:item._id,
        title:item.title,
        price:item.price}
    })
    setServerOrder({
      userId:userData._id,
      price:price,
      paymentStatus:'approved',
      paymentMode:'credit card',
      date:new Date(),
      orderProducts:Order,
      shipTo:{
          name:userData.name,
          addressLine1:userData.addressLine1,
          addressLine2:userData.addressLine2,
          city:'Chennai',
          state:'TN',
          zip:600010
        }
    })
    
  }

  
      return (
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={{fontSize:24,textTransform:'uppercase',letterSpacing:2,marginTop:50,marginBottom:cartItems[0]?0:50}}>Cart Screen</Text>
       {cartItems[0]?(
       <View style={{flexDirection:'row',alignItems:'center'}}>
       <TouchableOpacity onPress={()=>deleteAllFromCart()}>
          <Text style={{color:'#fff',backgroundColor:'#c01c27',padding:10,marginTop:10,marginBottom:20,
          fontSize:14,textTransform:'uppercase',letterSpacing:2,}} >Clear Cart</Text>
        </TouchableOpacity>
        <Text style={{padding:10,marginTop:10,marginBottom:20}}>{cartItems.length} items</Text>
        </View>
        ):(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:16}}>No items present in the cart. </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
        <Text style={{padding:15,marginTop:15,backgroundColor:'#c01c27',color:'#fff',width:'60%'}}>View Products</Text>
        </TouchableOpacity>
        </View>
        )}
        
           <View style={{flex:1,alignItems:'flex-start',alignSelf:'stretch'}}>
             <FlatList
                      data={cartItems}
                      renderItem={({item,index})=>_renderCart({item,index})}
                      keyExtractor={item=>item.id.toString()}
                  />
          <View style={{flex:1,width:'100%',alignItems:'center',justifyContent:'center'}}>
            <Text>
              Total Price:&#8377;{price}.00/-
            </Text>
          <TouchableOpacity onPress={()=>placeOrder()}>
        <Text style={{padding:15,marginTop:15,backgroundColor:'#c01c27',color:'#fff',width:'100%'}}>Place Order</Text>
        </TouchableOpacity>
          </View>    
          </View>
          
        </ScrollView>
    )
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    userData: state.userData.user
  };
};

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
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: addToast => {
      dispatch(deleteAllFromCart(addToast));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);

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