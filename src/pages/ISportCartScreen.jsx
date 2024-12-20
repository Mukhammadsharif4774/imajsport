import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../components/AppContext';
import ISportCartItemComponent from '../components/ISportCartItemComponent';
import ISportComponent from '../components/ISportComponent';
import ISportHeader from '../components/ISportHeader';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import BackgroundMask from '../assets/drawer_background.png';

export default function () {
  const navigation = useNavigation();
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('cartList');
      setCart(storedCart ? JSON.parse(storedCart) : []);
    };

    fetchCart();
  }, [shouldRefresh]);

  useEffect(() => {
    const calculatedPrice = cart.reduce(
      (sum, item) => sum + item.price * item.count,
      0,
    );
    setTotalPrice(calculatedPrice);
  }, [cart]);

  const handleOrder = () => {
    const destinationScreen = cart.length
      ? 'ISportCartSuccessScreen'
      : 'ISportHomeScreen';
    navigation.navigate('DrawerNavigator', {screen: destinationScreen});

    if (cart.length) {
      AsyncStorage.setItem('cartList', JSON.stringify([]));
      toggleRefresh(!shouldRefresh);
    }
  };

  return (
    <ImageBackground source={BackgroundMask} style={styles.container}>
      <ISportHeader />

      {!cart.length && (
        <>
          <Text style={styles.text}>{'Корзина пуста...'.toUpperCase()}</Text>
        </>
      )}

      {cart.length > 0 && (
        <>
          <View style={{height: height * 0.7}}>
            <ScrollView style={styles.flex} contentContainerStyle={styles.main}>
              {cart.map((item, index) => (
                <ISportCartItemComponent item={item} key={index} />
              ))}
            </ScrollView>
          </View>
        </>
      )}

      {cart.length ? (
        <View style={styles.summaryContainer}>
          <Text style={styles.sumTitle}>Сума к оплате</Text>
          <Text style={styles.sum}>{totalPrice}$</Text>
        </View>
      ) : (
        ''
      )}

      <ISportComponent
        text={cart.length ? `ЗАКАЗАТЬ` : 'На главную'}
        style={styles.orderButton}
        onPress={handleOrder}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: COLORS.white,
  },
  flex: {
    height: 200,
  },
  main: {
    paddingBottom: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 40,
  },
  empty: {
    marginTop: 20,
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  emptyIcon: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  summaryContainer: {
    justifyContent: 'center',
    marginTop: 40,
    alignItems: 'center',
    flexDirection: 'row',
    width: width,
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  sumTitle: {
    fontSize: 25,
    fontFamily: FONTS.black,
    color: COLORS.black,
    textAlign: 'center',
  },
  sum: {
    fontSize: 30,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: 'center',
    marginLeft: 20,
  },
  orderButton: {
    position: 'absolute',
    bottom: 50,
  },
  text: {
    color: '#808080',
    textAlign: 'center',
    fontFamily: FONTS.regular,
    fontSize: 30,
    marginVertical: '25%',
    paddingVertical: 30,
  },
});
