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
import { editQuestionKid } from "../redux/ActionCreators";
import { connect } from "react-redux";
import * as Font from "expo-font";
import { Icon } from "react-native-elements";

const mapDispatchToProps = {
  editQuestionKid: (user, kidId, challengeId, questionId, question) =>
    editQuestionKid(user, kidId, challengeId, questionId, question),
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class ParentEditQuestionComponent extends Component {
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
    this.setState({
      question: this.props.navigation.state.params.question.question,
      correctAnswer: this.props.navigation.state.params.question.answers[0]
        .answer,
      wrongAnswerOne: this.props.navigation.state.params.question.answers[1]
        .answer,
      wrongAnswerTwo: this.props.navigation.state.params.question.answers[2]
        .answer,
      wrongAnswerThree: this.props.navigation.state.params.question.answers[3]
        .answer,
    });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  handleEditQuestion = () => {
    const newQuestion = {
      question: this.state.question,
      answers: [
        { answer: this.state.correctAnswer, isCorrect: true },
        { answer: this.state.wrongAnswerOne, isCorrect: false },
        { answer: this.state.wrongAnswerTwo, isCorrect: false },
        { answer: this.state.wrongAnswerThree, isCorrect: false },
      ],
    };

    this.props.editQuestionKid(
      this.props.user,
      this.props.user.selectedKid._id,
      this.props.navigation.state.params.categoryId,
      this.props.navigation.state.params.question._id,
      newQuestion
    );
    this.props.navigation.goBack();
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
            style={{ marginTop: 15, alignSelf: "right" }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="chevron-left" size="50" color="#ed553b" />
          </TouchableOpacity>
        ) : (
          <View style={{ marginTop: 30 }} />
        )}
        <ScrollView>
          <Text style={styles.title}>
            {this.props.navigation.state.params.category}
          </Text>
          <KeyboardAvoidingView
            style={{ flex: 1, marginBottom: 10 }}
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
                    value={this.state.question}
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
                    value={this.state.correctAnswer}
                    onChangeText={(e) => this.setState({ correctAnswer: e })}
                  />
                </View>
                <View style={styles.fieldBackground}>
                  <TextInput
                    placeholder="WRONG ANSWER"
                    placeholderTextColor="#fff"
                    style={styles.fields}
                    value={this.state.wrongAnswerOne}
                    onChangeText={(e) => this.setState({ wrongAnswerOne: e })}
                  />
                </View>
                <View style={styles.fieldBackground}>
                  <TextInput
                    placeholder="WRONG ANSWER"
                    placeholderTextColor="#fff"
                    style={styles.fields}
                    value={this.state.wrongAnswerTwo}
                    onChangeText={(e) => this.setState({ wrongAnswerTwo: e })}
                  />
                </View>
                <View style={styles.fieldBackground}>
                  <TextInput
                    placeholder="WRONG ANSWER"
                    placeholderTextColor="#fff"
                    style={styles.fields}
                    value={this.state.wrongAnswerThree}
                    onChangeText={(e) => this.setState({ wrongAnswerThree: e })}
                  />
                </View>
              </View>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => this.handleEditQuestion()}
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
    marginTop: "5%",
    marginBottom: 60,
    fontSize: 40,
    textAlign: "center",
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
export default connect(mapStateToProps, mapDispatchToProps)(ParentEditQuestionComponent);
