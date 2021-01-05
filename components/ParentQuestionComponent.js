import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
  Dimensions
} from "react-native";
import { deleteQuestionKid } from "../redux/ActionCreators";
import { connect } from "react-redux";
import * as Font from "expo-font";
import { Icon } from "react-native-elements";
import { percentToSize, widthPercentToSize } from "../shared/sizeUtils";

const mapDispatchToProps = {
  deleteQuestionKid: (user, kidId, challengeId, questionId, question) =>
    deleteQuestionKid(user, kidId, challengeId, questionId, question),
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class ParentQuestionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      loading: false,
      stagedQuestion: {},
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

  deleteQuestion = (questionId) => {
    this.props.deleteQuestionKid(
      this.props.user,
      this.props.user.parent.kids.filter(
        (kid) => kid._id === this.props.user.selectedKid._id
      )[0]._id,
      this.props.user.parent.kids
        .filter((kid) => kid._id === this.props.user.selectedKid._id)[0]
        .categories.filter(
          (category) =>
            category.name === this.props.navigation.state.params.challenge.name
        )[0]._id,
      this.state.stagedQuestion._id,
      this.state.stagedQuestion
    );
    this.setModalVisible(!this.state.modalVisible);
  };

  stageDeletion = (question) => {
    this.setModalVisible(!this.state.modalVisible);
    this.setState({ stagedQuestion: question });
  };

  handleEdit = (question) => {
    const questionDetails = {
      kidId: this.props.user.parent.kids.filter(
        (kid) => kid._id === this.props.user.selectedKid._id
      )[0]._id,
      question: question,
      category: this.props.navigation.state.params.challenge.name,
      categoryId: this.props.navigation.state.params.challenge._id,
    };
    this.props.navigation.navigate("ParentEditQuestion", questionDetails);
  };

  renderQuestions = () => {
    if (this.props.navigation.state.params.challenge.questions) {
      const questions = this.props.user.parent.kids
        .filter((kid) => kid._id === this.props.user.selectedKid._id)[0]
        .categories.filter(
          (category) =>
            category.name === this.props.navigation.state.params.challenge.name
        )[0].questions;
      let numPlace = 0;
      return questions.map((question) => {
        {
          numPlace = numPlace + 1;
        }
        return (
          <TouchableOpacity
            onPress={() => this.handleEdit(question)}
            style={styles.button}
            onLongPress={() => this.stageDeletion(question)}
            key={question._id}
          >
            <View style={styles.row}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.leftAlign}>
                  <Text style={styles.buttonText}>{`${numPlace}.)`}</Text>
                </View>
                <View style={styles.centered}>
                  <Text
                    style={styles.buttonText}
                  >{`   ${question.question}`}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      });
    }

    return (
      <View>
        <Text>NO QUESTIONS AVAILABLE</Text>
      </View>
    );
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
        <Text style={styles.title}>
          {this.props.navigation.state.params.challenge.name}
        </Text>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("ParentBuildQuestion", {
              category: this.props.navigation.state.params.challenge,
            })
          }
          style={styles.button}
        >
          <Text style={styles.questionText}>+QUESTION</Text>
        </TouchableOpacity>
        <ScrollView
          style={styles.questionScrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.questionView}>
          {this.renderQuestions()}
          </View>
         
        </ScrollView>
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
              style={styles.modalKeyboardAvoidingView}
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
                    ARE YOU SURE YOU WANT TO DELETE THIS QUESTION?{" "}
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
                      onPress={() => this.deleteQuestion()}
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
    marginTop: "0%",
    marginBottom: percentToSize(windowSize, 9), //60,
    fontSize: percentToSize(windowSize, 6), //40,
  },
  questionText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: percentToSize(windowSize, 2.5)
  },
  button: {
    width: widthPercentToSize(windowSize, 75),//225,
    marginTop: percentToSize(windowSize, 2),
    backgroundColor: "#ed553b",
    color: "#fff",
    borderRadius: 50,
    padding: percentToSize(windowSize, .75),
    shadowOffset: { width: -5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    alignItems: "center",
    marginBottom:percentToSize(windowSize,4)
  },
  questionView:{
    alignContent:'center',
    marginLeft: widthPercentToSize(windowSize, 12.5),
  },
  questionScrollView:{
    width: widthPercentToSize(windowSize, 100),
    // height:percentToSize(windowSize,100),
    marginBottom:percentToSize(windowSize,3)
  },
  row: {
    flexDirection: "row",
    alignSelf: "center",
  },
  leftAlign: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
  },
  centered: {
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: percentToSize(windowSize, 2.5)
  },
  modalX: {
    fontSize: percentToSize(windowSize, 6),
    alignSelf: "flex-end",
    marginBottom: percentToSize(windowSize, 2),
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
  modalButtons: {
    flexDirection: "row",
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
  modalKeyboardAvoidingView:{
     marginBottom: percentToSize(windowSize, 2.5)
  },
  iosNavIcon: {
    marginTop: percentToSize(windowSize, 2.5),
    alignSelf: "flex-start",
  },
  notIOS:{
    marginTop: percentToSize(windowSize, 2.5),
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParentQuestionComponent);
