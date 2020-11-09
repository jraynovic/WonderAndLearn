import React, { Component } from 'react'
import {Button,Text,View, TouchableOpacity,StyleSheet} from 'react-native';
import ScoreComponent from './kid/ScoreComponent';
import QuestionComponent from './kid/QuestionComponent';
import QUESTIONS from '../shared/questions';
import AnswerComponent from './kid/AnswerComponent';
import {postCategory,fetchQuestionsByCategory} from '../redux/ActionCreators';
import {connect} from 'react-redux';

const mapStateToProps = state =>{
    return{
        questions: state.questions,
        wholeState:state
    }
}

const mapDispatchToProps = {
    fetchQuestionsByCategory:(category)=>fetchQuestionsByCategory(category)
}

class ChallengeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            score:0,
            questions:[],
            questionsLength:0,
            currentQuestion:0,
         }
    }
    componentDidMount() {

        this.setState({
            questions:this.props.questions.questions,    
            questionsLength: this.props.questions.questions.length
        })
    }

    NextQuestion = (answer)=>{
        // if(this.props.questions.questions.length-this.state.currentQuestion ===1){
            
        //     this.props.navigation.navigate('FinishedComponent',{score:this.state.score})
        // }
        if (this.state.currentQuestion < this.props.questions.questions.length){
            this.setState({
                currentQuestion: this.state.currentQuestion+1
            })
            if(answer.correct){
                this.setState(
                    { score: this.state.score + 5 }
                )
            }
        }
        
    }

    render() {
        const { navigate } = this.props.navigation;

        if(this.props.questions.questions.length-this.state.currentQuestion ===0){
            
            return(
                <View style={{flex:1,
                    backgroundColor:'#9BF6FF',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Text style={{marginTop:50, fontSize:24}}>Awesome job! Your score was {this.state.score}!!</Text>
                    <TouchableOpacity
                    style ={styles.appButtonKid}
                    onPress={()=>this.props.navigation.navigate('ChallengeList')}
                    >
                        <Text>More Challenges</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View style={{flex:1,
                backgroundColor:this.props.questions.questions[this.state.currentQuestion].background,
            }}>
                <View style={{flexDirection:'row',justifyContent:'flex-end',marginTop:-20,marginRight:-20}}>
                    <ScoreComponent score={this.state.score}/>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <QuestionComponent question={this.props.questions.questions[this.state.currentQuestion].question} next={this.NextQuestion}/> 
                </View>
                <View>
                    <AnswerComponent answers = {this.props.questions.questions[this.state.currentQuestion]} next={this.NextQuestion}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // ...
    appButtonContainer: {
    margin:30,
      backgroundColor: "#FFADAD",
      borderRadius: 50,
      borderWidth:3,
      borderColor:'#FDFFB6',
      paddingVertical: 20,
      paddingHorizontal: 50
    },
    appButtonKid: {
        margin:30,
        backgroundColor: "#FFD6A5",
        borderRadius: 50,
        borderWidth:3,
        borderColor:'#FDFFB6',
        paddingVertical: 20,
        paddingHorizontal: 50
        },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  });
export default connect(mapStateToProps,mapDispatchToProps)(ChallengeComponent);