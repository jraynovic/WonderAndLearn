import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from "react-native";
import KidsMenuComponent from "./KidsMenuComponent";
import { connect } from "react-redux";
import * as Font from "expo-font";
import RingProgress from "./RingProgressComponent";
import HistoryIcon from "../assets/HistoryIcon.png";
import MathIcon from "../assets/MathIcon.png";
import ReadingIcon from "../assets/ReadingIcon.png";
import ScienceIcon from "../assets/ScienceIcon.png";
import { percentToSize, widthPercentToSize } from "../shared/sizeUtils";

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
          <View style={styles.imageView}>{this.renderIcon(category.image)}</View>
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
      return <Image resizeMode='contain' style={styles.image} source={HistoryIcon} />;
    } else if (image === "../assets/MathIcon.png") {
      return <Image resizeMode='contain' style={styles.image} source={MathIcon} />;
    } else if (image === "../assets/ScienceIcon.png") {
      return <Image resizeMode='contain' style={styles.image} source={ScienceIcon} />;
    } else if (image === "../assets/ReadingIcon.png") {
      return <Image resizeMode='contain' style={styles.image} source={ReadingIcon} />;
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
        <View id={category._id} style={styles.pointBarView}>
          <View style={styles.pointBar}>
            <View
              style={
                height === 0
                  ? {
                      height: height,
                      width: percentToSize(windowSize, 3.5),
                      backgroundColor: "#ed553b",
                      borderRadius: 50,
                    }
                  : {
                      height: percentToSize(windowSize, 18/100*height),//height + 20,
                      width: percentToSize(windowSize, 3.5),
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
    if (!this.state.fontsLoaded || this.props.user.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ed553b" />
        </View>
      );
    }

    return (
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>WONDER + LEARN</Text>
          <Text style={styles.subTitle}>PROGRESS</Text>
          <View style={styles.progressCardView}>
            <ScrollView
              style={styles.progressCards}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            >
              {this.renderProgressCards()}
            </ScrollView>
          </View>

          <Text style={styles.subTitle}>POINTS EARNED</Text>
          <View style={styles.pointsView}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.pointsScrollView}
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

const windowSize = Dimensions.get("window");
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#f6d55c",
    height: "100%",
    width: "100%",
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
    textAlign: "center",
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: "10%",
    fontSize: percentToSize(windowSize, 6),
  },
  subTitle: {
    textAlign: "center",
    fontFamily: "Dosis",
    color: "#ed553b",
    marginBottom: percentToSize(windowSize, 2),
    marginTop: percentToSize(windowSize, 2),
    fontSize: percentToSize(windowSize, 3.5),
  },
  progressCards: {
    marginLeft: percentToSize(windowSize, 1.75),
  },
  progressCardView: {
    height: percentToSize(windowSize, 32),//210,
  },
  progressCard: {
    backgroundColor: "#fce9a2",
    height: "100%",
    width: widthPercentToSize(windowSize,40),//150,
    marginRight: percentToSize(windowSize, 1),
    borderRadius: 15,
    alignItems: "center",
  },
  cardTitle: {
    textAlign: "center",
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: percentToSize(windowSize, 3.5),//24,
    marginTop: percentToSize(windowSize, 1),
  },
  image: {
    marginTop: percentToSize(windowSize, .75),
    height: percentToSize(windowSize, 10),//55,
  },
  progressRing: {
    marginTop: percentToSize(windowSize, .75),
  },
  points: {
    
    flexDirection: "row",
    marginLeft: percentToSize(windowSize, 6),
  },
  pointsView: {
    height: percentToSize(windowSize, 24),//200,
  },
  pointsScrollView: {
    width: "100%",
  },
  pointBarView:{
    alignItems:'center',
    width: widthPercentToSize(windowSize,30),//100,
    marginRight:percentToSize(windowSize, .5)
  },
  pointBar: {
    width: percentToSize(windowSize, 3.5),//25,
    backgroundColor: "#fce9a2",
    height: percentToSize(windowSize, 18),//120,
    borderRadius: 50,
    justifyContent: "flex-end",
    //marginRight: percentToSize(windowSize, 12),
  },
  pointTitle: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: percentToSize(windowSize, 1.8),//12,
    textAlign:'center'
  },
  menu: {
    marginTop: percentToSize(windowSize, .75),
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },
});
export default connect(mapStateToProps)(KidsProgressComponent);
