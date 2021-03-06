import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  Modal,
} from "react-native";
import { signUp, logIn, setSelectedKid } from "../redux/ActionCreators";
import { connect } from "react-redux";
import * as Font from "expo-font";
import rainbow from "../assets/rainbowHills.png";
import cat from "../assets/Cat.png";
import dinosaur from "../assets/Dinosaur.png";
import dog from "../assets/Dog.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const mapDispatchToProps = {
  signUp: (user) => signUp(user),
  logIn: (user) => logIn(user),
  setSelectedKid: (kid) => setSelectedKid(kid),
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: this.props.parent,
      fontsLoaded: false,
      modalVisible: false,
      pinEntered: "",
      pinError: "",
    };
  }

  customFonts = {
    Dosis: require("../assets/fonts/Dosis-Bold.ttf"),
  };

  async _loadFontsAsync() {
    await Font.loadAsync(this.customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.setState({ modalVisible: false });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  verifyPin = () => {
    const enteredPin =
      this.state.one + this.state.two + this.state.three + this.state.four;
    if (parseInt(enteredPin) === this.props.user.pin) {
      this.setModalVisible(!this.state.modalVisible);
      this.props.navigation.navigate("ParentDashboard");
    } else {
      console.log("WRONG PIN!");
      this.setState({ pinError: "INCORRECT PIN" });
    }
  };
  RenderImage = (image) => {
    if (image === "../assets/rainbowHills.png") {
      return <Image style={styles.image} source={rainbow} />;
    } else if (image === "../assets/Cat.png") {
      return <Image style={styles.image} source={cat} />;
    } else if (image === "../assets/Dinosaur.png") {
      return <Image style={styles.image} source={dinosaur} />;
    } else if (image === "../assets/Dog.png") {
      return <Image style={styles.image} source={dog} />;
    }
  };

  handleNav = (kid) => {
    this.props.setSelectedKid(kid);
    this.props.navigation.navigate("KidsHome");
  };

  RenderKids = () => {
    if (this.props.user.kids.length !== 0) {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {this.props.user.kids.map((kid) => {
            return (
              <TouchableOpacity
                key={kid._id}
                style={styles.kidsProfile}
                onPress={() => this.handleNav(kid)}
              >
                <View style={styles.centered}>
                  {this.RenderImage(kid.image)}
                  <Text style={styles.kidText}>{kid.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
    }
  };

  render() {
    if (!this.state.fontsLoaded || this.props.user.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ed553b" />
        </View>
      );
    }

    return (
      <View style={styles.main}>
        <View style={styles.centered}>
          <Text style={styles.title}>WONDER + LEARN</Text>
        </View>
        {this.props.user.kids.length !== 0 ? (
          <View style={styles.profiles}>{this.RenderKids()}</View>
        ) : (
          <View style={styles.centered}>
            <Text
              style={styles.noKids}
            >{`USE THE \nFOR PARENTS \nBUTTON TO \nADD AND \nMANAGE KIDS `}</Text>
          </View>
        )}
        <View style={styles.centered}>
          <TouchableOpacity
            style={styles.forParentsButton}
            onPress={() => this.setModalVisible(!this.state.modalVisible)}
          >
            <Text
              onPress={() => this.setModalVisible(!this.state.modalVisible)}
              style={styles.forParentsButtonText}
            >
              FOR PARENTS
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <KeyboardAwareScrollView
            style={styles.main}
            style={{ backgroundColor: "#f6d55c" }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.main}
            scrollEnabled={true}
          >
            <View style={styles.modalView}>
              <Text
                style={styles.modalX}
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
              >
                x
              </Text>
              <Text style={styles.modalTitle}>ENTER PIN TO CONTINUE </Text>
              <View style={styles.pinContainer}>
                <View style={styles.pinBox}>
                  <TextInput
                    autoFocus={true}
                    secureTextEntry
                    keyboardType="numeric"
                    placeholderTextColor="#ed553b"
                    style={styles.fields}
                    onChangeText={(e) => {
                      this.setState({ one: e });
                      this.twoRef.focus();
                    }}
                  />
                </View>
                <View style={styles.pinBox}>
                  <TextInput
                    secureTextEntry
                    keyboardType="numeric"
                    ref={(ref) => (this.twoRef = ref)}
                    placeholderTextColor="#ed553b"
                    style={styles.fields}
                    onChangeText={(e) => {
                      this.setState({ two: e });
                      this.threeRef.focus();
                    }}
                  />
                </View>
                <View style={styles.pinBox}>
                  <TextInput
                    secureTextEntry
                    keyboardType="numeric"
                    ref={(ref) => (this.threeRef = ref)}
                    placeholderTextColor="#ed553b"
                    style={styles.fields}
                    onChangeText={(e) => {
                      this.setState({ three: e });
                      this.fourRef.focus();
                    }}
                  />
                </View>
                <View style={styles.pinBox}>
                  <TextInput
                    secureTextEntry
                    keyboardType="numeric"
                    ref={(ref) => (this.fourRef = ref)}
                    placeholderTextColor="#ed553b"
                    style={styles.fields}
                    onChangeText={(e) => {
                      this.setState({ four: e });
                      Keyboard.dismiss();
                    }}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.errMessage}>{this.state.pinError}</Text>
              </View>
              <TouchableOpacity
                style={styles.forParentsButton}
                onPress={() => this.verifyPin()}
              >
                <Text style={styles.forParentsButtonText}>ENTER</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#f6d55c",
    flex: 1,
    justifyContent: "flex-start",
  },
  loading: {
    backgroundColor: "#f6d55c",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: "20%",
    marginBottom: 60,
    fontSize: 40,
  },
  noKids: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: 0,
    marginBottom: 150,
    fontSize: 40,
    textAlign: "center",
  },
  kidText: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: 10,
    fontSize: 24,
  },
  kidsProfile: {
    marginHorizontal: 10,
  },
  fields: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: 40,
    textAlign: "center",
  },
  errMessage: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: 24,
  },
  image: {
    height: 112,
    width: 95,
    marginLeft: 10,
  },
  modalTitle: {
    marginTop: 30,
    fontSize: 20,
  },
  pinContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 75,
  },
  pinBox: {
    margin: 5,
    height: 50,
    width: 50,
    borderColor: "black",
    borderWidth: 2,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profiles: {
    flex: 1,
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "flex-start",
  },
  forParentsButton: {
    width: 175,
    marginBottom: 25,
    backgroundColor: "#ed553b",
    color: "#fff",
    borderRadius: 50,
    padding: 5,
    shadowOffset: { width: -5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    alignItems: "center",
  },
  forParentsButtonText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: 16,
  },
  modalX: {
    fontSize: 40,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  modalView: {
    margin: 30,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
