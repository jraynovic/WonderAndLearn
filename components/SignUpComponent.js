import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { signUp } from "../redux/ActionCreators";
import { connect } from "react-redux";
import * as Font from "expo-font";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { percentToSize, widthPercentToSize } from "../shared/sizeUtils";

const mapDispatchToProps = {
  signUp: (user) => signUp(user),
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    parent: state.parent,
  };
};

class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      emailValidation: "",
      firstname: "",
      firstnameValidation: "",
      lastname: "",
      lastnameValidation: "",
      pin: "",
      pinValidation: "",
      password: "",
      confirmedPassword: "",
      passwordValidation: "",
      valdationError: true,
      fontsLoaded: false,
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

  clearErrors = () => {
    this.setState({ validateError: [] }, () => {
      this.validateUser();
    });
  };

  submitNewUser = () => {
    if (this.state.valdationError) {
      alert("PLEASE COMPLETE FIELDS CORRECTLY");
    } else {
      this.setState({ username: this.state.email });
      const newUser = {
        username: this.state.email,
        email: this.state.email,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        pin: this.state.pin,
      };
      this.props
        .signUp(JSON.stringify(newUser))
        .then(this.props.navigation.navigate("Profile"));
    }
  };

  validateInput = (input) => {
    const emailValidator = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    const pinValidator = (pin) => {
      const re = /^\d{4}$/;
      return re.test(pin);
    };

    if (input === "firstname") {
      if (this.state.firstname.length < 3 || this.state.firstname.length > 10) {
        this.setState({
          firstnameValidation:
            "*FIRST NAME MUST BE BETWEEN\n 3 AND 10 CHARACTERS",
        });
      } else {
        this.setState({ firstnameValidation: "" });
      }
    }

    if (input === "lastname") {
      if (this.state.lastname.length < 3 || this.state.lastname.length > 12) {
        this.setState({
          lastnameValidation:
            "*LAST NAME MUST BE BETWEEN\n 3 AND 12 CHARACTERS",
        });
      } else {
        this.setState({ lastnameValidation: "" });
      }
    }
    if (input === "email") {
      if (emailValidator(this.state.email)) {
        this.setState({ emailValidation: "" });
      } else {
        this.setState({ emailValidation: "*PLEASE ENTER VALID EMAIL" });
      }
    }
    if (input === "pin") {
      if (pinValidator(this.state.pin)) {
        this.setState({ pinValidation: "" });
      } else {
        this.setState({ pinValidation: "*PIN MUST BE 4 DIGITS" });
      }
    }
    if (input === "password") {
      if (this.state.password === this.state.confirmedPassword) {
        this.setState({ passwordValidation: "" });
      } else {
        this.setState({ passwordValidation: "*PASSWORDS MUST MATCH" });
      }
    }
    if (
      this.state.firstnameValidation ||
      this.state.firstname.length < 1 ||
      this.state.lastnameValidation ||
      this.state.lastname.length < 1 ||
      this.state.emailValidation ||
      this.state.email.length < 1 ||
      this.state.pinValidation ||
      this.state.pin.length < 1 ||
      this.state.passwordValidation ||
      this.state.confirmedPassword.length < 1
    ) {
      this.setState({ valdationError: true });
    } else {
      this.setState({ valdationError: false });
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
      <ScrollView style={styles.mainScrollView}>
        <KeyboardAwareScrollView
          style={styles.main}
          style={{ backgroundColor: "#f6d55c" }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.main}
          enableOnAndroid={true}
        >
          <Text style={styles.title}>SIGN UP</Text>
          <Text>{JSON.stringify(this.props.parent)}</Text>
          <View>
            <View
              style={
                this.state.firstnameValidation
                  ? styles.fieldBackgroundError
                  : styles.fieldBackground
              }
            >
              <TextInput
                placeholder="FIRST NAME"
                placeholderTextColor="#ed553b"
                style={styles.fields}
                onChangeText={(e) => this.setState({ firstname: e })}
                onBlur={() => this.validateInput("firstname")}
              />
            </View>
            {this.state.firstnameValidation ? (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>
                  {this.state.firstnameValidation}
                </Text>
              </View>
            ) : null}
            <View
              style={
                this.state.lastnameValidation
                  ? styles.fieldBackgroundError
                  : styles.fieldBackground
              }
            >
              <TextInput
                placeholder="LAST NAME"
                placeholderTextColor="#ed553b"
                style={styles.fields}
                onChangeText={(e) => this.setState({ lastname: e })}
                onBlur={() => this.validateInput("lastname")}
              />
            </View>
            {this.state.lastnameValidation ? (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>
                  {this.state.lastnameValidation}
                </Text>
              </View>
            ) : null}

            <View
              style={
                this.state.emailValidation
                  ? styles.fieldBackgroundError
                  : styles.fieldBackground
              }
            >
              <TextInput
                placeholder="EMAIL"
                placeholderTextColor="#ed553b"
                style={styles.fields}
                onChangeText={(e) => this.setState({ email: e })}
                onBlur={() => this.validateInput("email")}
              />
            </View>
            {this.state.emailValidation ? (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>
                  {this.state.emailValidation}
                </Text>
              </View>
            ) : null}
            <View
              style={
                this.state.pinValidation
                  ? styles.fieldBackgroundError
                  : styles.fieldBackground
              }
            >
              <TextInput
                placeholder="4 DIGIT PIN"
                placeholderTextColor="#ed553b"
                style={styles.fields}
                onChangeText={(e) => this.setState({ pin: e })}
                onBlur={() => this.validateInput("pin")}
              />
            </View>
            {this.state.pinValidation ? (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{this.state.pinValidation}</Text>
              </View>
            ) : null}
            <View style={styles.fieldBackground}>
              <TextInput
                secureTextEntry
                placeholder="PASSWORD"
                placeholderTextColor="#ed553b"
                style={styles.fields}
                onChangeText={(e) => this.setState({ password: e })}
              />
            </View>
            <View
              style={
                this.state.passwordValidation
                  ? styles.fieldBackgroundError
                  : styles.fieldBackground
              }
            >
              <TextInput
                secureTextEntry
                placeholder="CONFIRM PASSWORD"
                placeholderTextColor="#ed553b"
                style={styles.fields}
                onChangeText={(e) => this.setState({ confirmedPassword: e })}
                onBlur={() => this.validateInput("password")}
              />
            </View>
            {this.state.passwordValidation ? (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>
                  {this.state.passwordValidation}
                </Text>
              </View>
            ) : null}
            {this.props.user.loading ? (
              <View style={{ marginTop: 10 }}>
                <ActivityIndicator size="large" color="#ed553b" />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.createButton}
                onPress={() => this.submitNewUser()}
              >
                <Text style={styles.createButtonText}>
                  {"     "}CREATE ACCOUNT{"     "}
                </Text>
              </TouchableOpacity>
            )}
            <View>
              <Text style={styles.validate}>
                {this.props.user.errMess
                  ? "*VERIFY FIELDS ARE CORRECTLY FILLED"
                  : ""}
              </Text>
            </View>
          </View>
          <View>
              <TouchableOpacity 
                onPress={() => this.props.navigation.navigate("LogIn")}
              >
                <Text style={styles.footer}>ALREADY HAVE AN ACCOUNT?</Text>
              </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  }
}

const windowSize = Dimensions.get("window");
const styles = StyleSheet.create({
  mainScrollView: {
    height: "100%",
    backgroundColor: "#f6d55c",
  },
  main: {
    backgroundColor: "#f6d55c",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
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
    marginBottom: "10%",
    fontSize: percentToSize(windowSize, 6),
  },
  fieldBackground: {
    marginTop: "4%",
    backgroundColor: "rgba(255, 255, 255, 0.51)",
    opacity: 1,
    width:percentToSize(windowSize, 35),
    borderWidth: percentToSize(windowSize, 0.15),
    borderColor: "rgba(255, 255, 255, 0.51)",
    borderRadius: 50,
    color: "red",
  },
  fieldBackgroundError: {
    marginTop: "4%",
    backgroundColor: "rgba(255, 255, 255, 0.51)",
    opacity: 1,
    borderWidth: percentToSize(windowSize, 0.15),
    borderColor: "#ed553b",
    borderRadius: 50,
    color: "red",
  },
  fields: {
    padding: percentToSize(windowSize, 0.6),
    opacity: 1,
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: percentToSize(windowSize, 2.4),
    marginLeft: "5%",
  },
  createButton: {
    marginTop: "8%",
    backgroundColor: "#ed553b",
    color: "#fff",
    borderRadius: 50,
    padding: percentToSize(windowSize, 0.8),
    shadowOffset: { width: -5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    alignItems: "center",
  },
  createButtonText: {
    fontFamily: "Dosis",
    color: "#fff",
    fontSize: percentToSize(windowSize, 2.4),
  },
  errorText: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: percentToSize(windowSize, 1.6),
  },
  errorView: {
    alignSelf: "center",
    textAlign: "center",
  },
  footer: {
    fontFamily: "Dosis",
    color: "#ed553b",
    fontSize: percentToSize(windowSize,2.4), 
    marginTop:'25%'
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
