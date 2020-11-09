import React, { Component } from 'react'
import {Alert,Modal,Text,TextInput, View, TouchableOpacity,StyleSheet,
    Image,TouchableHighlight,Switch, TextInputBase, Picker} from 'react-native';
import { connect } from 'react-redux';
import {postQuestion,fetchQuestionsByCategory, fetchCategories} from '../redux/ActionCreators'

const mapStateToProps = state =>{
    return{
        questions: state.questions
    }
}

const mapDispatchToProps = {
    postQuestion:(category,question) => postQuestion(category,question),
    fetchQuestionsByCategory:(category) => fetchQuestionsByCategory(category)
}

class TemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
         images:[require('./images/clouds.jpg'),require('./images/comic.jpg'),require('./images/rainbow.jpg')],
         imageSelected: 0,
         modalVisable:false,
         questionModalVisable:false,
         answerModalVisable:false,
         previewModalVisable:false,
         question:'Add Question',
         answerOne:'',
         answerTwo:'',
         answerThree:'',
         answerFour:'',
         oneIsTrue: false,
         twoIsTrue: false,
         threeIsTrue: false,
         fourIsTrue: false,
         category:'Select'
         
        };
    }

    handleNewQuestion = () =>{
        const category = this.props.navigation.getParam('category')
        if(this.props.questions.questions[category]){
            
            const newQuestion = {
                id: this.props.questions.questions[category].length,
                question: this.state.question,
                answerOne:{answer:this.state.answerOne,correct:this.state.oneIsTrue},
                answerTwo:{answer:this.state.answerTwo,correct:this.state.twoIsTrue},
                answerThree:{answer:this.state.answerThree,correct:this.state.threeIsTrue},
                answerFour:{answer:this.state.answerFour,correct:this.state.fourIsTrue},
                questionFrame: null,
                answerFrame: null,
                background: "#FDFFB6"
            }
            alert(JSON.stringify(newQuestion))
            this.props.postQuestion(this.props.navigation.getParam('category'),newQuestion)
            this.props.fetchQuestionsByCategory(category)
            this.props.navigation.navigate('QuestionsAvailable',{category:category})
        }else{
            
            const newQuestion = {
                id: 0,
                question: this.state.question,
                answerOne:{answer:this.state.answerOne,correct:this.state.oneIsTrue},
                answerTwo:{answer:this.state.answerTwo,correct:this.state.twoIsTrue},
                answerThree:{answer:this.state.answerThree,correct:this.state.threeIsTrue},
                answerFour:{answer:this.state.answerFour,correct:this.state.fourIsTrue},
                questionFrame: null,
                answerFrame: null,
                background: "#FDFFB6"
            }
            alert(JSON.stringify(newQuestion))
            this.props.postQuestion(this.props.navigation.getParam('category'),newQuestion)
            this.props.fetchQuestionsByCategory(category)
            this.props.navigation.navigate('QuestionsAvailable',{category:category})
        }
    }

    nextImage=() =>{
        
        if(this.state.imageSelected<3){
            this.setState({
                imageSelected: this.state.imageSelected+1
            })
        }
        if(this.state.imageSelected >=3){
            this.setState({
                imageSelected: 0
            })
        }
    }
      
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }

    setQuestionModalVisible = (visible) => {
        this.setState({ questionModalVisable: visible });
      }
      setAnswerModalVisible = (visible) => {
        this.setState({ answerModalVisable: visible });
      }

    previewModalVisible = (visible) => {
        this.setState({ previewModalVisable: visible });
      }

    handleQuestionText = (text)=>{
        this.setState({
            question: text
        })
    }
    handleAnswerText = (text,answer) =>{
        if(answer===1){
            this.setState({
                answerOne:text
            })
        }else if (answer===2){
            this.setState({
                answerTwo:text
            })
        }else if (answer===3){
            this.setState({
                answerThree:text
            })
        }else if (answer===4){
            this.setState({
                answerFour:text
            })
        }
    }

    handleToggler= (answerNum) =>{

        if(answerNum ===1){
            this.setState({
                oneIsTrue:!this.state.oneIsTrue
            })
        } 
        if(answerNum ===2){
            this.setState({
                twoIsTrue:!this.state.twoIsTrue
            })
        } 
        if(answerNum ===3){
            this.setState({
                threeIsTrue:!this.state.threeIsTrue
            })
        } 
        if(answerNum ===4){
            this.setState({
                fourIsTrue:!this.state.fourIsTrue
            })
        } 
        

    }
    
    componentDidMount() {
        this.setState({ modalVisible: false,
        questionModalVisable:false,
         answerModalVisable:false,   
         previewModalVisable:false,
         category: this.props.navigation.getParam('category')
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        const { modalVisible } = this.state;
        const {questionModalVisable} = this.state;
        const {answerModalVisable} = this.state;
        const {previewModalVisable} = this.state;
        return (
            <View style={{ flex: 1, marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Select Background</Text>
                            
                            <TouchableOpacity onPress={()=>this.nextImage()}>
                            <Image style={{width:300,height:400}} source={this.state.images[this.state.imageSelected]}/>
                            </TouchableOpacity>

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#FFADAD",marginTop:15 }}
                                onPress={() => {
                                    this.setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Done</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                {/* ********Question modal*************** */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={questionModalVisable}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Enter Question Text</Text>
                            <TextInput
                                placeholder='question...'
                                onChangeText = {this.handleQuestionText}
                            />

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#FFADAD",marginTop:15 }}
                                onPress={() => {
                                    this.setQuestionModalVisible(!questionModalVisable);
                                }}
                            >
                                <Text style={styles.textStyle}>Done</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                {/* ********Answer modal*************** */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={answerModalVisable}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={{...styles.modalView,marginBottom:150}}>
                            <Text style={styles.modalText}>Enter Answers For:{`\n  ${this.state.question}`}</Text>
                            <View >
                            <View>
                                <View style={{flexDirection:'row',alignItems:'baseline'}} >
                                <Switch
                                        trackColor={{ false: "#767577", true: "#767577" }}
                                        thumbColor={this.state.oneIsTrue ? "#CAFFBF" : "#f27474"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={()=> this.handleToggler(1)}
                                        value={this.state.oneIsTrue}
                                    />
                                    <TextInput
                                    style={{ borderBottomWidth: 1,padding:20,margin:5,
                                        marginBottom:0,fontSize:16}}
                                    placeholder={'answer one'}
                                    value={this.state.answerOne}
                                    onChangeText={(e)=>this.handleAnswerText(e,1)}/>
                                   
                                </View>
                                <View style={{flexDirection:'row',alignItems:'baseline'}}>
                                <Switch
                                        trackColor={{ false: "#767577", true: "#767577" }}
                                        thumbColor={this.state.twoIsTrue ? "#CAFFBF" : "#f27474"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={()=> this.handleToggler(2)}
                                        value={this.state.twoIsTrue}
                                    />
                                    <TextInput
                                     style={{ borderBottomWidth: 1,padding:20,margin:5,
                                        marginBottom:0,fontSize:16}}
                                    placeholder={'answer two'}
                                    value= {this.state.answerTwo}
                                    onChangeText={(e)=>this.handleAnswerText(e,2)}/>
                                   

                                </View>
                            </View>
                            <View>
                            <View style={{flexDirection:'row',alignItems:'baseline'}} >
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#767577" }}
                                        thumbColor={this.state.threeIsTrue ? "#CAFFBF" : "#f27474"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={()=> this.handleToggler(3)}
                                        value={this.state.threeIsTrue}
                                    />
                                    <TextInput
                                    style={{ borderBottomWidth: 1,padding:20,margin:5,
                                        marginBottom:0,fontSize:16}}
                                    placeholder={'answer three'}
                                    value={this.state.answerThree}
                                    onChangeText={(e)=>this.handleAnswerText(e,3)}/>
                                    

                                </View>
                                <View style={{flexDirection:'row',alignItems:'baseline'}}>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#767577" }}
                                        thumbColor={this.state.fourIsTrue ? "#CAFFBF" : "#f27474"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={()=> this.handleToggler(4)}
                                        value={this.state.fourIsTrue}
                                    />
                                    <TextInput
                                    style={{ borderBottomWidth: 1,padding:20,margin:5,
                                        marginBottom:0,fontSize:16}}
                                    placeholder={'answer four'}
                                    value ={this.state.answerFour}
                                    onChangeText={(e)=>this.handleAnswerText(e,4)}/>
                                    
                                </View>
                            </View>
                        </View>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#f27474",marginTop:15 }}
                                onPress={() => {
                                    this.setAnswerModalVisible(!answerModalVisable);
                                }}
                            >
                                <Text style={styles.textStyle}>Done</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                
                <TouchableOpacity
                onPress={() => {
                    this.setModalVisible(!modalVisible);
                }}>
                    <View style={{justifyContent: 'center',alignItems: 'center'}}>
                        <Image style={{width:200,height:200}} source={this.state.images[this.state.imageSelected]} />
                    <Text>
                        Choose Background
                    </Text>
                    </View>
                </TouchableOpacity>
                <View style={{marginTop:20}}>
                    <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: "#FFADAD",marginTop:15 }}
                         onPress={() => {
                            this.setQuestionModalVisible(!questionModalVisable);
                    }}>
                        <Text style={{color:'white',fontSize:16}}>
                            {this.state.question}
                        </Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={{marginTop:20}}>
                    <TouchableOpacity
                        style={{marginTop:15,justifyContent:'center',alignItems:'center' }}
                         onPress={() => {
                            this.setAnswerModalVisible(!questionModalVisable);
                    }}>
                        <Text style={{fontSize:24}}>
                            Answers
                        </Text>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ ...styles.openButton, backgroundColor: "#FFADAD",minWidth:20, margin: 5 }}>
                                    <Text>{this.state.answerOne}</Text>
                                </View>
                                <View style={{ ...styles.openButton, backgroundColor: "#FFADAD",minWidth:20, margin: 5 }}>
                                    <Text>{this.state.answerTwo}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ ...styles.openButton, backgroundColor: "#FFADAD",minWidth:20, margin: 5 }}>
                                    <Text>{this.state.answerThree}</Text>
                                </View>
                                <View style={{ ...styles.openButton, backgroundColor: "#FFADAD",minWidth:20, margin: 5 }}>
                                    <Text>{this.state.answerFour}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>   
                </View>
                    <TouchableHighlight 
                        style={styles.openButton}
                        onPress={()=> this.handleNewQuestion()}
                        >
                            <Text>Done</Text>

                    </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
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
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

export default connect(mapStateToProps,mapDispatchToProps)(TemplateComponent)
