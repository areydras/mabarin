import React, {useState, Fragment} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import firebase from 'firebase';
import {postUser} from '../redux/action/user';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

const Register = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rePassword, setRePassword] = useState('');

  const onRegister = async () => {
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;
    const validPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,25}$/gim;
    let checkEmail = email.match(validEmail);
    let checkPassword = password.match(validPass);

    setLoading(true);
    if (checkEmail === null) {
      setLoading(false);
      ToastAndroid.show(
        'Email Invalid',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (checkPassword === null) {
      setLoading(false);
      ToastAndroid.show(
        'Password must have alphabet and number, min length 8',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (username.length < 3) {
      setLoading(false);
      ToastAndroid.show(
        'Please input Name more than 3',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (password !== rePassword) {
      setLoading(false);
      ToastAndroid.show(
        'Password and RePassword does not match',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async ({user}) => {
          setLoading(false);
          firebase.auth().currentUser.updateProfile({
            displayName: username,
            photoURL:
              'https://www.shareicon.net/data/2016/09/01/822711_user_512x512.png',
          });
          firebase
            .database()
            .ref(`users/${user.uid}`)
            .set({
              id: user.uid,
              username: username,
              email: email,
              photo:
                'https://www.shareicon.net/data/2016/09/01/822711_user_512x512.png',
              premium: false,
              status: 'online',
              Location: {
                latitude: 0,
                longitude: 0,
              },
            });
          props
            .dispatch(
              postUser({uid: user.uid, email: user.email, username: username}),
            )
            .then(() => {
              props.navigation.navigate('Home');
              ToastAndroid.show(
                "Let's Play",
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
              );
            });
        });
    }
  };

  const goRegister = () => {
    props.navigation.navigate('Login');
  };
  return (
    <Fragment>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.logo}
            source={require('../assets/logo/logo.png')}
          />
        </View>

        <View style={styles.boxWelcom}>
          <Text style={styles.welcom}>Create an account</Text>
        </View>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#9c9c9c"
          style={styles.box}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#9c9c9c"
          style={styles.box}
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#9c9c9c"
          style={styles.box}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          placeholder="Re-type Password"
          placeholderTextColor="#9c9c9c"
          secureTextEntry
          style={styles.box}
          onChangeText={text => setRePassword(text)}
        />
        <TouchableOpacity onPress={onRegister}>
          <View style={styles.button}>
            {loading ? (
              <ActivityIndicator color="black" />
            ) : (
              <Text style={styles.textBtn}>Register</Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.boxReg}>
          <Text style={styles.texReg1}>Already have account?</Text>
          <TouchableOpacity onPress={goRegister}>
            <Text style={styles.texReg2}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#232323',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: width / 2,
    height: height / 23,
    resizeMode: 'stretch',
    marginBottom: 40,
  },
  boxWelcom: {
    marginBottom: height / 10,
  },
  welcom: {
    color: 'white',
    fontSize: 19,
  },
  box: {
    borderBottomColor: '#9c9c9c',
    borderBottomWidth: 1,
    width: width / 1.3,
    color: 'white',
  },
  button: {
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: height / 10,
    backgroundColor: '#004DAA',
    width: 150,
    paddingVertical: 10,
  },
  textBtn: {
    color: 'white',
    textAlign: 'center',
  },
  boxReg: {
    marginTop: height / 12,
    flexDirection: 'row',
  },
  texReg1: {
    color: 'white',
  },
  texReg2: {
    color: '#006aeb',
    fontWeight: '700',
  },
});

export default connect()(Register);
