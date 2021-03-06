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

import {connect} from 'react-redux';
import {getGameList} from '../redux/action/gameList';
import {getEventList} from '../redux/action/eventList';
import {getUser} from '../redux/action/user';

const {width, height} = Dimensions.get('window');
const Home = props => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  const user = firebase.auth().currentUser;

  const goProfile = () => {
    props.navigation.navigate('Profile');
  };
  const goEvent = () => {
    props.navigation.navigate('Events');
  };

  const getData = async () => {
    const user = firebase.auth().currentUser;

    await firebase
      .database()
      .ref(`users/${user.uid}`)

      .on('value', async result => {
        let data = result.val();

        if (data !== null) {
          setData(data);
        }
      });
  };
  const getbackend = async () => {
    await props.dispatch(getUser(user.uid));

    await props.dispatch(getGameList());
    await props.dispatch(getEventList());
    setLoading(false);
  };

  const goMaps = (match, id) => {
    firebase
      .database()
      .ref(`users/${data.id}`)
      .update({matching: id, game: match})
      .then(() => {
        props.navigation.navigate('Maps', {
          match: id,
          matchName: match,
        });
      });
  };

  const setMatching = () => {
    props.navigation.addListener('didFocus', () => {
      firebase
        .database()
        .ref('users/' + user.uid)
        .update({matching: null, game: null});
    });
  };

  useEffect(() => {
    getbackend();
    getData();
    setMatching();
  }, []);

  const name = data.username;
  
  const eventList = [
    {
      _id: '5da6920c897e944088608e10',
      name: 'Turnament Mobile Legend',
      image: 'https://raw.githubusercontent.com/rozy97/pic/master/eventOne.jpg',
    },
    {
      _id: '5da69251454ecb4088a6b3a1',
      name: 'Turnament PUBG',
      image: 'https://raw.githubusercontent.com/rozy97/pic/master/eventTwo.jpg',
    },
  ];
  const gameList = [
    {
      _id: '5da3ef0e6881903aa8ea1b64',
      name: 'Mobile Legend',
      code: 'ML',
      image: 'https://raw.githubusercontent.com/rozy97/pic/master/ML.jpg',
    },
    {
      _id: '5da3ef575efc4d3aa80c6878',
      name: 'Vainglory',
      code: 'VG',
      image: 'https://raw.githubusercontent.com/rozy97/pic/master/VG.jpg',
    },
    {
      _id: '5da3ef635efc4d3aa80c6879',
      name: 'data 2 edited again',
      code: 'PUBG',
      image: 'https://raw.githubusercontent.com/rozy97/pic/master/PUBG.jpg',
    },
    {
      _id: '5da3ef675efc4d3aa80c687a',
      name: 'Arena of Valor',
      code: 'AOV',
      image: 'https://raw.githubusercontent.com/rozy97/pic/master/AOV.jpg',
    },
    {
      _id: '5da3ef9a5efc4d3aa80c687b',
      name: 'Tetris',
      code: 'TE',
      image: 'https://raw.githubusercontent.com/rozy97/pic/master/TE.jpg',
    },
    {
      _id: '5da436204a726c356080e94d',
      name: 'Call of Duty',
      code: 'COD',
      image: 'https://raw.githubusercontent.com/rozy97/pic/master/COD.jpg',
    },
    {
      _id: '5da9428223d8de2b686c049b',
      name: 'super mario',
      image: 'http://picsum.photos/100/100',
    },
  ];

  return (
    <Fragment>
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity onPress={goProfile} activeOpacity={0.8}>
            <View style={styles.header}>
              {data ? (
                <>
                  <View style={styles.boxImg}>
                    <Image
                      style={styles.imgProfile}
                      source={{
                        uri: data.photo,
                      }}
                    />
                  </View>
                  <View style={styles.profileBox}>
                    <Text style={styles.name}>
                      {name.length > 8 ? name.substr(0, 8) + '...' : name}
                    </Text>
                    <Text style={styles.match}>200 Match</Text>
                  </View>
                  <View style={styles.statusBox}>
                    {data.premium ? (
                      <View style={styles.premiumBox}>
                        <Text style={styles.premium}>PREMIUM</Text>
                      </View>
                    ) : (
                      <View style={styles.premiumBoxOf}>
                        <Text style={styles.premiumOf}>BASIC</Text>
                      </View>
                    )}
                  </View>
                </>
              ) : (
                <View style={styles.loadingBox}>
                  <ActivityIndicator
                    color="#006aeb"
                    size="large"
                    style={styles.loading}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
          <>
            <Text style={styles.eventText}>Coming Soon Event</Text>
            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {eventList.map((data, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.8}
                      onPress={goEvent}>
                      <View style={styles.eventBox}>
                        <Image
                          style={styles.eventImg}
                          source={{uri: data.image}}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <Text style={styles.textMabar}>
              Mabar Now!
              <Text style={styles.subTit}>&nbsp;&nbsp;Find Your Crew</Text>
            </Text>

            <View style={styles.asing}>
              <View style={styles.game}>
                {gameList.map((data, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.8}
                      onPress={() => goMaps(data.name, data._id)}>
                      <View style={styles.gameImgBox}>
                        <Image
                          style={styles.gameImg}
                          source={{uri: data.image}}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </>
        </ScrollView>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  subTit: {
    fontSize: 14,
    color: 'grey',
  },
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  loadingBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBox2: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 1.34,
  },
  loading2: {
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: '700',
    textShadowColor: 'black',
    textShadowOffset: {width: 5, height: 3},
    textShadowRadius: 5,
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
  premiumBoxOf: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
  },
  premiumOf: {
    fontSize: 15,
    color: 'gray',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  eventBox: {
    marginVertical: 5,
    marginHorizontal: 8,
    height: height / 4,
    width: width / 1.2,
    borderRadius: 5,
    overflow: 'hidden',
  },
  eventText: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 13,
    fontWeight: '700',
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
    fontWeight: '700',
  },
  game: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 360,
    marginRight: width / -20,
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
    width: '100%',
    flex: 1,

    resizeMode: 'cover',
  },
  asing: {
    alignItems: 'center',
    flex: 1,
  },
});

const mapStateToProps = state => {
  return {
    gameList: state.gameList.gameList,
    eventList: state.eventList.eventList,
    userData: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(Home);
