import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { signUp, logIn, logInFailed } from "../redux/ActionCreators";
import { connect } from "react-redux";
import CheckboxChecked from "../assets/CheckboxChecked.png";
import Checkbox from "../assets/Checkbox.png";
import * as SecureStore from "expo-secure-store";
import * as Font from "expo-font";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const mapDispatchToProps = {
  // signUp:(user)=> signUp(user),
  logIn: (user) => logIn(user),
  logInFailed: (err) => logInFailed(err),
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

class LogInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fontsLoaded: false,
      loading: false,
      remember: false,
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
    SecureStore.getItemAsync("userinfo").then((userdata) => {
      const userinfo = JSON.parse(userdata);
      if (userinfo) {
        this.setState({ email: userinfo.email });
        this.setState({ password: userinfo.password });
        this.setState({ remember: true });
      }
    });
  }

  logIn = () => {
    if (this.state.remember) {
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      ).catch((error) => console.log("Could not save user info", error));
    } else {
      SecureStore.deleteItemAsync("userinfo").catch((error) =>
        console.log("Could not delete user info", error)
      );
    }

    const user = {
      username: this.state.email,
      password: this.state.password,
      email: this.state.email,
    };
    this.props.logIn(JSON.stringify(user)).then(() => {
      if (this.props.user.token) {
        this.props.navigation.navigate("Profile");
      } else {
        this.props.logInFailed("SIGN IN FAILED");
      }
    });
  };

  renderCheckBox = () => {
    if (this.state.remember) {
      return <Image style={styles.image} source={CheckboxChecked} />;
    } else {
      return <Image style={styles.image} source={Checkbox} />;
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
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.main}
        scrollEnabled={true}
      >
        <Text style={styles.title}>LOG IN</Text>
        <View style={styles.fieldBackground}>
          <TextInput
            placeholder="EMAIL"
            placeholderTextColor="#ed553b"
            style={styles.fields}
            value={this.state.email}
            onChangeText={(e) => this.setState({ email: e })}
          />
        </View>
        <View style={styles.fieldBackground}>
          <TextInput
            secureTextEntry
            placeholder="PASSWORD"
            placeholderTextColor="#ed553b"
            style={styles.fields}
            value={this.state.password}
            onChangeText={(e) => this.setState({ password: e })}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.setState({ remember: !this.state.remember })}
          style={styles.rememberRow}
        >
          {this.renderCheckBox()}
          <Text style={styles.rememberText}>REMEMBER ME?</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={styles.logInButton}
            onPress={() => this.logIn()}
          >
            <Text style={styles.logInButtonText}>
              {"     "}LOG IN{"     "}
            </Text>
          </TouchableOpacity>
        </View>
        {this.props.user.errMess ? (
          <View>
            <Text style={styles.errMess}>Login Failed</Text>
          </View>
        ) : (
          <View></View>
        )}
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text style={styles.footer}>NO ACCOUNT YET? SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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
    marginTop: "25%",
    marginBottom: 60,
    fontSize: 40,
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
  rememberRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    marginLeft: -60,
  },
  rememberText: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: 16,
    marginRight: 5,
  },
  image: {
    marginRight: 10,
    height: 25,
    width: 25,
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
