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
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { signUp, logIn, logInFailed } from "../redux/ActionCreators";
import KidsMenuComponent from "./KidsMenuComponent";
import MedalIcon from "../assets/MedalIcon.png";
import Lock_Icon from "../assets/Lock_Icon.png";
import { connect } from "react-redux";
import * as Font from "expo-font";

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
    if (!this.state.fontsLoaded) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }
    const { navigate } = this.props.navigation 
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
        <Text style={styles.subTitle}>BADGES EARNED</Text>
        <ScrollView>{this.renderBadges()}</ScrollView>

        {/* <Image style={styles.lockImage} source={Lock_Icon}/> */}
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
    marginTop: "10%",
    fontSize: 40,
  },
  subTitle: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: 10,
    marginBottom: 60,
    fontSize: 24,
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
    marginTop:5,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },
  badgeContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  badge: {
    flexBasis: "33.3%",
    marginTop: 23,
  },
  lockImage: {
    height: 80,
    width: 80,
    marginLeft: 22,
  },
  medalImage: {
    height: 100,
    width: 80,
    marginLeft: 22,
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KidsBadgesComponent);
