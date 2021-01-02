import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { signUp, logIn, logInFailed } from "../redux/ActionCreators";
import KidsMenuComponent from "./KidsMenuComponent";
import { connect } from "react-redux";
import * as Font from "expo-font";
import RingProgress from "./RingProgressComponent";
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

class KidsProgressComponent extends Component {
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

  renderProgressCards = () => {
    return this.props.user.selectedKid.categories.map((category) => {
      return (
        <View id={category._id} style={styles.progressCard}>
          <Text style={styles.cardTitle}>{category.name}</Text>
          <View>{this.renderIcon(category.image)}</View>
          <View style={styles.progressRing}>
            <RingProgress
              text={`${parseInt(this.calculatePercent(category.questions))}%`}
              textFontSize={14}
              textFontColor="#ed553b"
              progressRingWidth={7}
              bgRingWidth={7}
              percent={this.calculatePercent(category.questions)}
              ringColor="#ed553b"
              ringBgColor="#f5d047"
              radius={45}
            />
          </View>
        </View>
      );
    });
  };

  renderIcon = (image) => {
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

  calculatePercent = (questions) => {
    const totalQuestions = questions.length;
    const questionsAnswered = questions.filter((question) => question.answered)
      .length;
    if (totalQuestions === 0 || questionsAnswered === 0) {
      return 0;
    }
    const percent = (questionsAnswered / totalQuestions) * 100;
    return percent;
  };

  renderPointsEarned = () => {
    return this.props.user.selectedKid.categories.map((category) => {
      const height = this.calculatePercent(category.questions);

      const totalAnswered = category.questions.filter(
        (question) => question.answered
      ).length;
      const totalQuestions = category.questions.length;
      return (
        <View id={category._id}>
          <View style={styles.pointBar}>
            <View
              style={
                height === 0
                  ? {
                      height: height,
                      width: 25,
                      backgroundColor: "#ed553b",
                      borderRadius: 50,
                    }
                  : {
                      height: height + 20,
                      width: 25,
                      backgroundColor: "#ed553b",
                      borderRadius: 50,
                    }
              }
            ></View>
          </View>
          <Text
            style={styles.pointTitle}
          >{`${category.name}\n ${totalAnswered}/${totalQuestions}`}</Text>
        </View>
      );
    });
  };
  render() {
    if (!this.state.fontsLoaded) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }
    // const { navigate } = this.props.navigation;
    if (this.props.user.loading) {
      return (
        <View style={styles.main}>
          <ActivityIndicator size="large" color="#ed553b" />
        </View>
      );
    }
    return (
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <Text style={styles.title}>WONDER + LEARN</Text>
          <Text style={styles.subTitle}>PROGRESS</Text>
          <View style={{ height: 210}}>
            <ScrollView
              style={styles.progressCards}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal:10}}
        
            >
              {this.renderProgressCards()}
            </ScrollView>
          </View>

          <Text style={styles.subTitle}>POINTS EARNED</Text>
          <View style={{ flex: 1, height: 200 }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: "100%" }}
              
            >
              <View style={styles.points}>{this.renderPointsEarned()}</View>
            </ScrollView>
          </View>
        </ScrollView>
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
    justifyContent: "flex-start",
  },
  title: {
    textAlign: "center",
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: "10%",
    fontSize: 40,
  },
  subTitle: {
    textAlign: "center",
    fontFamily: "Dosis",
    color: "#ed553b",
    marginBottom: 10,
    marginTop: 10,
    fontSize: 30,
  },
  progressCards: {
    marginLeft: 10,
  
  },
  progressCard: {
    backgroundColor: "#fce9a2",
    height: "100%",
    width: 150,
    marginRight: 8,
    borderRadius: 15,
    alignItems: "center",
  },
  cardTitle: {
    textAlign: "center",
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: 24,
    marginTop: 5,
  },
  image: {
    marginTop: 5,
    height: 55,
    width: 45,
    resizeMode: "contain",
  },
  progressRing: {
    marginTop: 5,
  },
  points: {
    height: 100,
    flexDirection: "row",
    marginLeft: 40,
  },
  pointBar: {
    width: 25,
    backgroundColor: "#fce9a2",
    height: 120,
    borderRadius: 50,
    justifyContent: "flex-end",
    marginRight: 40,
  },
  pointTitle: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: 12,
    textAlign: "left",
  },
  menu: {
    marginTop: 5,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KidsProgressComponent);
