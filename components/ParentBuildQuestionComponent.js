import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { addNewQuestionKid } from "../redux/ActionCreators";
import { connect } from "react-redux";
import * as Font from "expo-font";
import { Icon } from "react-native-elements";

const mapDispatchToProps = {
  addNewQuestionKid: (userId, kidId, challengeId, question, token) =>
    addNewQuestionKid(userId, kidId, challengeId, question, token),
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class ParentBuildQuestionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      loading: false,
      question: "",
      correctAnswer: "",
      wrongAnswerOne: "",
      wrongAnswerTwo: "",
      wrongAnswerThree: "",
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
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  handleNewQuestion = () => {
    const newQuestion = {
      question: this.state.question,
      answers: [
        { answer: this.state.correctAnswer, isCorrect: true },
        { answer: this.state.wrongAnswerOne, isCorrect: false },
        { answer: this.state.wrongAnswerTwo, isCorrect: false },
        { answer: this.state.wrongAnswerThree, isCorrect: false },
      ],
    };
    this.props.addNewQuestionKid(
      this.props.user.id,
      this.props.user.selectedKid._id,
      this.props.navigation.state.params.category._id,
      newQuestion,
      this.props.user
    );
    this.props.navigation.goBack();
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
        <ScrollView>
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
          <Text style={styles.title}>
            {this.props.navigation.state.params.category.name.toUpperCase()}
          </Text>
          <KeyboardAvoidingView
            style={styles.questionView}
            behavior="padding"
            keyboardVerticalOffset="0"
          >
            <View style={styles.textBoxTitle}>
              <Text style={styles.whiteText}>QUESTION</Text>
              <View>
                <View style={styles.fieldBackground}>
                  <TextInput
                    placeholder="QUESTION"
                    placeholderTextColor="#fff"
                    style={styles.fields}
                    onChangeText={(e) => this.setState({ question: e })}
                  />
                </View>
              </View>
            </View>
            <View style={styles.textBoxTitle}>
              <Text style={styles.whiteText}>ANSWERS</Text>
              <View>
                <View style={styles.greenFieldBackground}>
                  <TextInput
                    placeholder="CORRECT ANSWER"
                    placeholderTextColor="#fff"
                    style={styles.fields}
                    onChangeText={(e) => this.setState({ correctAnswer: e })}
                  />
                </View>
                <View style={styles.fieldBackground}>
                  <TextInput
                    placeholder="WRONG ANSWER"
                    placeholderTextColor="#fff"
                    style={styles.fields}
                    onChangeText={(e) => this.setState({ wrongAnswerOne: e })}
                  />
                </View>
                <View style={styles.fieldBackground}>
                  <TextInput
                    placeholder="WRONG ANSWER"
                    placeholderTextColor="#fff"
                    style={styles.fields}
                    onChangeText={(e) => this.setState({ wrongAnswerTwo: e })}
                  />
                </View>
                <View style={styles.fieldBackground}>
                  <TextInput
                    placeholder="WRONG ANSWER"
                    placeholderTextColor="#fff"
                    style={styles.fields}
                    onChangeText={(e) => this.setState({ wrongAnswerThree: e })}
                  />
                </View>
              </View>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => this.handleNewQuestion()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
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
  title: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: "0%",
    marginBottom: 60,
    fontSize: 40,
    textAlign: "center",
  },
  questionView:{ 
    flex: 1, 
    marginBottom: 10
  },
  textBoxTitle: {
    justifyContent: "flex-start",
    marginLeft: 50,
    marginTop: 10,
  },
  whiteText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: 24,
  },
  errMess: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: 10,
    fontSize: 24,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  fieldBackground: {
    width: "80%",
    marginTop: 15,
    backgroundColor: "#ed553b",
    opacity: 1,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.51)",
    borderRadius: 50,
    color: "red",
  },
  greenFieldBackground: {
    width: "80%",
    marginTop: 15,
    backgroundColor: "green",
    opacity: 1,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.51)",
    borderRadius: 50,
    color: "red",
  },
  fields: {
    padding: 5,
    opacity: 1,
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    width: "25%",
    marginTop: 40,
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
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(ParentBuildQuestionComponent);
