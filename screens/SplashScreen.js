import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import firebase from 'firebase';

const SplashScreen = props => {
  const checkUser = async () => {
    firebase.auth().onAuthStateChanged(user => {
      props.navigation.navigate(user ? 'Home' : 'Login');
    });
  };

  useEffect(() => {
    checkLocation();
  }, []);

  checkLocation = async () => {
    let hasLocationPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (!hasLocationPermission) {
      hasLocationPermission = await this.requestLocationPermission();
    }

    if (hasLocationPermission) {
      setTimeout(() => {
        checkUser();
      }, 1000);
    }
  };

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: `ChatWae needs permission to get your location.`,
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/image/splash.jpg')}
        style={styles.splashImage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashImage: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
