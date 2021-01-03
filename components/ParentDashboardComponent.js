import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Modal,
} from "react-native";
import { addNewKid, deleteKid, setSelectedKid } from "../redux/ActionCreators";
import { connect } from "react-redux";
import * as Font from "expo-font";
import { Input } from "react-native-elements";
import newUser from "../assets/NewUser.png";
import rainbow from "../assets/rainbowHills.png";
import cat from "../assets/Cat.png";
import dinosaur from "../assets/Dinosaur.png";
import dog from "../assets/Dog.png";
import RingProgress from "./RingProgressComponent";
import ParentKidComponent from "./ParentKidComponent";
import { Icon } from "react-native-elements";
import { Platform } from "react-native";

const mapDispatchToProps = {
  signUp: (user) => signUp(user),
  logIn: (user) => logIn(user),
  addNewKid: (user) => addNewKid(user),
  deleteKid: (user, kidId) => deleteKid(user, kidId),
  setSelectedKid: (kid) => setSelectedKid(kid),
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class ParentDashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: this.props.parent,
      fontsLoaded: false,
      modalVisible: false,
      selectedKid: {},
      newKid: "",
      selectedImage: "",
    };
  }

  customFonts = {
    Dosis: require("../assets/fonts/Dosis-Bold.ttf"),
    //'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  };

  async _loadFontsAsync() {
    await Font.loadAsync(this.customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.setState({ modalVisible: false });
  }

  renderUserStats = () => {
    if (!this.state.currentKid) {
      return (
        <View style={styles.noUserContainer}>
          <Text style={styles.noUser}>You have no users yet.</Text>
          <Text style={styles.noUser}>Add a user to see stats.</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text>{this.state.currentKid}</Text>
        </View>
      );
    }
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  submitNewKid = () => {
    const user = {
      token: this.props.user.token,
      id: this.props.user.id,
      kid: {
        name: this.state.newKid,
        image: this.state.selectedImage,
      },
    };
    this.props.addNewKid(user);
    this.setModalVisible(!this.state.modalVisible);
  };
  RenderImage = (image) => {
    if (image === "../assets/rainbowHills.png") {
      return (
        <Image
          style={
            this.props.user.selectedKid.image === "../assets/rainbowHills.png"
              ? styles.fadedImage
              : styles.image
          }
          source={rainbow}
        />
      );
    } else if (image === "../assets/Cat.png") {
      return (
        <Image
          style={
            this.props.user.selectedKid.image === "../assets/Cat.png"
              ? styles.fadedImage
              : styles.image
          }
          source={cat}
        />
      );
    } else if (image === "../assets/Dinosaur.png") {
      return (
        <Image
          style={
            this.props.user.selectedKid.image === "../assets/Dinosaur.png"
              ? styles.fadedImage
              : styles.image
          }
          source={dinosaur}
        />
      );
    } else if (image === "../assets/Dog.png") {
      return <Image style={styles.image} source={dog} />;
    }
  };

  RenderKids = () => {
    return this.props.user.kids.map((kid) => {
      return (
        <TouchableOpacity
          key={kid._id}
          style={styles.centered}
          // onPress={()=>this.setState({selectedKid:kid})}
          onPress={() => this.props.setSelectedKid(kid)}
        >
          {this.RenderImage(kid.image)}
          <Text style={styles.profileText}>{kid.name}</Text>
        </TouchableOpacity>
      );
    });
  };
  deleteKid = () => {
    this.props.setSelectedKid({});
    this.props.deleteKid(
      this.props.user.parent,
      this.props.user.selectedKid._id
    );
  };
  handleNavigation = () => {
    this.props.navigation.navigate("Challenge", {
      id: this.props.user.selectedKid._id,
    });
  };

  render() {

    if (!this.state.fontsLoaded ||this.props.user.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ed553b" />
        </View>
      );
    }

    return (
      <View style={styles.main}>
        {Platform.OS === "ios" ? (
          <TouchableOpacity
            style={{ marginTop: 15, alignSelf: "right" }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="chevron-left" size="50" color="#ed553b" />
          </TouchableOpacity>
        ) : (
          <View style={{ marginTop: 30 }} />
        )}
        <View style={styles.centered}>
          <Text style={styles.title}>PARENT DASHBOARD</Text>
        </View>
        <View style={styles.profiles}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={styles.centered}
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
              >
                <Image source={newUser} style={styles.image} />
                <Text style={styles.profileText}>New User</Text>
              </TouchableOpacity>
              {this.RenderKids()}
            </ScrollView>
        </View>
        <View style={styles.centered}>
          <View>
            {this.props.user.selectedKid ? (
              <ParentKidComponent
                kid={this.props.user.selectedKid}
                delete={this.deleteKid}
                navigate={() => this.handleNavigation()}
              />
            ) : (
              <View/> 
            )}
          </View>
        </View>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <KeyboardAvoidingView
              style={{ flex: 1, marginBottom: 10 }}
              behavior="padding"
              keyboardVerticalOffset="0"
            >
              <ScrollView>
                <View style={styles.modalView}>
                  <Text
                    style={styles.modalX}
                    onPress={() =>
                      this.setModalVisible(!this.state.modalVisible)
                    }
                  >
                    x
                  </Text>
                  <Text style={styles.modalTitle}>SELECT PROFILE PICTURE </Text>
                  <View style={{ height: 150 }}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            selectedImage: "../assets/Dinosaur.png",
                          })
                        }
                      >
                        <Image
                          source={dinosaur}
                          style={
                            !this.state.selectedImage ||
                            this.state.selectedImage ===
                              "../assets/Dinosaur.png"
                              ? styles.image
                              : styles.fadedImage
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({ selectedImage: "../assets/Cat.png" })
                        }
                      >
                        <Image
                          source={cat}
                          style={
                            !this.state.selectedImage ||
                            this.state.selectedImage === "../assets/Cat.png"
                              ? styles.image
                              : styles.fadedImage
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({ selectedImage: "../assets/Dog.png" })
                        }
                      >
                        <Image
                          source={dog}
                          style={
                            !this.state.selectedImage ||
                            this.state.selectedImage === "../assets/Dog.png"
                              ? styles.image
                              : styles.fadedImage
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            selectedImage: "../assets/rainbowHills.png",
                          })
                        }
                      >
                        <Image
                          source={rainbow}
                          style={
                            !this.state.selectedImage ||
                            this.state.selectedImage ===
                              "../assets/rainbowHills.png"
                              ? styles.image
                              : styles.fadedImage
                          }
                        />
                      </TouchableOpacity>
                    </ScrollView>
                  </View>
                  <View style={styles.fieldBackground}>
                    <TextInput
                      style={styles.centered}
                      placeholder="CHILDS NAME"
                      placeholderTextColor="#ed553b"
                      style={styles.fields}
                      value={this.state.newKid}
                      onChangeText={(e) => this.setState({ newKid: e })}
                    />
                  </View>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        this.setModalVisible(!this.state.modalVisible)
                      }
                    >
                      <Text style={styles.buttonText}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.submitNewKid()}
                    >
                      <Text style={styles.buttonText}>SAVE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
              </KeyboardAvoidingView>
          </Modal>
        </View>
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
  profiles:{
    height:150
  },
  scrollViewContainer: {
    height: 200,
    maxHeight: 200,
  },
  title: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: "0%",
    marginBottom: 0,
    fontSize: 40,
  },
  fieldBackground: {
    width: "80%",
    marginTop: 15,
    backgroundColor: "#f2f2f2",
    opacity: 1,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.51)",
    borderRadius: 50,
    color: "red",
    alignItems: "center",
  },
  fields: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: 24,
  },
  noUser: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: 24,
  },
  noUserContainer: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: 24,
    marginBottom: 50,
  },
  image: {
    height: 98,
    width: 84,
    marginLeft: 10,
    opacity: 1,
  },
  fadedImage: {
    height: 95,
    width: 84,
    marginLeft: 10,
    opacity: 0.5,
  },
  profileText: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: 0,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
  },
  button: {
    marginTop: 40,
    backgroundColor: "#ed553b",
    color: "#fff",
    borderRadius: 50,
    padding: 5,

    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  modalX: {
    fontSize: 40,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  modalView: {
    margin: 30,
    marginTop: 170,
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParentDashboardComponent);
