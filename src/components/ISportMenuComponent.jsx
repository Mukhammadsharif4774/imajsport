import React, {useContext, useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './AppContext';
import {COLORS, FONTS} from '../helpers/colors';
import PlusIcon from '../assets/plus_icon.png';
import MinusIcon from '../assets/minus_icon.png';

export default function ({item}) {
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const [added, setAdded] = useState(false);

  const updateCart = useCallback(async () => {
    const cartList = await AsyncStorage.getItem('cartList');
    const cartArray = cartList ? JSON.parse(cartList) : [];
    const isProductInCart = cartArray.some(cart => cart.name === item.name);
    setAdded(isProductInCart);
  }, [item.name]);

  const handleCartUpdate = async action => {
    const cartList = await AsyncStorage.getItem('cartList');
    let cartArray = cartList ? JSON.parse(cartList) : [];

    if (action === 'add') {
      if (!cartArray.some(cart => cart.name === item.name)) {
        cartArray.push({...item, count: 1});
      }
    } else if (action === 'remove') {
      cartArray = cartArray.filter(cart => cart.name !== item.name);
    }

    await AsyncStorage.setItem('cartList', JSON.stringify(cartArray));
    toggleRefresh(prev => !prev);
  };

  const toggleCart = () => {
    added ? handleCartUpdate('remove') : handleCartUpdate('add');
  };

  useEffect(() => {
    updateCart();
  }, [updateCart, shouldRefresh]);

  return (
    <View style={styles.main}>
      <Image source={item?.image} style={styles.image} />

      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.title}>{item?.name}</Text>

        <Text style={styles.description}>{item?.description}</Text>

        <View style={styles.row}>
          <Text style={styles.price}>{item?.price} $</Text>

          <TouchableOpacity onPress={toggleCart}>
            <Image
              style={styles.button}
              source={added ? MinusIcon : PlusIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '47%',
    alignSelf: 'center',
    height: 320,
    marginTop: 35,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'space-between',
    elevation: 5,
    padding: 8,
    borderRadius: 8,
  },
  image: {
    width: '90%',
    height: 150,
    borderRadius: 50,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.white,
    width: '100%',
    marginBottom: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.white,
    width: '100%',
    marginBottom: 5,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 20,
    fontFamily: FONTS.regular,
    textAlign: 'center',
    verticalAlign: 'middle',
    color: COLORS.main,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  button: {
    width: 25,
    height: 25,
    objectFit: 'contain',
  },
});
