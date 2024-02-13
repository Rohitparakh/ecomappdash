import React, { Component,useState,useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  RefreshControl,
  ImageBackground
} from "react-native";

import { connect } from "react-redux";

import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import Header from './section/Header'
import FlatText from '../components/FlatText';

import{APIbaseURL,styles} from "../../App"

import {addToCart,decreaseQuantity} from '../../redux/actions/cartActions'
import axios from 'axios';

const Home = ({
    navigation,
    addToCart,
    decreaseQuantity,
    cartItems,
    route,
    allGroceries,
    offerGroceries,
    categories,
    userData
    }) => {

    

        // if (route)navigation.navigate(route)
    var showCategory=false;

    const [refreshing, setRefreshing] = useState(false)
    const [category, setCategory] = useState(1)
    const onRefresh = () => {
        setRefreshing(true)
    };
 
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        forceUpdate()
        setRefreshing(false)
    }, [refreshing])

useEffect(()=>{},[])
    const _renderItem=({item})=>{
        var discount=(item.mrp-item.price)/item.mrp*100
        return(
        <TouchableOpacity 
        style={css.renderItemStyle}
         onPress={() => navigation.navigate('Details',{ item })}>
                
                <View style={css.renderItemContent}>
                    <Image
                     style={css.renderItemImg}
                      source={{ uri:`https://source.unsplash.com/190x150/?${item.title}` }} />
                    
                    <View style={css.renderItemBadge}>
                        <Text style={{color:"#fff", fontSize:12}} >{item.title}</Text>
                    </View>
                     <View style={css.renderItemBadgeLeft}>
                        <Text style={{color:"#fff", fontSize:12}} >{discount.toFixed(0)}% OFF</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const _renderCategory=({item})=> {
        return (
            <TouchableOpacity onPress={() => setCategory(item.id)} style={css.renderCategory}>
                <View style={css.renderBg}>
                    <ImageBackground style={css.categoryBgImg} imageStyle={css.categoryImageStyle} source={{ uri: `https://source.unsplash.com/190x150/?${item.title}` }}>
                        <View style={css.overlay} />
                        <View style={css.categoryNameStyle}>
                            <Text style={{color:'#fff',fontSize:14}}>{item.title}</Text>
                            {/* <FlatText color="#fff" font="q_semibold" text={item.name} size={14} /> */}
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        )
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
                      <View style={{flex:1,flexDirection:'row'}}>
                      <TouchableOpacity onPress={()=>decreaseQuantity(item,null)}>
                      <Text style={{color:'#fff',backgroundColor:'#c01c27',padding:15}} >-</Text>
                      </TouchableOpacity>
                      <Text style={{color:'#fff',backgroundColor:'#666',paddingHorizontal:10,paddingVertical:15}}>{searchInCart[0].quantity}</Text>
                      <TouchableOpacity onPress={()=>addToCart(item,null,1,null,null)}>
                      <Text style={{color:'#fff',backgroundColor:'#c01c27',padding:15}}>+</Text>
                      </TouchableOpacity>
                      </View>
                  ):(
                   <TouchableOpacity style={{backgroundColor:'#c01c27',padding:15}} onPress={()=>addToCart(item,null,1,null,null)}>
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
      <View style={css.flex} >
      <Header reload="no" navigation={navigation} />
      <ScrollView 
      refreshControl={
          <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              title="Pull to refresh"
          />}
          >
          <View style={css.hconatiner}>
                <View>
                  {/* <FlatText text="Available Offer Right Now" size={20} color="#333" font="q_regular" /> */}
                  <Text style={{fontSize:20,color:'#333'}}>Available Offers Right Now</Text>
                  <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      data={offerGroceries}
                      renderItem={_renderItem}
                      keyExtractor={item=>item.id.toString()}
                  />
              </View>
               {showCategory?(<View style={css.marginBottomView}>
                  {/* <FlatText text="Browse By Category" color="#333" size={20} font="q_regular" /> */}
                  <Text style={{color:"#333", fontSize:20}}>Browse By Category</Text>
                  <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      data={categories}
                      renderItem={_renderCategory}
                      keyExtractor={item=>item.id.toString()}
                  />
              </View>
              ):null}
              <View>
                  <View style={styles.row}>
                  <Text style={{color:"#333", fontSize:20}}>All Groceries</Text>
                      {/* <FlatText text="All Restaurants" size={20} font="q_regular" color="#333" /> */}
                      {/* <TouchableOpacity onPress={() => {this.setState({ selectCatg: 0, isLoading: false })} style={styles.paddingLeft}><FlatText text=" Reset" color="#333" size={20} font="q_regular" /></TouchableOpacity> */}
                  </View>
                  <FlatList
                      data={allGroceries}
                      renderItem={_renderAllGroceries}
                      keyExtractor={item=>item.id.toString()}
                    //   onEndReached={this.LoadMore}
                    //   onEndReachedThreshold={100}
                  />
              </View>
          </View>
      </ScrollView>
  </View>
    )
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

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    allGroceries: state.allGroceriesData.allGroceries,
    offerGroceries: state.offerGroceriesData.offerGroceries,
    categories: state.categoriesData.categories,
    userData: state.userData.user
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);
// export {_renderAllGroceries};
const css = StyleSheet.create({
  flex: {
      flex: 1
  },
  mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  hconatiner: {
      paddingHorizontal: 15,
      backgroundColor: '#fff',
      flex: 1,
      paddingVertical: 5,
  },
  dFlex: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 10
  },
  renderfeaured: {
      marginRight: 15,
      marginTop: 10,
      paddingBottom: 10
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
  overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
      borderRadius: 100
  },
  marginBottomView: {
      marginTop: 10,
      marginBottom: 10
  },
  row: {
      flexDirection: "row",
      justifyContent: 'space-between'
  },
  paddingLeft: {
      marginBottom: 10
  },
  imageWidth: {
      width: 100, 
      height: 100,
      borderRadius:10
  },
  badge: {
      position: 'absolute', 
      right: 0, 
      top: 0, 
      backgroundColor: '#fff', 
      paddingHorizontal: 15, 
      paddingVertical: 5
  },
  productTitle: {
      justifyContent: 'center',
      alignItems:'center', 
      backgroundColor:'blue',
      paddingTop: 34,
      paddingLeft:15
  },
  productContentFlex: {
      flexDirection: 'row', 
      alignItems: 'center'
  },
  paddingHorizontal5: {
      paddingHorizontal: 5
  },
  renderCategory: {
      marginRight: 15, 
      marginBottom: 15, 
      marginTop: 15
  },
  renderBg: {
      backgroundColor: '#fff', 
      borderRadius: 10
  },
  categoryBgImg: {
      width: 100, 
      height: 100,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:50
  },
  categoryImageStyle: {
      borderRadius: 15
  },
  categoryNameStyle: {
      backgroundColor: '#C01C27', 
      borderRadius: 5, 
      paddingHorizontal: 10, 
      paddingVertical: 6,
  },
  renderItemStyle: {
      marginRight: 15, 
      marginBottom: 15, 
      marginTop: 15
  },
  renderItemContent: {
      backgroundColor: '#fff', 
      borderRadius: 10
  },
  renderItemImg: {
      width: 190, 
      height: 150, 
      borderRadius: 5
  },
  renderItemBadge: {
      position: 'absolute', 
      bottom: 15, 
      color: '#fff', 
      left: 15, 
      backgroundColor: '#C01C27', 
      borderRadius: 5, 
      paddingHorizontal: 10, 
      paddingVertical: 6
  },
  renderItemBadgeLeft: {
      position: 'absolute', 
      top: 15, 
      color: '#fff', 
      left: 15, 
      backgroundColor: '#C01C27', 
      borderRadius: 5, 
      paddingHorizontal: 10, 
      paddingVertical: 6
  },
  renderItemImgCart:{
      position: 'absolute', 
      bottom: 15, 
      color: '#fff', 
      left: 15, 
      backgroundColor: '#C01C27', 
      borderRadius: 5, 
      paddingHorizontal: 10, 
      paddingVertical: 6,
      marginHorizontal:34
  },
  renderItemImgCartUpdate:{
        position: 'absolute', 
      bottom: 9, 
      color: '#fff', 
      right: 0, 
      borderRadius: 5, 
      paddingHorizontal: 10, 
      paddingVertical: 6,
      marginHorizontal:34,
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      marginVertical:5,
      backgroundColor:'#a1000b'
  }
});