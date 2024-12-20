import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {AppContext} from '../components/AppContext';
import ISportHeader from '../components/ISportHeader';
import ISportMenuComponent from '../components/ISportMenuComponent';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {iSportProducts} from '../helpers/iSportProducts';

const categories = [
  {label: 'Ролы'},
  {label: 'Нигири'},
  {label: 'Салаты'},
  {label: 'Супы'},
];

const OnwSportCategoryButton = ({label, active, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.categoryButton}>
    <Text style={active ? styles.categoryActive : styles.category}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default function ISportHomeScreen() {
  const [category, setCategory] = useState(0);
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);

  const handleCategoryChange = index => {
    setCategory(index);
    toggleRefresh(!shouldRefresh);
  };

  return (
    <View style={styles.container}>
      <ISportHeader />

      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <OnwSportCategoryButton
            key={index}
            label={item.label}
            active={category === index}
            onPress={() => handleCategoryChange(index)}
            image={item?.image}
          />
        ))}
      </View>

      <ScrollView style={styles.flex} contentContainerStyle={styles.main}>
        {iSportProducts[category].map((product, index) => (
          <ISportMenuComponent key={index} item={product} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    flex: 1,
    backgroundColor: COLORS.white,
  },
  categoryContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width,
    marginVertical: 15,
  },
  categoryButton: {
    width: '20%',
    marginTop: 5,
  },
  category: {
    fontFamily: FONTS.regular,
    color: COLORS.white,
    fontSize: 14,
    textAlign: 'center',
    verticalAlign: 'middle',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.black,
    backgroundColor: COLORS.blue,
    height: 40,
  },
  categoryActive: {
    fontFamily: FONTS.regular,
    color: COLORS.textColor,
    fontSize: 14,
    textAlign: 'center',
    verticalAlign: 'middle',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.main,
    height: 40,
    backgroundColor: COLORS.main,
  },
  main: {
    paddingBottom: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  image: {
    width: '100%',
    height: 80,
    objectFit: 'contain',
  },
});
