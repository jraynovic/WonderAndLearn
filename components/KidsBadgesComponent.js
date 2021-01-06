import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import KidsMenuComponent from "./KidsMenuComponent";
import MedalIcon from "../assets/MedalIcon.png";
import Lock_Icon from "../assets/Lock_Icon.png";
import { connect } from "react-redux";
import * as Font from "expo-font";
import { percentToSize, widthPercentToSize } from "../shared/sizeUtils";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class KidsBadgesComponent extends Component {
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

  renderBadges = () => {
    let image = MedalIcon;
    const makeBadges = this.props.user.selectedKid.categories.map(
      (category) => {
        const completed = category.questions.filter(
          (question) => question.answered === false
        );
        if (completed.length !== 0) {
          image = Lock_Icon;
        }
        return (
          <View style={styles.badge}>
            <TouchableOpacity
              onPress={
                image === MedalIcon
                  ? () =>
                      alert(
                        `Awesome you completed ${category.name}! You are awesome!`
                      )
                  : () => alert(`Keep going and finish ${category.name}!`)
              }
            >
              <Image
                resizeMode='contain'
                style={
                  image === Lock_Icon ? styles.lockImage : styles.medalImage
                }
                source={image}
              />
            </TouchableOpacity>
          </View>
        );
      }
    );

    return <View style={styles.badgeContainer}>{makeBadges}</View>;
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
        <Text style={styles.title}>WONDER + LEARN</Text>
        <Text style={styles.subTitle}>BADGES EARNED</Text>
        <ScrollView><View style={styles.scrollContainer}>{this.renderBadges()}</View></ScrollView>
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
    marginTop: "10%",
    fontSize: percentToSize(windowSize, 6),
  },
  subTitle: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: percentToSize(windowSize, 1.75),
    marginBottom: percentToSize(windowSize, 6),
    fontSize: percentToSize(windowSize, 3.5),
  },
  menu: {
    marginTop: percentToSize(windowSize, .75),
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },
  scrollContainer:{
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
  badgeContainer: {
    // width:'100%',
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent:'space-between'
  },
  badge: {
    flexBasis: "33.3%",
    marginTop: percentToSize(windowSize, 3.5),
  },
  lockImage: {
    height: percentToSize(windowSize, 12),//80,
    width: percentToSize(windowSize, 12),//80,
    marginLeft: percentToSize(windowSize, 3.5),
  },
  medalImage: {
    height:percentToSize(windowSize, 12),// 100,
    width: percentToSize(windowSize, 12),
    marginLeft: percentToSize(windowSize, 3.5)//22,
  },
});
export default connect(mapStateToProps)(KidsBadgesComponent);
