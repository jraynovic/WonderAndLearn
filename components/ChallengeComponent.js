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
  Dimensions,
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { percentToSize, widthPercentToSize } from "../shared/sizeUtils";

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
    if (!this.state.fontsLoaded || this.props.user.loading) {
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
            style={styles.iosNavIcon}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="chevron-left" size="50" color="#ed553b" />
          </TouchableOpacity>
        ) : (
          <View style={styles.notIOS} />
        )}
        <Text style={styles.title}>CHALLENGES</Text>
        <Text>{JSON.stringify(this.props.user.parent.kids.categories)}</Text>
        <TouchableOpacity
          onPress={() => this.setCatModalVisible(!this.state.catModalVisible)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>+SUBJECT</Text>
        </TouchableOpacity>
        {/* )} */}
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
            <KeyboardAwareScrollView>
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
              </KeyboardAwareScrollView>
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
                <View style={styles.categoryView}>
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
                      <View style={styles.imageContainer}>
                      <Image
                      resizeMode='contain'
                        source={MathIcon}
                        style={
                          !this.state.selectedImage ||
                          this.state.selectedImage === "../assets/MathIcon.png"
                            ? styles.image
                            : styles.fadedImage
                        }
                      />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          selectedImage: "../assets/ReadingIcon.png",
                        })
                      }
                    >
                      <View style={styles.imageContainer}>
                      <Image
                      resizeMode='contain'
                        source={ReadingIcon}
                        style={
                          !this.state.selectedImage ||
                          this.state.selectedImage ===
                            "../assets/ReadingIcon.png"
                            ? styles.image
                            : styles.fadedImage
                        }
                      />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          selectedImage: "../assets/ScienceIcon.png",
                        })
                      }
                    >
                      <View style={styles.imageContainer}>
                        <Image
                          source={ScienceIcon}
                          resizeMode="contain"
                          style={
                            !this.state.selectedImage ||
                            this.state.selectedImage ===
                              "../assets/ScienceIcon.png"
                              ? styles.image
                              : styles.fadedImage
                          }
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          selectedImage: "../assets/HistoryIcon.png",
                        })
                      }
                    >
                      <View style={styles.imageContainer}>
                        <Image
                          source={HistoryIcon}
                          resizeMode="contain"
                          style={
                            !this.state.selectedImage ||
                            this.state.selectedImage ===
                              "../assets/HistoryIcon.png"
                              ? styles.image
                              : styles.fadedImage
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
                <View>
                  <TextInput
                    // style={styles.centered}
                    placeholder="CATEGORY NAME"
                    placeholderTextColor="#ed553b"
                    style={styles.modalFields}
                    value={this.state.newSubject}
                    onChangeText={(e) => this.setState({ newSubject: e })}
                  />
                </View>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() =>
                      this.setCatModalVisible(!this.state.catModalVisible)
                    }
                  >
                    <Text style={styles.modalButtonText}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => this.handleNewSubject()}
                  >
                    <Text style={styles.modalButtonText}>SAVE</Text>
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

const windowSize = Dimensions.get("window");
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#f6d55c",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  loading: {
    backgroundColor: "#f6d55c",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: "20%",
    marginBottom: percentToSize(windowSize, 9), //60,
    fontSize: percentToSize(windowSize, 6), //40,
  },
  imageContainer: {
    height: percentToSize(windowSize, 12),
    width: percentToSize(windowSize, 12),
    marginTop: percentToSize(windowSize, 2),
    marginBottom: percentToSize(windowSize, 2),
  },
  image: {
    height: percentToSize(windowSize, 12), //95,
    width: percentToSize(windowSize, 12), //84,
    marginLeft: percentToSize(windowSize, 1),
    opacity: 1,
  },
  fadedImage: {
    height: percentToSize(windowSize, 10), //95,
    width: percentToSize(windowSize, 10), //84,
    marginLeft: percentToSize(windowSize, 1),
    opacity: 0.5,
  },
  categoryView:{
     height: percentToSize(windowSize, 16)
  },
  modalFields: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: percentToSize(windowSize, 3.5),//24,
  },
  button: {
    width: percentToSize(windowSize, 40),//225,
    marginTop: percentToSize(windowSize, 3),
    backgroundColor: "#ed553b",
    color: "#fff",
    borderRadius: 50,
    padding: percentToSize(windowSize, .75),
    shadowOffset: { width: -5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: percentToSize(windowSize, 2.5),
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  modalX: {
    fontSize: percentToSize(windowSize, 6),
    alignSelf: "flex-end",
    marginVertical: percentToSize(windowSize, 2),
    
  },
  modalButtons: {
    flexDirection: "row",
    flex: 1,
  },
  modalView: {
    marginHorizontal: percentToSize(windowSize, 6),
    marginTop: percentToSize(windowSize, 8),
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: percentToSize(windowSize, 6),
    paddingBottom: percentToSize(windowSize, 3),
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
  modalKeyboardView:{
    marginBottom: percentToSize(windowSize, 2) 
  },
  modalButton: {
    marginTop: percentToSize(windowSize, 6),//40,
    width: percentToSize(windowSize, 15),
    backgroundColor: "#ed553b",
    color: "#fff",
    borderRadius: 50,
    padding: percentToSize(windowSize, 1),
    alignItems: "center",
    marginHorizontal: percentToSize(windowSize, 2),
  },
  modalButtonText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: percentToSize(windowSize, 2.5),
    paddingHorizontal: percentToSize(windowSize, 2),
  },
  iosNavIcon: {
    marginTop: percentToSize(windowSize, 2.5),
    alignSelf: "flex-start",
  },
  notIOS:{
    marginTop: percentToSize(windowSize, 2.5),
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(ChallengeComponent);
