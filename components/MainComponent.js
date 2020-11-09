import React, { Component } from 'react';
import {Text,View} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import HomeComponent from './HomeComponent';
import ParentComponent from './ParentComponent';
import KidComponent from './KidComponent';
import FinishedComponent from './kid/FinishedComponent';
import TemplateComponent from './TemplateComponent'
import ChallengeComponent from './ChallengeComponent';
import ChooseUser from './ChooseUser'
import ChallengeList from './ChallengeList';
import BuildChallenges from './BuildChallenges';
import QuestionsAvailable from './buildcomponents/QuestionsAvailable';
import AddChild from './AddChildComponent'
import StatsComponent from './StatsComponent'
import SignUpComponent from './SignUpComponent'
import LogInComponent from './LogInComponent'
import ProfileComponent from './ProfileComponent'
import WelcomeComponent from './WelcomeComponent'
import ParentDashboardComponent from './ParentDashboardComponent'
import { connect } from 'react-redux';
import {fetchQuestions, fetchCategories, postCategory,postNewCategory, fetchQuestionsByCategory, fetchUsers, signUp} from '../redux/ActionCreators';
// import PreviewComponent from './PreviewComponent'

// const RenderHome = () =>{
//     return(
//         <HomeComponent/>    
//     )
// }
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
        Parent:{screen:ParentComponent},
        Kid:{screen:KidComponent},
        Templates:{screen:TemplateComponent},
        Challenge:{screen:ChallengeComponent},
        ChooseUser:{screen:ChooseUser},
        ChallengeList:{screen:ChallengeList},
        BuildChallenges:{screen:BuildChallenges},
        QuestionsAvailable:{screen:QuestionsAvailable},
        FinishedComponent:{screen:FinishedComponent},
        AddChild:{screen:AddChild},
        Stats:{screen:StatsComponent},
        SignUp:{screen:SignUpComponent},
        LogIn:{screen:LogInComponent},
        Profile:{screen: ProfileComponent},
        Welcome: {screen:WelcomeComponent},
        ParentDashboard:{screen: ParentDashboardComponent}

        // Preview: { screen:PreviewComponent }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
      }
)

class MainComponent extends Component {
    componentDidMount(){
        this.props.fetchCategories()
        this.props.fetchUsers()
        // this.props.fetchQuestions()
        
        
    }
    render() {
        return (
           
               <HomeNavigator/>
        )
    }
}

export default connect(null,mapDispatchToProps)(MainComponent);