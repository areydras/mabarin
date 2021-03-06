import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {Icon} from 'native-base';
import firebase from 'firebase';

const {width} = Dimensions.get('window');

const BuyPremium = props => {
  const getPremium = async () => {
    const user = firebase.auth().currentUser;
    await firebase
      .database()
      .ref(`users/${user.uid}`)
      .update({premium: true});
    props.navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.buyPremiumContainer}>
      <View style={styles.header}>
        {/* <Image
          source={require('../assets/icons/left-arrow.png')}
          style={styles.icon}
        /> */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => props.navigation.goBack()}>
          <Icon type="AntDesign" name="left" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buy Premium</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={require('../assets/image/events.jpg')}
            style={styles.image}
          />
          <View style={styles.textPremiumContainer}>
            <Text style={styles.textPremium}>PREMIUM</Text>
          </View>
          <View style={styles.textDescriptionContainer}>
            <Text style={styles.textDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Feugiat sed lectus vestibulum mattis. Vitae purus faucibus ornare
              suspendisse sed nisi lacus sed. Semper quis lectus nulla at
              volutpat diam ut venenatis tellus. Non sodales neque sodales ut.
              Volutpat ac tincidunt vitae semper quis lectus nulla. Scelerisque
              felis imperdiet proin fermentum leo vel orci. Amet mattis
              vulputate enim nulla aliquet porttitor lacus. Parturient montes
              nascetur ridiculus mus mauris. Et ligula ullamcorper malesuada
              proin libero.
            </Text>
          </View>
          <Text style={styles.price}>$50</Text>
          <TouchableOpacity onPress={getPremium}>
            <View style={styles.buttonBuy}>
              <Text style={styles.buttonText}>Buy Premium</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buyPremiumContainer: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  header: {
    height: 60,
    backgroundColor: '#373737',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    fontSize: 20,
    color: 'white',
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flex: 1,
    paddingBottom: 20,
    marginHorizontal: width / 15,
  },
  image: {
    height: 150,
    width: '100%',
    marginTop: width / 20,
  },
  textPremiumContainer: {
    marginTop: width / 20,
    borderColor: '#DDC535',
    borderWidth: 1,
    width: 110,
    borderRadius: 5,
    padding: 5,
  },
  textPremium: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#DDC535',
    letterSpacing: 2,
  },
  textDescriptionContainer: {
    marginTop: 10,
  },
  textDescription: {
    color: 'white',
  },
  price: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
    marginVertical: 10,
  },
  buttonBuy: {
    backgroundColor: 'green',
    width: 120,
    height: 35,
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default BuyPremium;
