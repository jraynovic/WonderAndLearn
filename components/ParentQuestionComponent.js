// title with marginTop

//button to add question
// need kid id, parent id, and specific challenge and challenge id to add questions too. 
//pass selected kid through redux perops and grab challenge id through params? 
// list of questions added
import React, { Component } from 'react'
import {TouchableOpacity,Text,TextInput,View, StyleSheet, KeyboardAvoidingView, ScrollView, SafeAreaView, Modal, ActivityIndicator, Alert} from 'react-native';
import { deleteQuestionKid } from '../redux/ActionCreators';
import {connect} from 'react-redux'
import * as Font from 'expo-font';
import {Icon} from 'react-native-elements'


const mapDispatchToProps = {
    // signUp:(user)=> signUp(user),
    // logIn:(user)=>logIn(user),
    // logInFailed:(err)=>logInFailed(err)
    deleteQuestionKid:(user, kidId,challengeId,questionId,question)=>deleteQuestionKid(user, kidId,challengeId,questionId,question)
}

//deleteQuestionKid = (userId, kidId,challengeId,questionId,question,user)
const mapStateToProps = state =>{
    return({
        user: state.user
    })
    
}

class ParentQuestionComponent extends Component {
    constructor(props) {
        super(props)
        this.state={
            fontsLoaded: false,
            loading: false,
            stagedQuestion:{}
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
        this.setState({modalVisible:false})
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    deleteQuestion = (questionId)=>{    
        this.props.deleteQuestionKid(    
            this.props.user,
            this.props.user.parent.kids.filter(kid=> kid._id === this.props.user.selectedKid._id)[0]._id
            ,this.props.user.parent.kids.filter(kid=> kid._id === this.props.user.selectedKid._id)[0].categories.filter(category => category.name === this.props.navigation.state.params.challenge.name)[0]._id,
            this.state.stagedQuestion._id,
            this.state.stagedQuestion
        )
        this.setModalVisible(!this.state.modalVisible)


    }

    stageDeletion = (question)=>{
        this.setModalVisible(!this.state.modalVisible)
        this.setState({stagedQuestion:question})
    }

    handleDebug = () =>{
        const questions = this.props.user.parent.kids.filter(kid=> kid._id === this.props.user.selectedKid._id)[0].categories.filter(category => category.name === this.props.navigation.state.params.challenge.name)[0].questions
        alert(JSON.stringify(this.props.user.parent.kids.filter(kid=> kid._id === this.props.user.selectedKid._id)[0]))
    }

    handleEdit = (question)=>{
       // alert(JSON.stringify(question))
       const questionDetails = {
           kidId:this.props.user.parent.kids.filter(kid=> kid._id === this.props.user.selectedKid._id)[0]._id,
           question: question,
           category:this.props.navigation.state.params.challenge.name,
           categoryId:this.props.navigation.state.params.challenge._id
       }
       this.props.navigation.navigate('ParentEditQuestion', questionDetails,)
    }
    
    renderQuestions = () =>{
        if(this.props.navigation.state.params.challenge.questions){
            const questions = this.props.user.parent.kids.filter(kid=> kid._id === this.props.user.selectedKid._id)[0].categories.filter(category => category.name === this.props.navigation.state.params.challenge.name)[0].questions
            let numPlace = 0
            return (
                questions.map(question=>{
                    {numPlace = numPlace+1}
                    return(
                        <TouchableOpacity 
                            onPress={()=> this.handleEdit(question)} style={styles.question}
                            onLongPress={()=>this.stageDeletion(question)}
                            key={question._id}
                        >
                            <View style={styles.row}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={styles.leftAlign}>
                                        <Text style={styles.questionText}>{`${numPlace}.)`}</Text>
                                    </View>
                                    <View style={styles.centered}>
                                        <Text style={styles.questionText}>{`    ${question.question}`}</Text>
                                    </View>
                                </View>
                            </View>
                          
                        </TouchableOpacity>
                    )
                })
            )
        } 
        return (
            <View><Text>NOT WORKING</Text></View>
        )
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

        //onPress={()=>alert(JSON.stringify(this.props.navigation.state.params.challenge))}
        return (
            <View style={styles.main}>
                <TouchableOpacity style={{marginTop:30,alignSelf:'right'}} onPress={()=>this.props.navigation.goBack()}>
                    <Icon
                    name='chevron-left'
                    size='50'
                    color='#ed553b'
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.navigation.state.params.challenge.name}</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('ParentBuildQuestion', {category:this.props.navigation.state.params.challenge})} style={styles.button}>
                    <Text style={styles.questionText}>+QUESTION</Text>
                </TouchableOpacity>
                <ScrollView
                    showsVerticalScrollIndicator ={false}
                    showsHorizontalScrollIndicator={false}
                >
                     {this.renderQuestions()}
                  
                </ScrollView>
                {/* <Text>{JSON.stringify(this.props.user.selectedKid)}</Text> */}
                <View>
                <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                        }}
                    >
                        <KeyboardAvoidingView
                            style={{ flex: 1, marginBottom: 10 }}
                            behavior='padding'
                            keyboardVerticalOffset='0'
                        >
                            <ScrollView>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalX} onPress={() => this.setModalVisible(!this.state.modalVisible)}>x</Text>
                                    <Text style={styles.modalTitle}>ARE YOU SURE YOU WANT TO DELETE THIS QUESTION? </Text>
                                    <View style={{ height: 15 }}>

                                    </View>

                                    <View style={styles.modalButtons} >
                                        <TouchableOpacity
                                            style={styles.modalButton}
                                            onPress={() => this.setModalVisible(!this.state.modalVisible)}
                                        >
                                            <Text style={styles.buttonText}>CANCEL</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.modalButton}
                                            onPress={() => this.deleteQuestion()}
                                        >
                                            <Text style={styles.buttonText}>CONFIRM</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </Modal>
                </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:'#f6d55c',
        flex:1,
        alignItems:'center',
        justifyContent:'flex-start'
    },
    title:{
        fontFamily: 'Dosis',color:'#ed553b', marginTop:'0%',marginBottom:60,fontSize:40  
    },
    questionText:{
        fontFamily: 'Dosis',color:'#fff',fontSize:16  
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
    button:{
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
    question:{
        marginLeft:4,
        width:290,
        marginTop:40,
        backgroundColor:'#ed553b',
        color:'#fff',
        borderRadius:50,
        padding:5,
        shadowOffset:{  width: -2,  height: 2,  },
        shadowColor: 'black',
        shadowOpacity: .5,
        alignItems:'center'
    },
    logInButtonText:{
        fontFamily: 'Dosis',
        color:'#fff', 
        fontSize:16,
    },
    row:{
        flexDirection:'row',
        flex:1,
        alignSelf:'center'
    },
    leftAlign:{
        alignSelf:'flex-start',
        justifyContent:'flex-start',
    },
    centered:{
        justifyContent:'center',
        alignSelf:'center',
    },
    buttonText:{
        fontFamily: 'Dosis',
        color:'#fff', 
        fontSize:16,
    },
    modalX:{
        fontSize:40,
        alignSelf:'flex-end',
        marginBottom:10
    },
    modalButton:{
        width:125,
        marginTop:20,
        marginHorizontal:5,
        backgroundColor:'#ed553b',
        color:'#fff',
        borderRadius:50,
        padding:5,
        shadowOffset:{  width: -5,  height: 5,  },
        shadowColor: 'black',
        shadowOpacity: .5,
        alignItems:'center'
    },
    modalButtons:{
        flexDirection:'row',
        flex:1,
        // justifyContent:'space-around'
    },
    modalView: {
        marginHorizontal: 30,
        marginTop:140,
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 35,
        paddingBottom:10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
})
export default connect(mapStateToProps,mapDispatchToProps)(ParentQuestionComponent)