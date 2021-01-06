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
import rainbow from "../assets/rainbowHills.png";
import cat from "../assets/Cat.png";
import dinosaur from "../assets/Dinosaur.png";
import dog from "../assets/Dog.png";
import KidsMenuComponent from "./KidsMenuComponent";
import { percentToSize, widthPercentToSize } from "../shared/sizeUtils";


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
      return <Image resizeMode='contain' style={styles.image} source={rainbow} />;
    } else if (image === "../assets/Cat.png") {
      return <Image resizeMode='contain' style={styles.image} source={cat} />;
    } else if (image === "../assets/Dinosaur.png") {
      return <Image resizeMode='contain' style={styles.image} source={dinosaur} />;
    } else if (image === "../assets/Dog.png") {
      return <Image resizeMode='contain' style={styles.image} source={dog} />;
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
        <View style={styles.imageView}>
          {this.RenderImage(this.props.user.selectedKid.image)}
        </View>
        
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

const windowSize = Dimensions.get("window");
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#f6d55c",
    height: "100%",
    width: "100%",
    alignItems: "center",
    //justifyContent: "center",
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
    marginBottom: percentToSize(windowSize, 6),
    fontSize: percentToSize(windowSize, 6),
  },
  userName: {
    fontFamily: "Dosis",
    color: "#ed553b",
    marginBottom: percentToSize(windowSize, 1),
    fontSize: percentToSize(windowSize, 6),
  },
  button: {
    width: widthPercentToSize(windowSize, 60),//225,
    marginTop: percentToSize(windowSize, 3),
    backgroundColor: "#ed553b",
    color: "#fff",
    borderRadius: 10,
    padding: percentToSize(windowSize, .75),
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: percentToSize(windowSize, 3.5)//24,
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
    // height: 186,
    // //width: 160,
    height:percentToSize(windowSize, 25),
    width:percentToSize(windowSize, 25),
    marginLeft: 10,
  },
  imageView:{
    height:percentToSize(windowSize, 25),
    width:percentToSize(windowSize, 25)
  }
});
export default connect(mapStateToProps)(KidsHomePageComponent);
