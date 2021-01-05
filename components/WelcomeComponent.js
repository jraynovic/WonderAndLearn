import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import * as Font from "expo-font";
import Learning from "../assets/Learning.png";
import {percentToSize, widthPercentToSize} from '../shared/sizeUtils'


const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class WelcomeComponent extends Component {
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

  render() {
    if (!this.state.fontsLoaded || this.props.user.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ed553b" />
        </View>
      );
    }

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

        <View>
          <Image source={Learning} style={styles.image} />
        </View>
        <View>
          <TouchableOpacity
            style={styles.logInButton}
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text style={styles.logInButtonText}>
              {"     "}SIGN UP{"     "}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.logInButton}
            onPress={() => this.props.navigation.navigate("LogIn")}
          >
            <Text style={styles.logInButtonText}>
              {"     "}LOG IN{"     "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const windowSize = Dimensions.get('window')
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#f6d55c",
    height:'100%',
    width:'100%',
    alignItems: "center",
    justifyContent: "flex-start",
  },
  loading: {
    backgroundColor: "#f6d55c",
    height:'100%',
    width:'100%',
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: "15%",
    marginBottom: '10%',
    fontSize: percentToSize(windowSize,6.5),
  },
  image: {
    height: percentToSize(windowSize,45),
    resizeMode:'contain'
  }, 
  logInButton: {
    width:  widthPercentToSize(windowSize,70),
    marginTop: '10%', 
    backgroundColor: "#ed553b",
    color: "#fff",
    borderRadius: 50,
    padding: '2%',
    shadowOffset: { width: -5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    alignItems: "center",
  },
  logInButtonText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: percentToSize(windowSize,2.5),
  },
});
export default connect(mapStateToProps)(WelcomeComponent);
