import React from 'react';
import {View, StyleSheet, Text, TextInput, ImageBackground} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import ISportHeader from '../components/ISportHeader';
import ISportComponent from '../components/ISportComponent';
import BackgroundImage from '../assets/drawer_background.png';

export default function () {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'ISportHomeScreen'});
  };

  const renderTextInput = placeholder => (
    <View style={styles.textInputContainer}>
      <TextInput
        placeholder={placeholder}
        style={styles.textInput}
        placeholderTextColor={COLORS.white}
        editable={false}
      />
    </View>
  );

  return (
    <ImageBackground source={BackgroundImage} style={styles.container}>
      <ISportHeader />

      <Text style={styles.title}>Контакты</Text>

      <View style={styles.main}>
        {renderTextInput('Номер')}
        {renderTextInput('Адрес')}
        {renderTextInput('Данные')}
        {renderTextInput('Индекс')}
      </View>

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
  flex: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: FONTS.regular,
    color: COLORS.white,
    margin: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: FONTS.regular,
    color: COLORS.placeholder,
    width: '100%',
    paddingLeft: 30,
    marginVertical: 10,
  },
  main: {
    paddingBottom: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    width: width * 0.95,
    alignSelf: 'center',
    borderRadius: 25,
    height: height * 0.55,
  },
  textInputContainer: {
    width: '100%',
  },
  textInput: {
    height: 50,
    width: '100%',
    fontSize: 14,
    fontFamily: FONTS.regular,
    textAlign: 'left',
    color: COLORS.white,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.textColor,
    marginTop: 10,
    borderRadius: 8,
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
});
