import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './AppContext';
import {COLORS, FONTS, width} from '../helpers/colors';
import {iSportAllProducts} from '../helpers/iSportProducts';
import DeleteIcon from '../assets/delete_icon.png';

const ISportCartItemComponent = ({item}) => {
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const [carts, setCarts] = useState([]);

  const updateCart = async updatedCarts => {
    await AsyncStorage.setItem('cartList', JSON.stringify(updatedCarts));
    setCarts(updatedCarts);
    toggleRefresh(!shouldRefresh);
  };
  const increment = () => {
    const updatedCarts = carts.map(product =>
      product.name === item.name
        ? {...product, count: product.count + 1}
        : product,
    );
    updateCart(updatedCarts);
  };

  const decrement = () => {
    const updatedCarts = carts
      .map(product => {
        if (product.name === item.name) {
          const newCount = Math.max(product.count - 1, 0);
          return {...product, count: newCount};
        }
        return product;
      })
      .filter(product => product.count > 0); // Remove item if count is zero
    updateCart(updatedCarts);
  };

  const deleteItem = () => {
    const updatedCarts = carts.filter(product => product.name !== item.name);
    updateCart(updatedCarts);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartList = await AsyncStorage.getItem('cartList');
      setCarts(cartList ? JSON.parse(cartList) : []);
    };
    fetchCartItems();
  }, [shouldRefresh]);

  const productImage = iSportAllProducts.find(p => p.name === item.name)?.image;

  return (
    <View style={styles.container}>
      <Image source={productImage} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.row}>
          <View style={styles.countContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                carts.find(product => product.name === item.name)?.count > 1
                  ? decrement()
                  : deleteItem()
              }>
              <Text style={styles.plusMinus}>-</Text>
            </TouchableOpacity>

            <Text style={styles.count}>
              {carts.find(product => product.name === item.name)?.count || 0}
            </Text>

            <TouchableOpacity style={styles.actionButton} onPress={increment}>
              <Text style={styles.plusMinus}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.currencyText}>{`${item.price} $`}</Text>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteItem()}>
            <Image source={DeleteIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: COLORS.cardBackground,
    width: width * 0.95,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 140,
    elevation: 5,
    padding: 8,
    borderRadius: 10,
  },
  image: {
    width: '45%',
    borderRadius: 12,
    height: 120,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: COLORS.main,
    width: '90%',
  },
  description: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.white,
    width: '90%',
  },
  currencyText: {
    fontSize: 20,
    fontFamily: FONTS.regular,
    textAlign: 'center',
    verticalAlign: 'middle',
    marginLeft: 15,
    color: COLORS.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 5,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.2,
    borderRadius: 8,
    borderColor: COLORS.main,
    borderWidth: 1,
    backgroundColor: COLORS.main,
  },
  count: {
    fontSize: 18,
    fontFamily: FONTS.regular,
    marginHorizontal: 10,
    color: COLORS.textColor,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
  },
  plusMinus: {
    textAlign: 'center',
    verticalAlign: 'middle',
    color: COLORS.textColor,
    fontSize: 18,
    fontFamily: FONTS.regular,
  },
  deleteButton: {
    marginLeft: 10,
    position: 'absolute',
    right: 10,
    top: -2,
  },
  icon: {
    width: 30,
    height: 30,
    objectFit: 'contain',
  },
});

export default ISportCartItemComponent;
