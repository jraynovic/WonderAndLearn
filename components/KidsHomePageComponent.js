import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import * as Font from "expo-font";
import rainbow from "../assets/rainbowHills.png";
import cat from "../assets/Cat.png";
import dinosaur from "../assets/Dinosaur.png";
import dog from "../assets/Dog.png";
import KidsMenuComponent from "./KidsMenuComponent";


const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class KidsHomePageComponent extends Component {
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
    if (image === "../assets/rainbowHills.png") {
      return <Image style={styles.image} source={rainbow} />;
    } else if (image === "../assets/Cat.png") {
      return <Image style={styles.image} source={cat} />;
    } else if (image === "../assets/Dinosaur.png") {
      return <Image style={styles.image} source={dinosaur} />;
    } else if (image === "../assets/Dog.png") {
      return <Image style={styles.image} source={dog} />;
    }
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

        {this.RenderImage(this.props.user.selectedKid.image)}
        <Text style={styles.userName}>{this.props.user.selectedKid.name}</Text>
        <View>
          <TouchableOpacity
            style={styles.row}
            onPress={() => this.props.navigation.navigate("KidsChallenge")}
          >
            <View style={styles.button}>
              <View style={styles.row}>
                <Text style={styles.buttonText}>CHALLENGES</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => this.props.navigation.navigate("Progress")}
          >
            <View style={styles.button}>
              <View style={styles.row}>
                <Text style={styles.buttonText}>PROGRESS</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => this.props.navigation.navigate("Badges")}
          >
            <View style={styles.button}>
              <View style={styles.row}>
                <Text style={styles.buttonText}>BADGES</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
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
  loading: {
    backgroundColor: "#f6d55c",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginTop: "10%",
    marginBottom: 40,
    fontSize: 40,
  },
  userName: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginBottom: 10,
    fontSize: 40,
  },
  button: {
    width: 225,
    marginTop: 20,
    backgroundColor: "#ed553b",
    color: "#fff",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  menu: {
    marginTop: 5,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },
  image: {
    height: 186,
    width: 160,
    marginLeft: 10,
  },
});
export default connect(mapStateToProps)(KidsHomePageComponent);
