import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import * as Font from "expo-font";
import KidsMenuComponent from "./KidsMenuComponent";
import {
  editQuestionKid,
  updateLastAccessed,
  setSelectedKid,
} from "../redux/ActionCreators";
import { percentToSize, widthPercentToSize } from "../shared/sizeUtils";

const mapDispatchToProps = {
  editQuestionKid: (user, kidId, challengeId, questionId, question) =>
    editQuestionKid(user, kidId, challengeId, questionId, question),
  updateLastAccessed: (user, kidId, challengeId, lastAccessed) =>
    updateLastAccessed(user, kidId, challengeId, lastAccessed),
  setSelectedKid: (kid) => setSelectedKid(kid),
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class QuestionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      loading: false,
      questions: [],
      questionIndex: 0,
      lastAnswer: "",
      0: false,
      1: false,
      2: false,
      3: false,
      randomized: false,
      answers: ["", "", "", ""],
      previouslyAnswered: 0,
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
    const unansweredQuestions = this.props.navigation.state.params.category.questions.filter(
      (question) => question.answered !== true
    );
    const previouslyAnswered = this.props.navigation.state.params.category.questions.filter(
      (question) => question.answered === true
    );
    this.setState({
      questions: unansweredQuestions,
      previouslyAnswered: previouslyAnswered.length,
    });
  }

  randomizeQuestions = (array) => {
    let counter = array.length;

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  };

  RenderAnswers = () => {
   
    const getStyle = (position) => {
      if (this.state[position] === true) {
        if (this.state.lastAnswer === "Correct") {
          return styles.answerButtonCorrect;
        } else {
          return styles.answerButtonWrong;
        }
      }
      return styles.answerButton;
    };

    if (!this.state.randomized) {
      const answers = this.randomizeQuestions(
        this.state.questions[this.state.questionIndex].answers
      );
      this.setState({
        answers: answers,
        randomized: true,
      });
    }
    const { answers } = this.state;

    return (
      <View style={styles.answerView}>
        <View>
          <TouchableOpacity
            style={getStyle(0)}
            onPress={() => this.updateCounter(answers[0], 0)}
          >
            <Text style={styles.answerText}>{answers[0].answer}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={getStyle(1)}
            onPress={() => this.updateCounter(answers[1], 1)}
          >
            <Text style={styles.answerText}>{answers[1].answer}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={getStyle(2)}
            onPress={() => this.updateCounter(answers[2], 2)}
          >
            <Text style={styles.answerText}>{answers[2].answer}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={getStyle(3)}
            onPress={() => this.updateCounter(answers[3], 3)}
          >
            <Text style={styles.answerText}>{answers[3].answer}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  RenderQuestions = () => {
    const question = this.state.questions[this.state.questionIndex];
    if (question) {
      return (
        <View>
          <View style={styles.qRemaining}>
            <Text style={styles.qRemainingText}>{`${
                this.state.questionIndex  + this.state.previouslyAnswered
                }/${
                this.props.navigation.state.params.category.questions.length
                }`}
            </Text>
          </View>
          <View style={styles.questionView}>
            <Text style={styles.question}>{question.question}</Text>
          </View>
          <View style={styles.questionMarkView}>
            <Text style={styles.questionMarkText}>?</Text>
          </View>
          <View>{this.RenderAnswers()}</View>
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.question}>ALL FINISHED !</Text>
        <View></View>
      </View>
    );
  };

  updateCounter = (answer, position) => {
    if (answer.isCorrect) {
      this.setState({
        lastAnswer: "Correct",
        [position]: true,
      });
    } else {
      this.setState({
        lastAnswer: "Wrong",
        [position]: true,
      });
    }

    setTimeout(() => {
      if (this.state.questionIndex + 1 < this.state.questions.length) {
        const answers = this.randomizeQuestions(
          this.state.questions[this.state.questionIndex + 1].answers
        );
        this.setState({
          lastAnswer: "",
          0: false,
          1: false,
          2: false,
          3: false,
          questionIndex: (this.state.questionIndex += 1),
          answers: answers,
        });
      } else {
        this.setState({
          lastAnswer: "",
          0: false,
          1: false,
          2: false,
          3: false,
          questionIndex: (this.state.questionIndex += 1),
        });
      }

      this.props.editQuestionKid(
        this.props.user,
        this.props.user.selectedKid._id,
        this.props.navigation.state.params.category._id,
        this.state.questions[this.state.questionIndex - 1]._id,
        { answered: true, answeredCorrect: answer.isCorrect }
      );

      this.props.updateLastAccessed(
        this.props.user,
        this.props.user.selectedKid._id,
        this.props.navigation.state.params.category._id,
        { lastAccessed: Date.now() }
      );
      const kid = this.props.user.kids.filter(
        (kid) => kid._id === this.props.user.selectedKid._id
      )[0];

      this.props.setSelectedKid(kid);
    }, 2000);
  };

  render() {
    if (!this.state.fontsLoaded || this.props.user.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ed553b" />
        </View>
      );
    }

    if (this.props.navigation.state.params.category.questions.length < 1) {
      return (
        <View style={styles.main}>
          <Text style={styles.noQuestions}>
            NO QUESTIONS AVAILABLE TELL YOUR PARENTS TO GET TO WORK!
          </Text>
          <View style={styles.menu}>
            <KidsMenuComponent
              navProfile={() => this.props.navigation.navigate("Profile")}
              challenge={() => this.props.navigation.navigate("KidsChallenge")}
              progress={() => this.props.navigation.navigate("Progress")}
              badges={() => this.props.navigation.navigate("Badges")}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.main}>
        <View>
          <Text style={styles.title}>WONDER + LEARN</Text>
          <Text style={styles.categoryTitle}>
            {this.props.navigation.state.params.category.name.toUpperCase()}
          </Text>
        </View>

        {this.state.questionIndex <
          this.props.navigation.state.params.category.questions.length &&
        this.state.questions.length > 0 ? (
          this.RenderQuestions()
        ) : (
          <Text>FINISHED</Text>
        )}
        <View style={styles.menu}>
          <KidsMenuComponent
            navProfile={() => this.props.navigation.navigate("Profile")}
            challenge={() => this.props.navigation.navigate("KidsChallenge")}
            progress={() => this.props.navigation.navigate("Progress")}
            badges={() => this.props.navigation.navigate("Badges")}
          />
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
    marginTop: "5%",
    marginBottom: percentToSize(windowSize, 1.75),//10,
    fontSize: percentToSize(windowSize, 6),
  },
  categoryTitle: {
    fontFamily: "Dosis",
    color: "#fff",
    marginBottom: percentToSize(windowSize, 1.75),//10,
    fontSize: percentToSize(windowSize, 6),
    textAlign: "center",
  },
  noQuestions: {
    fontFamily: "Dosis",
    color: "#ed553b",
    margin: percentToSize(windowSize, 3),//20,
    marginTop: "40%",
    marginBottom: percentToSize(windowSize, 9),
    fontSize: percentToSize(windowSize, 6),
  },
  question: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: percentToSize(windowSize, 6),
    textAlign: "center",
  },
  answerView: {
    alignSelf: "center",
  },
  answerButton: {
    width: widthPercentToSize(windowSize,85),//305, 
    marginTop: percentToSize(windowSize, 2.3),//15,
    color: "#fff",
    borderColor: "#2dbaaa",
    borderWidth: 2,
    borderRadius: 10,
    padding: percentToSize(windowSize, .75),
    alignItems: "center",
  },
  answerButtonCorrect: {
    width: widthPercentToSize(windowSize,85),
    marginTop: percentToSize(windowSize, 2.3),
    backgroundColor: "green",
    color: "#fff",
    borderColor: "#2dbaaa",
    borderWidth: 2,
    borderRadius: 10,
    padding: percentToSize(windowSize, .75),
    alignItems: "center",
  },
  answerButtonWrong: {
    width: widthPercentToSize(windowSize,85),
    marginTop: percentToSize(windowSize, 2.3),
    backgroundColor: "#ed553b",
    color: "#fff",
    borderColor: "#2dbaaa",
    borderWidth: 2,
    borderRadius: 10,
    padding: percentToSize(windowSize, .75),
    alignItems: "center",
  },
  answerText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: percentToSize(windowSize, 3.5),//24,
  },
  questionView: {
    backgroundColor: "#2dbaaa",
    height: "30%",
    width: widthPercentToSize(windowSize,88),//330,
    justifyContent: "center",
    borderRadius: 20,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.3,
  },
  qRemaining: {
    alignSelf: "center",
    justifyContent:'center',
    marginBottom: percentToSize(windowSize, -2),//-15,
    height:'6%',
    zIndex: 1,
    paddingHorizontal: percentToSize(windowSize, 3),//20,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  qRemainingText: {
    textAlign: "center",
    fontFamily: "Dosis",
    fontSize: percentToSize(windowSize, 3),
  },
  questionMarkView: {
    alignSelf: "center",
    height:'6%',
    marginTop: percentToSize(windowSize, -2.5),
    zIndex: 1,
    paddingHorizontal: percentToSize(windowSize, 1.5),//10,
    backgroundColor: "#fff",
    borderRadius: 90,
  },
  questionMarkText: {
    textAlign: "center",
    fontFamily: "Dosis",
    fontSize: percentToSize(windowSize, 3),
  },
  menu: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionComponent);
