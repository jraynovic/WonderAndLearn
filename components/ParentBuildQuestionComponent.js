import React, { Component } from 'react'
import {TouchableOpacity,Text,TextInput,View, StyleSheet, KeyboardAvoidingView, ScrollView, SafeAreaView, FlatList, ActivityIndicator, Alert} from 'react-native';
import { addNewQuestion, addNewQuestionKid } from '../redux/ActionCreators';
import {connect} from 'react-redux'
import * as Font from 'expo-font';
import {Icon} from 'react-native-elements'


const mapDispatchToProps = {
    addNewQuestionKid:(userId,kidId,challengeId,question,token) =>addNewQuestionKid(userId,kidId,challengeId,question,token)
 }

const mapStateToProps = state =>{
    return({
        user: state.user
    })
    
}

class LogInComponent extends Component {
    constructor(props) {
        super(props)
        this.state={
            fontsLoaded: false,
            loading: false,
            question:'',
            correctAnswer:'',
            wrongAnswerOne:'',
            wrongAnswerTwo:'',
            wrongAnswerThree:'',
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

    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    handleNewQuestion = () =>{
        const newQuestion = {
            question: this.state.question,
            answers: [
                {answer:this.state.correctAnswer, isCorrect:true},
                {answer:this.state.wrongAnswerOne, isCorrect:false},
                {answer:this.state.wrongAnswerTwo, isCorrect:false},
                {answer:this.state.wrongAnswerThree, isCorrect:false}
            ]
        }
        this.props.addNewQuestionKid(
            this.props.user.id,
            this.props.user.selectedKid._id,
            this.props.navigation.state.params.category._id,
            newQuestion,
            this.props.user
        )
        this.props.navigation.goBack()
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
        return (
            <View style={styles.main}>
                <ScrollView>
                <TouchableOpacity style={{marginTop:30,alignSelf:'right'}} onPress={()=>this.props.navigation.goBack()}>
                    <Icon
                    name='chevron-left'
                    size='50'
                    color='#ed553b'
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.navigation.state.params.category.name.toUpperCase()}</Text>
                <KeyboardAvoidingView
                            style={{flex:1,marginBottom:10}}
                            behavior='padding'
                            keyboardVerticalOffset='0'
                        >
                    <View style={styles.textBoxTitle}>
                        <Text style={styles.whiteText}>QUESTION</Text>
                        <View>
                            <View style={styles.fieldBackground}>
                                <TextInput
                                    
                                    placeholder='QUESTION'
                                    placeholderTextColor='#fff'
                                    style={styles.fields}
                                    onChangeText={(e) => this.setState({ question: e })}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.textBoxTitle}>
                        <Text style={styles.whiteText}>ANSWERS</Text>
                        <View>
                            <View style={styles.greenFieldBackground}>
                                <TextInput
                                    
                                    placeholder='CORRECT ANSWER'
                                    placeholderTextColor='#fff'
                                    style={styles.fields}
                                    onChangeText={(e) => this.setState({ correctAnswer: e })}
                                />
                            </View>
                            <View style={styles.fieldBackground}>
                                <TextInput
                                    
                                    placeholder='WRONG ANSWER'
                                    placeholderTextColor='#fff'
                                    style={styles.fields}
                                    onChangeText={(e) => this.setState({ wrongAnswerOne: e })}
                                />
                            </View>
                            <View style={styles.fieldBackground}>
                                <TextInput
                                    
                                    placeholder='WRONG ANSWER'
                                    placeholderTextColor='#fff'
                                    style={styles.fields}
                                    onChangeText={(e) => this.setState({ wrongAnswerTwo: e })}
                                />
                            </View>
                            <View style={styles.fieldBackground}>
                                <TextInput
                                    
                                    placeholder='WRONG ANSWER'
                                    placeholderTextColor='#fff'
                                    style={styles.fields}
                                    onChangeText={(e) => this.setState({ wrongAnswerThree: e })}
                                />
                            </View>
                        </View>
                       
                    </View>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity onPress={()=>this.handleNewQuestion()} style={styles.button}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.button}>
                                <Text style={styles.buttonText}>CANCEL</Text>
                            </TouchableOpacity>
                        </View>
                </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:'#f6d55c',
        flex:1,

        justifyContent:'flex-start'
    },
    title:{
        fontFamily: 'Dosis',color:'#ed553b', marginTop:'0%',marginBottom:60,fontSize:40  ,textAlign: 'center', 
    },
    textBoxTitle:{
        justifyContent:'flex-start',
        marginLeft:50,
        marginTop:10
    },
    whiteText:{
        fontFamily: 'Dosis',color:'#fff',fontSize:24,  
    },
    errMess:{
        fontFamily: 'Dosis',color:'#ed553b', marginTop:10,fontSize:24
    },
    buttonRow:{

        flexDirection:"row",
        justifyContent:'space-evenly',
        alignItems:'center',
        // alignItems:'flex-start'
    },
    fieldBackground:{
        width:'80%',
        marginTop:15,
        backgroundColor:'#ed553b',
        opacity:1,
        borderWidth:1,
        borderColor:'rgba(255, 255, 255, 0.51)',
        borderRadius:50,
        color:'red'
    },
    greenFieldBackground:{
        width:'80%',
        marginTop:15,
        backgroundColor:'green',
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
        color:'#fff', 
        fontSize:16,
        marginLeft:10  
    },
    button:{
        width:'25%',
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
    buttonText:{
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
export default connect(mapStateToProps,mapDispatchToProps)(LogInComponent)