import React, { Component } from 'react';
import {Text,View} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import SignUpComponent from './SignUpComponent'
import LogInComponent from './LogInComponent'
import ProfileComponent from './ProfileComponent'
import WelcomeComponent from './WelcomeComponent'
import ParentDashboardComponent from './ParentDashboardComponent'
import ParentQuestionComponent from './ParentQuestionComponent'
import ParentBuildQuestionComponent from './ParentBuildQuestionComponent'
import ParentEditQuestionComponent from './ParentEditQuestionComponent'
import KidsChallengeComponent from './KidsChallengeComponent'
import ChallengeComponent from './ChallengeComponent' //used
import QuestionComponent from './QuestionsComponent'
import { connect } from 'react-redux';
import {fetchQuestions, fetchCategories, postCategory,postNewCategory, fetchQuestionsByCategory, fetchUsers, signUp} from '../redux/ActionCreators';
import KidsHomePageComponent from './KidsHomePageComponent';

const mapDispatchToProps={
    fetchQuestions,
    fetchCategories,
    postCategory:(id,category)=>postCategory(id,category),
    fetchQuestionsByCategory:(category)=>fetchQuestionsByCategory(category),
    postNewCategory:(category)=>postNewCategory(category),
    fetchUsers:()=>fetchUsers(),
    postUser:(user)=> postUser(user),
    signUp:(user)=>signUp(user),
    logIn:(user)=>logIn(user)   
}

const HomeNavigator = createStackNavigator(
    {
        Home:{
            screen: WelcomeComponent,
            
        },
        SignUp:{screen:SignUpComponent},
        LogIn:{screen:LogInComponent},
        Profile:{screen: ProfileComponent},
        Welcome: {screen:WelcomeComponent},
        ParentDashboard:{screen: ParentDashboardComponent},
        ParentQuestion:{screen:ParentQuestionComponent},
        ParentBuildQuestion:{screen:ParentBuildQuestionComponent},
        ParentEditQuestion :{screen:ParentEditQuestionComponent},
        KidsHome:{screen:KidsHomePageComponent},
        KidsChallenge:{screen:KidsChallengeComponent},
        Challenge:{screen:ChallengeComponent},
        Questions:{screen:QuestionComponent}

    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
      }
)

class MainComponent extends Component {
    componentDidMount(){

    }
    render() {
        return (
           
               <HomeNavigator/>
        )
    }
}

export default connect(null,mapDispatchToProps)(MainComponent);