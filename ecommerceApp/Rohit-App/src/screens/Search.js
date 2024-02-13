import React, { Component,useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput
} from "react-native";
import { styles } from '../../App'
import{ScrollView,FlatList} from 'react-native-gesture-handler'
import FlatText from '../components/FlatText';

import {connect} from 'react-redux';

import {addToCart,decreaseQuantity} from '../../redux/actions/cartActions'

const Search = ({
  cartItems,
  allGroceries,
  navigation,
  addToCart,
  decreaseQuantity

}) => {

const [searchTerm, setSearchTerm] = useState('')

function filterBySearchTerm(array, string) {
  return array.filter(o => {
    return Object.keys(o).some(k => {
      if(typeof o[k] === 'string') return o[k].toLowerCase().includes(string.toLowerCase());
    });
  });
}

const _renderAllGroceries=({item})=>{
     var searchInCart=cartItems.filter((val,i)=>{
                              if(val.id==item.id)return val
                            })

   return (
     <TouchableOpacity style={css.renderfeaureds} onPress={() => navigation.navigate('Details', {
         item:item
     })}>
         <View style={{flex:1,flexDirection:'row'}}>
             <Image style={css.imageWidth} source={{ uri: `https://source.unsplash.com/500x600/?${item.title}` }} />
             <View style={{position:'absolute',top:'20%',right:'0%',borderRadius:10}}>
                
                {
               
                searchInCart.length>=1?(
                    <View style={{flex:1,flexDirection:'row',marginRight:15}}>
                    <TouchableOpacity onPress={()=>decreaseQuantity(item,null)}>
                    <Text style={{color:'#fff',backgroundColor:'#c01c27',padding:15}} >-</Text>
                    </TouchableOpacity>
                    <Text style={{color:'#fff',backgroundColor:'#666',paddingHorizontal:10,paddingVertical:15}}>{searchInCart[0].quantity}</Text>
                    <TouchableOpacity onPress={()=>addToCart(item,null,1,null,null)}>
                    <Text style={{color:'#fff',backgroundColor:'#c01c27',padding:15}}>+</Text>
                    </TouchableOpacity>
                    </View>
                ):(
                 <TouchableOpacity style={{backgroundColor:'#c01c27',padding:15,marginRight:15}} onPress={()=>addToCart(item,null,1,null,null)}>
                <Text style={{color:'#fff',textAlign:'center'}}>Add</Text>
                </TouchableOpacity>)}
                 
                 </View>

             <View style={{justifyContent:'center',marginLeft:5}} >
                 <View style={(css.productTitle, {})}>
                     <Text style={{color:'#333',fontSize:16}}>{item.title}</Text>
                     <View style={{flexDirection:'row'}}>
                     <Text style={{color:'#333',fontSize:16}}>₹{item.price}</Text>
                     <Text style={{color:'#333',fontSize:16,marginLeft:4,
                     textDecorationLine:'line-through'}}>₹{item.mrp}</Text>
                     </View>
                     <View>
                         <View style={css.productContentFlex}>
                         </View>
                     </View>
                 </View>
             </View>
         </View>
     </TouchableOpacity>
   );
}

  return (
    <View style={(styles.container, {})}>
      <View>
          <View style={{ alignSelf: 'stretch'}}>
            <TextInput autoFocus='true' style={css.input} value={searchTerm} onChangeText={setSearchTerm}/>
            <Text style={{color:"#333", fontSize:20,marginVertical:10,textAlign:'center'}}>{filterBySearchTerm(allGroceries, searchTerm).length} Search Result(s)</Text>
          </View>
          <ScrollView>
            <FlatList
              data={filterBySearchTerm(allGroceries,searchTerm)} 
              renderItem={_renderAllGroceries} 
              keyExtractor={item=>item.id.toString()} 
            /> 
          </ScrollView>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    allGroceries: state.allGroceriesData.allGroceries
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
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);

const css = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderColor:'#333',
    marginTop:30,
    marginHorizontal:15,
    paddingLeft:10,
    borderRadius:5,
    borderColor:'#aaa'
    
  },
  renderfeaureds: {
      flex:1,
      flexDirection:'row',
      width:'100%',
      justifyContent:'space-evenly',
      marginTop: 10,
      paddingBottom: 10,
      marginBottom: 10
  },
  imageWidth: {
      width: 100, 
      height: 100,
      borderRadius:10
  }
});