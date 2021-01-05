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
  Dimensions,
} from "react-native";
import { addNewKid, removeKid } from "../redux/ActionCreators";
import { connect } from "react-redux";
import * as Font from "expo-font";
import { Input } from "react-native-elements";
import newUser from "../assets/NewUser.png";
import rainbow from "../assets/rainbowHills.png";
import cat from "../assets/Cat.png";
import dinosaur from "../assets/Dinosaur.png";
import dog from "../assets/Dog.png";
import RingProgress from "./RingProgressComponent";
import { percentToSize, widthPercentToSize } from "../shared/sizeUtils";

const mapDispatchToProps = {
  signUp: (user) => signUp(user),
  logIn: (user) => logIn(user),
  addNewKid: (user) => addNewKid(user),
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class ParentKidComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: this.props.parent,
      fontsLoaded: false,
      modalVisible: false,
      currentKid: "",
      newKid: "",
      selectedImage: "",
      totalPoints: 0,
      totalQuestions: 0,
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

  RenderImage = (image) => {
    if (image === "../assets/rainbowHills.png") {
      return (
        <Image resizeMode="contain" style={styles.image} source={rainbow} />
      );
    } else if (image === "../assets/Cat.png") {
      return <Image resizeMode="contain" style={styles.image} source={cat} />;
    } else if (image === "../assets/Dinosaur.png") {
      return (
        <Image resizeMode="contain" style={styles.image} source={dinosaur} />
      );
    } else if (image === "../assets/Dog.png") {
      return <Image resizeMode="contain" style={styles.image} source={dog} />;
    }
  };

  handleDeleteUser = () => {
    this.props.delete();
    this.setModalVisible(!this.state.modalVisible);
  };

  renderChallenges = () => {
    if (!this.props.user.selectedKid.categories) {
      return (
        <View>
          <Text>No categories available</Text>
        </View>
      );
    }

    return this.props.user.parent.kids
      .filter((kid) => kid._id === this.props.user.selectedKid._id)[0]
      .categories.map((category) => {
        const totalAnswered = category.questions.filter(
          (question) => question.answered === true
        ).length;
        const totalQuestions = category.questions.length;
        const percentComplete = ` ${(totalAnswered / totalQuestions) * 100}%`;
        return (
          <TouchableOpacity
            key={category.name}
          >
            <View>
              <Text style={styles.challengeText}>{category.name}</Text>
              <View
                style={{
                  backgroundColor: "#f5dc82",
                  width: "auto",
                  height: percentToSize(windowSize, 3),
                  borderRadius: 50,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ed553b",
                    width: percentComplete,
                    height: percentToSize(windowSize, 3), //20,
                    borderRadius: 50,
                  }}
                ></View>
              </View>
              <Text
                style={styles.challengeSubText}
              >{`${totalAnswered}/${totalQuestions} COMPLETE`}</Text>
            </View>
          </TouchableOpacity>
        );
      });
  };

  calculatePercent = () => {
    let total = 0;
    this.props.user.parent.kids
      .filter((kid) => kid._id === this.props.user.selectedKid._id)[0]
      .categories.map((category) => {
        total = total + category.questions.length;
      });

    let points = 0;
    this.props.user.parent.kids
      .filter((kid) => kid._id === this.props.user.selectedKid._id)[0]
      .categories.map((category) => {
        category.questions.map((question) => {
          if (question.answered === true) {
            points += 1;
          }
        });
      });

    if (this.state.totalPoints !== points) {
      this.setState({ totalPoints: points });
    }
    if (this.state.totalQuestions !== total) {
      this.setState({ totalQuestions: total });
    }
    if (this.state.totalPoints === 0 || total === 0) {
      return 0;
    } else {
      return (this.state.totalPoints / total) * 100;
    }
  };

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ed553b" />
        </View>
      );
    }

    if (!this.props.user.selectedKid.name) {
      return (
        <View style={styles.noUserContainer}>
          <Text style={styles.noUser}> SELECT OR ADD USER</Text>
        </View>
      );
    }

    return (
      <View style={styles.main}>
        <View style={styles.centered}>
          <View>{this.RenderImage(this.props.user.selectedKid.image)}</View>
          <View>
            <Text style={styles.title}>{this.props.kid.name}</Text>
          </View>
        </View>

        <View style={styles.titleRow}>
          <View style={styles.titleColumn}>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => alert(this.state.totalPoints)}>
                <Text style={styles.buttonText}>PROGRESS</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.titleColumn}>
            <Text style={styles.text}>CHALLENGES</Text>
          </View>
        </View>

        <View style={styles.pointsRow}>
          <View style={styles.column}>
            <RingProgress
              style={styles.progressRing}
              text={`${this.state.totalPoints}/${this.state.totalQuestions} \nPOINTS`}
              textFontSize={14}
              textFontColor="#ed553b"
              progressRingWidth={10}
              percent={this.calculatePercent()}
              ringColor="#ed553b"
              ringBgColor="#f5d047"
              radius={percentToSize( Dimensions.get("window"),8)}
            />
            {/* <View style={styles.button}>
              <TouchableOpacity
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
              >
                <Text style={styles.buttonText}>DELETE PROFILE</Text>
              </TouchableOpacity>
            </View> */}
          </View>

          <View style={styles.challengeColumn}>
            <View style={styles.centered}>
              <View style={styles.challengeScrollView}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                >
                  {this.renderChallenges()}
                </ScrollView>
              </View>
              {/* <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigate()}
              >
                <Text style={styles.buttonText}>+CHALLENGES</Text>
              </TouchableOpacity> */}
            </View>
          </View>
          
          
        </View>
        <View style={styles.bottomRow}>
            <View style={styles.titleColumn}>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
              >
                <Text style={styles.buttonText}>DELETE PROFILE</Text>
              </TouchableOpacity>
            </View>
            </View>
            <View style={styles.titleColumn}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigate()}
              >
                <Text style={styles.buttonText}>+CHALLENGES</Text>
              </TouchableOpacity>
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
                  <Text style={styles.modalTitle}>
                    ARE YOU SURE YOU WANT TO DELETE THIS PROFILE?{" "}
                  </Text>
                  <View style={{ height: 15 }}></View>

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
                      onPress={() => this.handleDeleteUser()}
                    >
                      <Text style={styles.buttonText}>CONFIRM</Text>
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

const windowSize = Dimensions.get("window");
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#f6d55c",
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  loading: {
    backgroundColor: "#f6d55c",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: percentToSize(windowSize, 4), //24,
  },
  text: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: percentToSize(windowSize, 3), //20,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    // justifyContent: "center",
    // alignContent: "center",
  },
  progressRing:{
  },
  pointsRow:{
    flexDirection:'row',
    width:'100%',
    height:'15%'
  },
  bottomRow:{
    flexDirection:'row',
    width:'100%',
    marginTop:percentToSize(windowSize, 3)
  },
  titleRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: percentToSize(windowSize, 3), //20,
  },
  titleColumn: {
    width: "50%",
    alignItems: "center",
  },
  column: {
    textAlign: "center",
    width: "50%",
    alignItems: "center",
    justifyContent:'center'
  },
  challengeColumn: {
    width: "50%",
    alignItems: "center",
  },
  challengeScrollView: {
    height: '100%',//"45.5%",
    justifyContent: "center",
  },
  challengeText: {
    textAlign: "center",
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: percentToSize(windowSize, 2.5), //18,
    marginTop: percentToSize(windowSize, 0.5),
  },
  challengeSubText: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: percentToSize(windowSize, 2), //12,
  },
  noUser: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: percentToSize(windowSize, 5), //24,
  },
  noUserContainer: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: percentToSize(windowSize, 20), //150,
  },
  imageContainer: {
    height: percentToSize(windowSize, 20),
    width: percentToSize(windowSize, 20),
  },
  image: {
    height: percentToSize(windowSize, 20),
    width: percentToSize(windowSize, 20),
    marginLeft: 10,
  },
  modalX: {
    fontSize: percentToSize(windowSize, 6),
    alignSelf: "flex-end",
    marginBottom: percentToSize(windowSize, 2.5),
  },
  modalButtons: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#ed553b",
    color: "#fff",
    borderRadius: 50,
    padding: percentToSize(windowSize, 1),
    alignItems: "center",
    margin: percentToSize(windowSize, 1.5),
  },
  buttonText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: percentToSize(windowSize, 2.3),
    paddingHorizontal: percentToSize(windowSize, 1.5),
  },
  modalView: {
    marginHorizontal: percentToSize(windowSize, 5),
    marginTop: percentToSize(windowSize, 15),
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: percentToSize(windowSize, 5),
    paddingBottom: percentToSize(windowSize, 1),
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
export default connect(mapStateToProps, mapDispatchToProps)(ParentKidComponent);
