import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  Image,
  TextInput
} from 'react-native';

import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('screen');
const { BASE_URL } = 'http://onlyargon.online:1001/api/';

export default class App extends React.Component {
  
  state = {
    latitude: null,
    longitude: null,
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  sendHeavyTrafficUpdate() {
    return fetch('traffic/add-new-condition', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        type: 'traffic',
        lat: '6.878272',
        long: '79.876409'
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.errorMessage === 'Success') {
        } else {
          alert(responseJson.errorMessage);
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  sendPolicemanUpdate() {
    return fetch('traffic/add-new-condition', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        type: 'policeControl',
        lat: '6.878272',
        long: '79.876409'
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.errorMessage === 'Success') {
        } else {
          alert(responseJson.errorMessage);
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  sendVehicleAccidentUpdate() {
    return fetch('traffic/add-new-condition', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        type: 'vehicleAccident',
        lat: '6.878272',
        long: '79.876409'
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.errorMessage === 'Success') {
        } else {
          alert(responseJson.errorMessage);
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  sendRoadClosedUpdate() {
    return fetch('traffic/add-new-condition', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        type: 'roadClosed',
        lat: '6.878272',
        long: '79.876409'
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.errorMessage === 'Success') {
        } else {
          alert(responseJson.errorMessage);
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  loadTheAllTrafficInfo() {
    return fetch('traffic/get-traffic-conditions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({})
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.errorMessage === 'Success') {
        } else {
          alert(responseJson.errorMessage);
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status != 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }

    this.loadTheAllTrafficInfo();

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        this.setState({ latitude, longitude }),
      error => console.log('Error:', error)
    );
  }

  render() {
    const { latitude, longitude } = this.state;

    if (latitude) {
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View style={styles.modelStyle}>
              <View>
                <Text style={styles.modelTitle}>Update the status</Text>

                <View style={styles.optionButtonContainer}>
                  <TouchableHighlight
                    onPress={() => {
                      this.sendHeavyTrafficUpdate(!this.state.modalVisible);
                    }}
                  >
                    <View style={styles.optionChip}>
                      <View style={styles.optionBtn}>
                        <Image
                          source={lights}
                          style={styles.optionImage}
                        ></Image>
                      </View>
                      <Text style={styles.optionChipText}>Hevy Traffic</Text>
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={() => {
                      this.sendPolicemanUpdate(!this.state.modalVisible);
                    }}
                  >
                    <View style={styles.optionChip}>
                      <View style={styles.optionBtn}>
                        <Image
                          source={policeman}
                          style={styles.optionImage}
                        ></Image>
                      </View>
                      <Text style={styles.optionChipText}>
                        Policeman Controls
                      </Text>
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={() => {
                      this.sendVehicleAccidentUpdate(!this.state.modalVisible);
                    }}
                  >
                    <View style={styles.optionChip}>
                      <View style={styles.optionBtn}>
                        <Image
                          source={crash}
                          style={styles.optionImage}
                        ></Image>
                      </View>
                      <Text style={styles.optionChipText}>
                        Vehicle Accident
                      </Text>
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={() => {
                      this.sendRoadClosedUpdate(!this.state.modalVisible);
                    }}
                  >
                    <View style={styles.optionChip}>
                      <View style={styles.optionBtn}>
                        <Image
                          source={barrier}
                          style={styles.optionImage}
                        ></Image>
                      </View>
                      <Text style={styles.optionChipText}>Road Closed</Text>
                    </View>
                  </TouchableHighlight>
                </View>

                <TouchableHighlight
                  style={styles.hideModelBtn}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={styles.hideModel}>X</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Track the Traffic</Text>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder={'Where do you want to go..'}
                style={styles.searchBox}
              ></TextInput>
              <TouchableHighlight style={styles.searchButton}>
                <Image source={searchIcon} style={styles.searchIcon}></Image>
              </TouchableHighlight>
            </View>
          </View>
          <MapView
            showsUserLocation
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            style={styles.mapContainer}
          ></MapView>

          <TouchableHighlight
            style={styles.btnRound}
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <Text style={styles.btmRoundText}>+</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>We need your permission!</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height: height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#283593'
  },

  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: height * 0.05
  },

  mapContainer: {
    height: height * 0.8
  },

  btnRound: {
    width: 80,
    height: 80,
    right: width * 0.15,
    backgroundColor: '#283593',
    position: 'absolute',
    bottom: height * 0.05,
    borderRadius: 400,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  btmRoundText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold'
  },

  modelTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  modelContainer: {
    borderRadius: 15
  },

  modelStyle: {
    borderRadius: 20,
    margin: 20,
    backgroundColor: '#fff',
    padding: 20,
    height: height * 0.9
  },

  hideModelBtn: {
    width: 80,
    height: 80,
    backgroundColor: '#283593',
    borderRadius: 400,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.75,
    left: width * 0.3,
    position: 'absolute'
  },

  optionBtn: {
    width: 100,
    height: 100,
    backgroundColor: '#C5E1A5',
    borderRadius: 400,
    alignItems: 'center',
    justifyContent: 'center'
  },

  hideModel: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold'
  },

  optionButtonContainer: {
    justifyContent: 'space-between',
    height: height * 0.6,
    marginTop: 40,
    alignItems: 'center'
  },

  optionImage: {
    width: 70,
    height: 70
  },

  optionChip: {
    backgroundColor: '#DCEDC8',
    height: 100,
    width: width - 90,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center'
  },

  optionChipText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20
  },

  searchContainer: {
    width: width * 0.8,
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },

  searchBox: {
    borderRadius: 40,
    backgroundColor: '#fff',
    height: 40,
    width: width * 0.8 - 40,
    paddingLeft: 15
  },

  searchIcon: {
    width: 20,
    height: 20
  },

  searchButton: {
    padding: 20,
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40
  }
});
