import React, {Fragment, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';

const {width, height} = Dimensions.get('window');
const Home = props => {
  const [data, setData] = useState('');

  const goProfile = () => {
    props.navigation.navigate('Profile');
  };

  const getUser = async () => {
    const user = firebase.auth().currentUser;
    await firebase
      .database()
      .ref(`users/${user.uid}`)
      .once('value')
      .then(result => {
        let data = result.val();

        if (data !== null) {
          setData(data);
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const name = data.username;

  console.log(data);

  return (
    <Fragment>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.boxImg}>
              <Image
                style={styles.imgProfile}
                source={{
                  uri: data.photo,
                }}
              />
            </View>
            <View style={styles.profileBox}>
              <TouchableOpacity onPress={goProfile}>
                {data ? (
                  <Text style={styles.name}>
                    {name.length > 8 ? name.substr(0, 8) + '...' : name}
                  </Text>
                ) : (
                  <ActivityIndicator color="white" />
                )}
                <Text style={styles.match}>200 Match</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.statusBox}>
              {data.premium ? (
                <View style={styles.premiumBox}>
                  <Text style={styles.premium}>Premium</Text>
                </View>
              ) : null}
            </View>
          </View>
          <Text style={styles.eventText}>Cooming Soon Event</Text>
          <View>
            <ScrollView horizontal={true}>
              <View style={styles.eventBox}>
                <Image
                  style={styles.eventImg}
                  source={{
                    uri:
                      'https://images5.alphacoders.com/700/thumb-1920-700733.png',
                  }}
                />
              </View>
              <View style={styles.eventBox}>
                <Image
                  style={styles.eventImg}
                  source={{
                    uri:
                      'https://images5.alphacoders.com/700/thumb-1920-700733.png',
                  }}
                />
              </View>
            </ScrollView>
          </View>
          <Text style={styles.textMabar}>Mabar Now!</Text>

          <View
            style={{
              alignItems: 'center',
              flex: 1,
            }}>
            <View style={styles.game}>
              <TouchableOpacity>
                <View style={styles.gameImgBox}>
                  <Image
                    style={styles.gameImg}
                    source={{
                      uri:
                        'https://www.filemagz.com/wp-content/uploads/2017/12/FILEmagz_MobileLegend-900x445.jpg',
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.gameImgBox}>
                  <Image
                    style={styles.gameImg}
                    source={{
                      uri:
                        'https://upload.wikimedia.org/wikipedia/en/0/07/CODM_logo.png',
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.gameImgBox}>
                  <Image
                    style={styles.gameImg}
                    source={{
                      uri:
                        'https://aov.garena.co.id/mobile/static/AOV_Header_Logo.27fcd7cc.png',
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.gameImgBox}>
                  <Image
                    style={styles.gameImg}
                    source={{
                      uri:
                        'https://i.pinimg.com/originals/f7/43/c4/f743c45a69f00a4d6254ce42f3803dd1.jpg',
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.gameImgBox}>
                  <Image
                    style={styles.gameImg}
                    source={{
                      uri:
                        'https://i.pinimg.com/originals/2a/c7/f6/2ac7f632db01559453202539d365eb91.jpg',
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.gameImgBox}>
                  <Image
                    style={styles.gameImg}
                    source={{
                      uri:
                        'https://thepopinsider.com/wp-content/uploads/2019/06/TETRIS_LOGO_2019.jpg',
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  header: {
    height: height / 6,
    flexDirection: 'row',
    backgroundColor: '#232323',
    alignItems: 'center',
    paddingHorizontal: width / 20,
  },
  boxImg: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    borderRadius: 160,
    marginRight: 20,
    overflow: 'hidden',
  },
  imgProfile: {
    width: '100%',
    flex: 1,

    resizeMode: 'cover',
  },
  profileBox: {
    width: width / 3.5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  name: {
    color: 'white',
    fontSize: 18,
  },
  match: {
    color: 'gray',
    fontSize: 13,
  },
  statusBox: {
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  premiumBox: {
    borderColor: '#DDC535',
    borderWidth: 1,
    borderRadius: 6,
  },
  premium: {
    fontSize: 15,
    color: '#DDC535',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  eventBox: {
    marginVertical: 5,
    marginHorizontal: 10,
    height: height / 4,
    width: width / 1.2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  eventText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
    paddingLeft: 13,
  },
  eventImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  textMabar: {
    fontSize: 18,
    color: 'white',
    padding: 12,
    marginVertical: 8,
  },
  game: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 360,
    marginRight: width / -20,
    // marginHorizontal: 13,
  },
  gameImgBox: {
    height: 100,
    width: 100,
    borderRadius: 5,
    marginRight: 18,
    marginBottom: 18,
    overflow: 'hidden',
  },
  gameImg: {
    height: '100%',
  },
});

export default Home;
