import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import {
  addNewChallenge,
  deleteChallenge,
  setSelectedKid,
} from "../redux/ActionCreators";
import { connect } from "react-redux";
import * as Font from "expo-font";
import { Icon } from "react-native-elements";
import HistoryIcon from "../assets/HistoryIcon.png";
import MathIcon from "../assets/MathIcon.png";
import ReadingIcon from "../assets/ReadingIcon.png";
import ScienceIcon from "../assets/ScienceIcon.png";


//test comment to verfify push to dev branch
const mapDispatchToProps = {
  addNewChallenge: (user, kidId, category) =>
    addNewChallenge(user, kidId, category),
  deleteChallenge: (user, kidId, categoryId, kid) =>
    deleteChallenge(user, kidId, categoryId, kid),
  setSelectedKid: (kid) => setSelectedKid(kid),
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    kids: state.kids,
  };
};

class ChallengeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      loading: false,
      modalVisible: false,
      catModalVisible: false,
      selectedImage: "",
      kidId: this.props.navigation.state.params.id,
      currentKid: {},
      newSubjectInput: false,
      newSubject: "",
      deleteChallenge: "",
    };
  }

  customFonts = {
    Dosis: require("../assets/fonts/Dosis-Bold.ttf"),
  };

  async _loadFontsAsync() {
    await Font.loadAsync(this.customFonts);
    this.setState({ fontsLoaded: true });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  setCatModalVisible = (visible) => {
    this.setState({ catModalVisible: visible });
  };

  componentDidMount() {
    this._loadFontsAsync();
    const kid = this.props.user.kids.filter(
      (kid) => kid._id === this.props.navigation.state.params.id
    );
    this.setState({
      currentKid: kid[0],
      modalVisible: false,
      catModalVisible: false,
    });
  }

  stageDeletion = (categoryId) => {
    this.setState({ deleteChallenge: categoryId }, () => {
      this.setModalVisible(!this.state.modalVisible);
    });
  };
  deleteChallenge = () => {
    this.setModalVisible(!this.state.modalVisible);
    this.props.deleteChallenge(
      this.props.user.parent,
      this.state.currentKid._id,
      this.state.deleteChallenge,
      this.state.currentKid
    );
  };

  renderChallenges = () => {
    if (
      this.props.user.kids.filter(
        (kid) => kid._id === this.props.navigation.state.params.id
      )[0].categories
    ) {
      return this.props.user.kids
        .filter((kid) => kid._id === this.props.navigation.state.params.id)[0]
        .categories.map((category) => {
          return (
            <TouchableOpacity
              key={category._id}
              onLongPress={() => this.stageDeletion(category._id)}
              onPress={() =>
                this.props.navigation.navigate("ParentQuestion", {
                  challenge: category,
                })
              }
              style={styles.button}
            >
              <Text style={styles.buttonText}>{category.name}</Text>
            </TouchableOpacity>
          );
        });
    }
  };
  handleNewSubject = () => {
    this.props
      .addNewChallenge(
        this.props.user.parent,
        this.props.navigation.state.params.id,
        {
          category: {
            name: this.state.newSubject,
            image: this.state.selectedImage,
          },
        }
      )
      .then(
        this.setState({ newSubjectInput: false }, () => {
          const kid = this.props.user.kids.filter(
            (kid) => kid._id === this.props.navigation.state.params.id
          );
          this.setState({ currentKid: kid[0] });
        })
      );
    this.setCatModalVisible(!this.state.catModalVisible);
  };

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }

    if (this.props.user.loading) {
      return (
        <View style={styles.main}>
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

        <Text style={styles.title}>CHALLENGES</Text>
        <Text>{JSON.stringify(this.props.user.parent.kids.categories)}</Text>
        {this.state.newSubjectInput ? (
          <KeyboardAvoidingView>
            <TouchableOpacity
              style={styles.fieldBackground}
              onPress={() => this.setState({ newSubjectInput: false })}
            >
              <TextInput
                style={styles.fields}
                placeholder="New Subject"
                placeholderTextColor="#ed553b"
                autoFocus
                value={this.state.newSubject}
                onChangeText={(e) => this.setState({ newSubject: e })}
              />
            </TouchableOpacity>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.greenButton}
                onPress={() => this.handleNewSubject()}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.redButton}
                onPress={() => this.setState({ newSubjectInput: false })}
              >
                <Text style={styles.buttonText}>X</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        ) : (
          <TouchableOpacity
            onPress={() => this.setCatModalVisible(!this.state.catModalVisible)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>+SUBJECT</Text>
          </TouchableOpacity>
        )}
        {this.renderChallenges()}

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
                  <Text style={styles.modalTitle}>
                    ARE YOU SURE YOU WANT TO DELETE THIS CHALLENGE?{" "}
                  </Text>
                  <View style={{ height: 15 }}></View>

                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() =>
                        this.setModalVisible(!this.state.modalVisible)
                      }
                    >
                      <Text style={styles.buttonText}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => this.deleteChallenge()}
                    >
                      <Text style={styles.buttonText}>CONFIRM</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </Modal>
        </View>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.catModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <ScrollView>
              <View style={styles.modalView}>
                <Text
                  style={styles.modalX}
                  onPress={() =>
                    this.setCatModalVisible(!this.state.catModalVisible)
                  }
                >
                  x
                </Text>
                <Text style={styles.modalTitle}>SELECT A CATEGORY ICON </Text>
                <View style={{ height: 150 }}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.iconScroll}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          selectedImage: "../assets/MathIcon.png",
                        })
                      }
                    >
                      <Image
                        source={MathIcon}
                        style={
                          !this.state.selectedImage ||
                          this.state.selectedImage === "../assets/MathIcon.png"
                            ? styles.image
                            : styles.fadedImage
                        }
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          selectedImage: "../assets/ReadingIcon.png",
                        })
                      }
                    >
                      <Image
                        source={ReadingIcon}
                        style={
                          !this.state.selectedImage ||
                          this.state.selectedImage ===
                            "../assets/ReadingIcon.png"
                            ? styles.image
                            : styles.fadedImage
                        }
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          selectedImage: "../assets/ScienceIcon.png",
                        })
                      }
                    >
                      <Image
                        source={ScienceIcon}
                        style={
                          !this.state.selectedImage ||
                          this.state.selectedImage ===
                            "../assets/ScienceIcon.png"
                            ? styles.image
                            : styles.fadedImage
                        }
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          selectedImage: "../assets/HistoryIcon.png",
                        })
                      }
                    >
                      <Image
                        source={HistoryIcon}
                        style={
                          !this.state.selectedImage ||
                          this.state.selectedImage ===
                            "../assets/HistoryIcon.png"
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
                    placeholder="CATEGORY NAME"
                    placeholderTextColor="#ed553b"
                    style={styles.modalFields}
                    value={this.state.newSubject}
                    onChangeText={(e) => this.setState({ newSubject: e })}
                  />
                </View>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.logInButton}
                    onPress={() =>
                      this.setCatModalVisible(!this.state.catModalVisible)
                    }
                  >
                    <Text style={styles.logInButtonText}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.logInButton}
                    onPress={() => this.handleNewSubject()}
                  >
                    <Text style={styles.logInButtonText}>SAVE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
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
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: "20%",
    marginBottom: 60,
    fontSize: 40,
  },
  errMess: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: 10,
    fontSize: 24,
  },
  fieldBackground: {
    width: 225,
    marginTop: 15,
    backgroundColor: "rgba(255, 255, 255, 0.51)",
    opacity: 1,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.51)",
    borderRadius: 50,
    color: "red",
  },
  image: {
    // height: 70,
    // width: 65,
    height: 95,
    width: 84,
    marginLeft: 10,
    opacity: 1,
    resizeMode: "contain",
  },
  fadedImage: {
    height: 70,
    width: 65,
    // height: 95,
    // width: 84,
    marginLeft: 10,
    opacity: 0.5,
  },
  fields: {
    padding: 5,
    opacity: 1,
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: 16,
    marginLeft: 10,
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
  modalFields: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: 24,
  },
  button: {
    width: 225,
    marginTop: 20,
    backgroundColor: "#ed553b",
    color: "#fff",
    borderRadius: 50,
    padding: 5,
    shadowOffset: { width: -5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  greenButton: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 50,
    backgroundColor: "green",
  },
  redButton: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 50,
    backgroundColor: "#ed553b",
    alignItems: "center",
    justifyContent: "center",
  },
  modalX: {
    fontSize: 40,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  modalButton: {
    width: 125,
    marginTop: 20,
    marginHorizontal: 5,
    backgroundColor: "#ed553b",
    color: "#fff",
    borderRadius: 50,
    padding: 5,
    shadowOffset: { width: -5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    alignItems: "center",
  },
  modalButtons: {
    flexDirection: "row",
    flex: 1,
    // justifyContent:'space-around'
  },
  modalView: {
    marginHorizontal: 30,
    // marginTop: 140,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingBottom: 10,
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
  logInButton: {
    marginTop: 40,
    backgroundColor: "#ed553b",
    color: "#fff",
    borderRadius: 50,
    padding: 5,

    alignItems: "center",
    marginHorizontal: 10,
  },
  logInButtonText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  iconScroll: {
    //   backgroundColor:'#fff6e6'
  },
  footer: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: 16,
    marginTop: 200,
    marginLeft: 8,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ChallengeComponent);
