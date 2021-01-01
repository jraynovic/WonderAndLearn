import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { signUp, logIn, logInFailed } from "../redux/ActionCreators";
import { connect } from "react-redux";
import * as Font from "expo-font";
import Learning from "../assets/Learning.png";
import KidsMenuComponent from "./KidsMenuComponent";
import HistoryIcon from "../assets/HistoryIcon.png";
import MathIcon from "../assets/MathIcon.png";
import ReadingIcon from "../assets/ReadingIcon.png";
import ScienceIcon from "../assets/ScienceIcon.png";

const mapDispatchToProps = {
  signUp: (user) => signUp(user),
  logIn: (user) => logIn(user),
  logInFailed: (err) => logInFailed(err),
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class LogInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      loading: false,
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

  RenderImage = (image) => {
    if (image === "../assets/HistoryIcon.png") {
      return <Image style={styles.image} source={HistoryIcon} />;
    } else if (image === "../assets/MathIcon.png") {
      return <Image style={styles.image} source={MathIcon} />;
    } else if (image === "../assets/ScienceIcon.png") {
      return <Image style={styles.image} source={ScienceIcon} />;
    } else if (image === "../assets/ReadingIcon.png") {
      return <Image style={styles.image} source={ReadingIcon} />;
    } else {
      return <View></View>;
    }
  };

  changeScreen = (screen) => {
    this.props.navigation.navigate(screen);
  };
  renderSmallChallenge = (category) => {
    const answered = category.questions.filter(
      (question) => question.answered === true
    ).length;
    const questionTotal = category.questions.length;
    return (
      <View key={category._id} style={styles.categoryRow}>
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() =>
            this.props.navigation.navigate("Questions", { category: category })
          }
        >
          <View style={styles.categoryView}>
            <View>
              <Text style={styles.categoryText}>{category.name}</Text>
              {answered === questionTotal ? (
                <Text>Check mark</Text>
              ) : (
                <Text
                  style={styles.challengeSubText}
                >{`${answered}/${questionTotal} \nQUESTIONS\nLEFT`}</Text>
              )}
            </View>
            <View>
              {this.RenderImage(category.image)}
              {/* <Image source={Learning} style={styles.image} /> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderChallenges = () => {
    if (this.props.user.selectedKid.categories.length > 0) {
      //Sort categories
      const categories = this.props.user.selectedKid.categories.sort((a, b) =>
        a.lastAccessed < b.lastAccessed ? 1 : -1
      );
      //categories.sort((a, b) => (a.lastAccessed > b.lastAccessed) ? 1 : -1)
      const lastAccessed = categories[0];
      const totalAnswered = lastAccessed.questions.filter(
        (question) => question.answered === true
      ).length;

      const notLast = categories.map((category) => {
        if (category != lastAccessed) {
          return this.renderSmallChallenge(category);
        }
      });

      const firstColumn = [];
      const secondColumn = [];

      categories.map((category, index) => {
        if (category !== lastAccessed) {
          if (index % 2 === 0) {
            secondColumn.push(category);
          } else {
            firstColumn.push(category);
          }
        }
      });

      const renderColumnOne = firstColumn.map((category) => {
        const answered = category.questions.filter(
          (question) => question.answered === true
        ).length;
        const questionTotal = category.questions.length;
        return (
          <View key={category._id} style={styles.categoryRow}>
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() =>
                this.props.navigation.navigate("Questions", {
                  category: category,
                })
              }
            >
              <View style={styles.categoryView}>
                <View>
                  <Text style={styles.categoryText}>{category.name}</Text>
                </View>
                <View>{this.RenderImage(category.image)}</View>
                <View>
                  {answered === questionTotal ? (
                    <Text style={styles.challengeSubTextGreen}>COMPLETED</Text>
                  ) : (
                    <Text
                      style={styles.challengeSubText}
                    >{`${answered}/${questionTotal} \nQUESTIONS\nLEFT`}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      });

      const renderColumnTwo = secondColumn.map((category) => {
        const answered = category.questions.filter(
          (question) => question.answered === true
        ).length;
        const questionTotal = category.questions.length;
        return (
          <View key={category._id} style={styles.categoryRow}>
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() =>
                this.props.navigation.navigate("Questions", {
                  category: category,
                })
              }
            >
              <View style={styles.categoryView}>
                <View>
                  <Text style={styles.categoryText}>{category.name}</Text>
                </View>
                <View>{this.RenderImage(category.image)}</View>
                <View>
                  {answered === questionTotal ? (
                    <Text style={styles.challengeSubTextGreen}>COMPLETED</Text>
                  ) : (
                    <Text
                      style={styles.challengeSubText}
                    >{`${answered}/${questionTotal} \nQUESTIONS\nLEFT`}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      });

      return (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.lastAccessed}
            onPress={() => {
              this.props.navigation.navigate("Questions", {
                category: lastAccessed,
              });
            }}
          >
            <View style={styles.lastAccessedTitleView}>
              <Text style={styles.challengeText}>{lastAccessed.name}</Text>
              {/* <Text>{lastAccessed.lastAccessed}</Text> */}
            </View>
            <View style={styles.lastAccessedImageView}>
              <View style={styles.center}>
                {this.RenderImage(lastAccessed.image)}
                {totalAnswered !== lastAccessed.questions.length ? (
                  <Text
                    style={styles.challengeSubText}
                  >{`${totalAnswered}/${lastAccessed.questions.length} QUESTIONS LEFT`}</Text>
                ) : (
                  <Text style={styles.challengeSubTextGreen}>COMPLETED</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
          {/* <FlatList keyExtractor={item=> item} data={remaining} renderItem={({item})=> <View><Text>{item.name}</Text></View>}/>
                    <FlatList data={notLast} renderItem={({item})=>this.renderSmallChallenge(item)} numColumns={2} /> */}
          <View style={styles.categoryRow}>
            <View>{renderColumnOne}</View>
            <View>{renderColumnTwo}</View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.main}>
          <Text style={styles.title}>NO CHALLENGES AVAILABLE</Text>
        </View>
      );
    }
  };

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }
    const { navigate } = this.props.navigation;
    if (this.props.user.loading) {
      return (
        <View style={styles.main}>
          <ActivityIndicator size="large" color="#ed553b" />
        </View>
      );
    }
    return (
      <View style={styles.main}>
        <Text style={styles.title}>WONDER + LEARN</Text>
        {/* <Text style={styles.title}>{this.props.user.selectedKid.name}</Text> */}
        {this.renderChallenges()}
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
  lastAccessed: {
    backgroundColor: "#fce9a2",
    width: 275,
    height: 105,
    borderRadius: 15,
    flexDirection: "row",
    marginLeft: 12,
  },
  lastAccessedTitleView: {
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 30,
    flex: 1,
  },
  center: {
    alignItems: "center",
  },
  lastAccessedImageView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 7,
    marginRight: 30,
  },
  challengeText: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: 30,
  },
  challengeSubText: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: 12,
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: "contain",
    marginLeft: 0,
  },
  categoryRow: {
    flexDirection: "row",
    height: 130,
    margin: 7,
    justifyContent: "center",
  },
  categoryView: {
    flexDirection: "column",
    alignItems: "center",
  },
  categoryItem: {
    backgroundColor: "#fce9a2",
    height: 130,
    width: 130,
    borderRadius: 15,
    justifyContent: "center",
  },
  categoryText: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: 24,
    marginBottom: 5,
  },
  categorySubText: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: 14,
    marginBottom: 2,
  },
  challengeSubTextGreen: {
    fontFamily: "Dosis",
    color: "#6fc269",
    fontSize: 14,
    marginBottom: 2,
  },
  scrollView: {
    // height:'50%'
  },
  errMess: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: 10,
    fontSize: 24,
  },
  fieldBackground: {
    width: "60%",
    marginTop: 15,
    backgroundColor: "rgba(255, 255, 255, 0.51)",
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
    color: "#ed553b",
    fontSize: 16,
    marginLeft: 10,
  },
  logInButton: {
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
  logInButtonText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: 16,
  },
  menu: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },
  footer: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: 16,
    marginTop: 200,
    marginLeft: 8,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(LogInComponent);
