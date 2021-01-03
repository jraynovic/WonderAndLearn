import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { connect } from "react-redux";
import SignUpComponent from "./SignUpComponent";
import LogInComponent from "./LogInComponent";
import ProfileComponent from "./ProfileComponent";
import WelcomeComponent from "./WelcomeComponent";
import ParentDashboardComponent from "./ParentDashboardComponent";
import ParentQuestionComponent from "./ParentQuestionComponent";
import ParentBuildQuestionComponent from "./ParentBuildQuestionComponent";
import ParentEditQuestionComponent from "./ParentEditQuestionComponent";
import KidsChallengeComponent from "./KidsChallengeComponent";
import ChallengeComponent from "./ChallengeComponent"; //used
import QuestionComponent from "./QuestionsComponent";
import KidsProgressComponent from "./KidsProgressComponent";
import KidsBadgesComponent from "./KidsBadgesComponent";
import KidsHomePageComponent from "./KidsHomePageComponent";

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: WelcomeComponent,
    },
    SignUp: { screen: SignUpComponent },
    LogIn: { screen: LogInComponent },
    Profile: { screen: ProfileComponent },
    Welcome: { screen: WelcomeComponent },
    ParentDashboard: { screen: ParentDashboardComponent },
    ParentQuestion: { screen: ParentQuestionComponent },
    ParentBuildQuestion: { screen: ParentBuildQuestionComponent },
    ParentEditQuestion: { screen: ParentEditQuestionComponent },
    KidsHome: { screen: KidsHomePageComponent },
    KidsChallenge: { screen: KidsChallengeComponent },
    Challenge: { screen: ChallengeComponent },
    Questions: { screen: QuestionComponent },
    Progress: { screen: KidsProgressComponent },
    Badges: { screen: KidsBadgesComponent },
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
  }
);

class MainComponent extends Component {
  componentDidMount() {}
  render() {
    return <HomeNavigator />;
  }
}

export default connect(null)(MainComponent);
