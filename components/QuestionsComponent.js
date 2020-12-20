import React, { Component } from 'react'
import {TouchableOpacity,Text,TextInput,View, StyleSheet, KeyboardAvoidingView, ScrollView, SafeAreaView, FlatList, ActivityIndicator, Alert} from 'react-native';
import { signUp, logIn,logInFailed } from '../redux/ActionCreators';
import {connect} from 'react-redux'
import * as Font from 'expo-font';
import {  editQuestionKid,updateLastAccessed,setSelectedKid } from '../redux/ActionCreators';


const mapDispatchToProps = {
    editQuestionKid:(user, kidId,challengeId,questionId,question)  =>editQuestionKid(user, kidId,challengeId,questionId,question),
    updateLastAccessed:(user, kidId,challengeId,lastAccessed) => updateLastAccessed(user, kidId,challengeId,lastAccessed),
    setSelectedKid:(kid)=>setSelectedKid(kid)
}

const mapStateToProps = state =>{
    return({
        user: state.user
    })
    
}

class QuestionComponent extends Component {
    constructor(props) {
        super(props)
        this.state={
            fontsLoaded: false,
            loading: false,
            questions: [],
            questionIndex:0,
            lastAnswer:''
        }
    }

    customFonts = {
        Dosis: require('../assets/fonts/Dosis-Bold.ttf'),
    }

    async _loadFontsAsync() {
        await Font.loadAsync(this.customFonts)
        this.setState({fontsLoaded:true})
    }

    componentDidMount(){
        this._loadFontsAsync()
        const unansweredQuestions = this.props.navigation.state.params.category.questions.filter(question => question.answered !== true)
        console.log(unansweredQuestions)
        this.setState({
            questions: unansweredQuestions
        })
    }

    RenderAnswers = ()=>{
        const randomizeQuestions = (array) => {
            let counter = array.length;
        
            while (counter > 0) {
                let index = Math.floor(Math.random() * counter);
                counter--;
                let temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
        
            return array;
        }
        const answers = randomizeQuestions(this.state.questions[this.state.questionIndex].answers)
        return(
            <View>
                {/* <Text>{JSON.stringify(answers)}</Text> */}
                <View>
                    <TouchableOpacity style={styles.answerButton} onPress={()=>this.updateCounter(answers[0])}>
                        <Text style={styles.answerText}>{answers[0].answer}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.answerButton} onPress={()=>this.updateCounter(answers[1])}>
                        <Text style={styles.answerText}>{answers[1].answer}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.answerButton} onPress={()=>this.updateCounter(answers[2])}>
                        <Text style={styles.answerText}>{answers[2].answer}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.answerButton} onPress={()=>this.updateCounter(answers[3])}>
                        <Text style={styles.answerText}>{answers[3].answer}</Text>
                    </TouchableOpacity>
                </View>
                {this.state.lastAnswer? <Text style={{marginTop:15}}>{`Last answer was ${this.state.lastAnswer}`}</Text>:null}
            </View>
        )
    }

    RenderQuestions = () => {

            const question = this.state.questions[this.state.questionIndex]
            if(question){
                return (
                    <View>
                        <Text style={styles.question}>{question.question}</Text>
                        <View>
                            {/* <Text>{JSON.stringify(question.answers)}</Text> */}
                            {this.RenderAnswers()}
                        </View>
                    </View>
                )
            }
            return (
                <View>
                    <Text style={styles.question}>ALL FINSIHED !</Text>
                    <View>
                        
                    </View>
                </View>
            )
    }
    
    updateCounter = (answer)=>{
        //alert(JSON.stringify(this.props.navigation.state.params.category.questions[0]))
        // alert(this.state.questions[this.state.questionIndex]._id)
        if(answer.isCorrect){
            this.setState({
                questionIndex: this.state.questionIndex +=1,
                lastAnswer:'Correct'
            })
        }else{
            this.setState({
                questionIndex: this.state.questionIndex +=1,
                lastAnswer:'Wrong'
            })
        }
        this.props.editQuestionKid(
            this.props.user,
            this.props.user.selectedKid._id,
            this.props.navigation.state.params.category._id,
            this.state.questions[this.state.questionIndex-1]._id,
            {answered:true,answeredCorrect:answer.isCorrect},
        )
        this.props.updateLastAccessed(
            this.props.user,
            this.props.user.selectedKid._id,
            this.props.navigation.state.params.category._id,
            {lastAccessed:Date.now()}
            )
        const kid = this.props.user.kids.filter(kid=> kid._id === this.props.user.selectedKid._id)[0]
        this.props.setSelectedKid(kid)
        //amswered:bool answeredWrong:bool default false
    }

    render() {
        if(!this.state.fontsLoaded){
            return(
                <View>
                    <Text>Loading</Text>
                </View>
            )
        }
        const { navigate } = this.props.navigation;
        if(this.props.user.loading){
            return (
                <View style={styles.main}>
                    <ActivityIndicator size="large" color="#ed553b"/>
                </View>
            )
        } 
        if(this.props.navigation.state.params.category.questions.length <1){
            return(
                <View style={styles.main}>
                    <Text style={styles.noQuestions}>NO QUESTIONS AVAILABLE TELL YOUR PARENTS TO GET TO WORK!</Text>
                </View>
            )
        }
        return (
            <View style={styles.main}>
                <View >
                    <Text onPress={()=>alert(JSON.stringify(this.props.navigation.state.params.category.questions))} style={styles.title}>Question</Text>
                </View>
               
                {this.state.questionIndex <  this.props.navigation.state.params.category.questions.length && this.state.questions.length >0 ? this.RenderQuestions():<Text>FINISHED</Text>}
                
               
            </View>
        )

    }
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:'#f6d55c',
        flex:1,
        alignItems:'center',
    
    },
    title:{
        fontFamily: 'Dosis',
        color:'#ed553b', 
        marginTop:'10%',
        marginBottom:60,
        fontSize:40, 
    },
    noQuestions:{
        fontFamily: 'Dosis',color:'#ed553b',margin:20, marginTop:'40%',marginBottom:60,fontSize:40  
    },
    question:{
        fontFamily: 'Dosis',
        color:'#ed553b',
        fontSize:40,
        textAlign:'center'
    },
    errMess:{
        fontFamily: 'Dosis',color:'#ed553b', marginTop:10,fontSize:24
    },
    fieldBackground:{
        width:'60%',
        marginTop:15,
        backgroundColor:'rgba(255, 255, 255, 0.51)',
        opacity:1,
        borderWidth:1,
        borderColor:'rgba(255, 255, 255, 0.51)',
        borderRadius:50,
        color:'red'
    },
    fields:{
        padding:5,
        opacity:1,
        fontFamily: 'Dosis',
        color:'#ed553b', 
        fontSize:16,
        marginLeft:10  
    },
    answerButton:{
        width:225,
        marginTop:40,
        backgroundColor:'#ed553b',
        color:'#fff',
        borderRadius:50,
        padding:5,
        shadowOffset:{  width: -5,  height: 5,  },
        shadowColor: 'black',
        shadowOpacity: .5,
        alignItems:'center'
    },
    answerText:{
        fontFamily: 'Dosis',
        color:'#fff', 
        fontSize:16,
    },
    footer:{
        fontFamily: 'Dosis',
        color:'#ed553b', 
        fontSize:16,
        marginTop:200,
        marginLeft:8
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(QuestionComponent)