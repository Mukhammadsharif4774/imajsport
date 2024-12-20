import React from 'react';
import {Text, StyleSheet, ImageBackground, Image} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import ISportHeader from '../components/ISportHeader';
import ISportComponent from '../components/ISportComponent';
import Success from '../assets/drawer_background.png';
import SuccessIcon from '../assets/success_icon.png';

export default function () {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'ISportHomeScreen'});
  };

  return (
    <ImageBackground source={Success} style={styles.container}>
      <ISportHeader />

      <Text style={styles.description}>
        Столик забронирован! {'\n'} Спасибо
      </Text>

      <Image
        source={SuccessIcon}
        style={{
          width: width * 0.5,
          height: width * 0.5,
          alignSelf: 'center',
          objectFit: 'contain',
          marginTop: '25%',
        }}
      />

      <ISportComponent
        text="На главную"
        style={styles.button}
        onPress={handleNavigateHome}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: COLORS.white,
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
  description: {
    paddingVertical: 15,
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: 30,
    paddingHorizontal: 50,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 150,
  },
});
