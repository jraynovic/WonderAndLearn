import React, { Component } from 'react'
import {TouchableOpacity,Text,TextInput,View, StyleSheet, KeyboardAvoidingView, ScrollView, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import { signUp, logIn } from '../redux/ActionCreators';
import {connect} from 'react-redux'
import * as Font from 'expo-font';
import { checkForUpdateAsync } from 'expo/build/Updates/Updates';


const mapDispatchToProps = {
    signUp:(user)=> signUp(user),
    logIn:(user)=>login(user)
}

const mapStateToProps = state =>{
    return({
        users: state.users,
        parent: state.parent
    })
    
}


class SignUpComponent extends Component {
    constructor(props) {
        super(props)
        this.state ={
            username:"",
            email: "",
            firstname:"",
            lastname:"",
            pin:"",
            password: "",
            confirmedPassword:"",
            validateError:[],
            fontsLoaded: false,
        }
    }
    customFonts = {
        Dosis: require('../assets/fonts/Dosis-Bold.ttf'),
        //'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
    }

    async _loadFontsAsync() {
        await Font.loadAsync(this.customFonts)
        this.setState({fontsLoaded:true})
    }

    componentDidMount(){
        this._loadFontsAsync()
        // this._loadFontsAsync()
    }
    clearErrors = () =>{
        this.setState({validateError:[]},()=>{
            console.log('Errors should be cleared.')
            this.validateUser()
        })
        
        
        
    }
    validateUser =() =>{
        const validateEmail= (email) =>{
            const re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
        if(!validateEmail(this.state.email)){
            this.setState({
                validateError: this.state.validateError.push('**Email is invalid\n')
            })
        }
        const reChar = /[a-zA-Z]/g
        if(reChar.test(this.state.pin)){
            this.setState({
                validateError: this.state.validateError.push( {name:'pinVal',text:'**Pin must only contain numbers\n'})
            })
        }
        if(this.state.pin.length !==4){
            this.setState({
                validateError: this.state.validateError.push({name:'pinLength',text:'**Pin must be 4 numbers\n'})
            })
        }
        if(this.state.firstname.length < 3 || this.state.firstname > 15){
            this.setState({
                validateError: this.state.validateError.push({name:'firstName',text:'**First Name must be\n between 3 and 15 characters.\n'})
            })
        }
        if(this.state.lastname.length < 3 || this.state.lastname > 15){
            this.setState({
                validateError: this.state.validateError.push({name:'lastName',text:'**Last Name must be\n between 3 and 15 characters.\n'})
            })
        }
        if(this.state.password.length <4){
            this.setState({
                validateError: this.state.validateError.push({name:'passLength',text:'**Password should be\n longer than 4 characters.\n'})
            })
        }
        if(this.state.password !== this.state.confirmedPassword){
            this.setState({
                validateError: this.state.validateError.push({name:'password',text:'**Passwords do not match.\n'})
            })
        }

        this.state.validateError.map(err=> console.log(err))
        if(this.state.validateError.length ===0){
            console.log(this.state.validateError.length)
        }

    }
    submitNewUser = ()=>{
        //check passwords and validate before moving on! ****************************************************************************************
        this.setState({username:this.state.email})
        const newUser = {
            username: this.state.email,
            email:this.state.email,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            pin: this.state.pin
        }
    //    alert(JSON.stringify(this.props.users.errMess))
       this.props.signUp(JSON.stringify(newUser))
       .then(this.props.navigation.navigate('Profile'))
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
        return (
            <ScrollView
                contentContainerStyle= {styles.main}
            >
             
                
                <Text style={styles.title}>
                    SIGN UP
                </Text>
                <Text>{JSON.stringify(this.props.parent)}</Text>
                <View>
                    
                        <View style={styles.fieldBackground}>
                            
                            <TextInput
                                placeholder='FIRST NAME'
                                placeholderTextColor= '#ed553b'
                                style={styles.fields}
                                onChangeText = {(e)=>this.setState({firstname:e})} 
                            />
                        </View>
                        
                        <View style={styles.fieldBackground}>
                            <TextInput
                                type='email'
                                placeholder='LAST NAME'
                                placeholderTextColor= '#ed553b'
                                style={styles.fields}
                                onChangeText = {(e)=>this.setState({lastname:e})} 
                            />
                        </View>
                        <View style= {styles.fieldBackground}>
                            <TextInput
                                placeholder='EMAIL'
                                placeholderTextColor= '#ed553b'
                                style={styles.fields}
                                onChangeText={(e) => this.setState({ email: e })}
                            />
                        </View>
                        <View style= {styles.fieldBackground}>
                            <TextInput
                                placeholder='4 DIGIT PIN'
                                placeholderTextColor= '#ed553b'
                                style={styles.fields}
                                onChangeText={(e) => this.setState({ pin: e })}
                            />
                        </View>
                        <View style= {styles.fieldBackground}>
                            <TextInput
                                secureTextEntry
                                placeholder='PASSWORD'
                                placeholderTextColor= '#ed553b'
                                style={styles.fields}
                                onChangeText={(e) => this.setState({ password: e })}
                            />
                        </View>
                        <View style= {styles.fieldBackground}>
                            <TextInput
                                secureTextEntry
                                placeholder='CONFIRM PASSWORD'
                                placeholderTextColor= '#ed553b'
                                style={styles.fields}
                                onChangeText={(e) => this.setState({ confirmedPassword: e })}
                            />
                        </View>

                        {this.props.users.loading ?  <View style={{marginTop:10}}><ActivityIndicator size="large" color="#ed553b"/></View>  
                         : <TouchableOpacity
                            style={styles.createButton}
                            onPress={() => this.submitNewUser()}
                           >
                                <Text style={styles.createButtonText}>{'     '}CREATE ACCOUNT{'     '}</Text>
                            </TouchableOpacity>
                        }

                        <View>
                            <Text style={styles.validate}>{this.props.users.errMess ? '*VERIFY FIELDS ARE CORRECTLY FILLED':''}</Text>   
                        </View>
                    <TouchableOpacity onPress={()=>navigate('LogIn')} >


                        {/* *****************LINK TO SIGN IN!!!!!!!!!!!!!!!!!!!!!! */}
                        <Text  style ={styles.footer}>ALREADY HAVE AN ACCOUNT?</Text>
                    </TouchableOpacity>
    
                </View>
            </ScrollView>
            // </KeyboardAvoidingView>
           
        )
    }
}
const styles = StyleSheet.create({
    // ...
    main:{
        backgroundColor:'#f6d55c',
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end'
    },
    title:{
        fontFamily: 'Dosis',color:'#ed553b', marginTop:'20%',fontSize:40  
    },
    fieldBackground:{
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
    createButton:{
        marginTop:30,
        backgroundColor:'#ed553b',
        color:'#fff',
        borderRadius:50,
        padding:5,
        shadowOffset:{  width: -5,  height: 5,  },
        shadowColor: 'black',
        shadowOpacity: .5,
        alignItems:'center'
    },
    createButtonText:{
        fontFamily: 'Dosis',
        color:'#fff', 
        fontSize:16,
    },
    validate:{
        marginTop:15,
        fontFamily: 'Dosis',
        color:'#ed553b', 
        fontSize:12,
    },
    footer:{
        fontFamily: 'Dosis',
        color:'#ed553b', 
        fontSize:16,
        marginTop:140,
        paddingBottom:10,
        marginLeft:8
    }
  });
export default connect(mapStateToProps,mapDispatchToProps)(SignUpComponent);