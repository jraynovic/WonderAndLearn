import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { deleteQuestionKid } from "../redux/ActionCreators";
import { connect } from "react-redux";
import * as Font from "expo-font";
import { Icon } from "react-native-elements";

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
            style={styles.question}
            onLongPress={() => this.stageDeletion(question)}
            key={question._id}
          >
            <View style={styles.row}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.leftAlign}>
                  <Text style={styles.questionText}>{`${numPlace}.)`}</Text>
                </View>
                <View style={styles.centered}>
                  <Text
                    style={styles.questionText}
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
            style={{ marginTop: 15, alignSelf: "right" }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="chevron-left" size="50" color="#ed553b" />
          </TouchableOpacity>
        ) : (
          <View style={{ marginTop: 30 }} />
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
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {this.renderQuestions()}
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
                    ARE YOU SURE YOU WANT TO DELETE THIS QUESTION?{" "}
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

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#f6d55c",
    flex: 1,
    alignItems: "center",
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
  },
  questionText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: 16,
  },
  button: {
    width: 225,
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
  question: {
    marginLeft: 4,
    width: 290,
    marginTop: 40,
    backgroundColor: "#ed553b",
    color: "#fff",
    borderRadius: 50,
    padding: 5,
    shadowOffset: { width: -2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flex: 1,
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
    fontSize: 16,
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
  },
  modalView: {
    marginHorizontal: 30,
    marginTop: 140,
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
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParentQuestionComponent);
