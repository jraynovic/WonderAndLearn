import React, { Component } from 'react'
import {TouchableOpacity,Text,TextInput,View, StyleSheet,  ScrollView, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import { signUp, logIn } from '../redux/ActionCreators';
import {connect} from 'react-redux'
import * as Font from 'expo-font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const mapDispatchToProps = {
    signUp:(user)=> signUp(user),
    logIn:(user)=>login(user)
}

const mapStateToProps = state =>{
    return({
        user: state.user,
        parent: state.parent
    })
    
}


class SignUpComponent extends Component {
    constructor(props) {
        super(props)
        this.state ={
            username:"",
            email: "",
            emailValidation:'',
            firstname:"",
            firstnameValidation:'',
            lastname:"",
            lastnameValidation:'',
            pin:"",
            pinValidation:'',
            password: "",
            confirmedPassword:"",
            passwordValidation:'',
            valdationError:true,
            fontsLoaded: false,
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
        // this._loadFontsAsync()
    }
    clearErrors = () =>{
        this.setState({validateError:[]},()=>{
            console.log('Errors should be cleared.')
            this.validateUser()
        })
        
        
        
    }
    
    submitNewUser = () => {
        if (this.state.valdationError) {
            alert('PLEASE COMPLETE FIELDS CORRECTLY')
        } else {
            this.setState({ username: this.state.email })
            const newUser = {
                username: this.state.email,
                email: this.state.email,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                pin: this.state.pin,
            }
            this.props.signUp(JSON.stringify(newUser))
                .then(this.props.navigation.navigate('Profile'))
        }
    }

    validateInput = (input) => {
        const emailValidator = email => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(String(email).toLowerCase())
        }

        const pinValidator = pin => {
            const re = /^\d{4}$/
            return re.test(pin)
        }

        if (input === 'firstname') {
            if (this.state.firstname.length < 3 || this.state.firstname.length > 10) {
                this.setState({ firstnameValidation: '*FIRST NAME MUST BE BETWEEN\n 3 AND 10 CHARACTERS' })
            } else {
                this.setState({ firstnameValidation: '' })
            }
        }

        if(input === 'lastname'){
            if(this.state.lastname.length <3 || this.state.lastname.length >12 ){
                this.setState({lastnameValidation:'*LAST NAME MUST BE BETWEEN\n 3 AND 12 CHARACTERS'})
            }else{
                this.setState({lastnameValidation:''})
            }
        }
        if(input === 'email'){
            if(emailValidator(this.state.email)){
                this.setState({emailValidation:''})
            }else{
                this.setState({emailValidation:'*PLEASE ENTER VALID EMAIL'})
            }
        }
        if(input === 'pin'){
            if(pinValidator(this.state.pin)){
                this.setState({pinValidation:''})
            }else{
                this.setState({pinValidation:'*PIN MUST BE 4 DIGITS'})
            }
        }
        if(input === 'password'){
            if(this.state.password === this.state.confirmedPassword){
                this.setState({passwordValidation:''})
            }else{
                this.setState({passwordValidation:'*PASSWORDS MUST MATCH'})
            }
        }
        if(
            this.state.firstnameValidation || this.state.firstname.length <1 || 
            this.state.lastnameValidation || this.state.lastname.length <1 || 
            this.state.emailValidation || this.state.email.length <1 || 
            this.state.pinValidation || this.state.pin.length <1 ||
             this.state.passwordValidation || this.state.confirmedPassword.length <1
          ){
            this.setState({valdationError:true})
        }else{
            this.setState({valdationError:false})
        }
        // alert(this.state.valdationError)
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
            <ScrollView>
            <KeyboardAwareScrollView  style={styles.main} 
              style={{ backgroundColor: '#f6d55c' }}
              resetScrollToCoords={{ x: 0, y: 0 }}
              contentContainerStyle={styles.main}
              enableOnAndroid={true} 
            >
             
                
                <Text style={styles.title}>
                    SIGN UP
                </Text>
                <Text>{JSON.stringify(this.props.parent)}</Text>
                <View>
                    
                        <View style={this.state.firstnameValidation? styles.fieldBackgroundError:styles.fieldBackground}>
                            
                            <TextInput
                                placeholder='FIRST NAME'
                                placeholderTextColor= '#ed553b'
                                 style = {styles.fields}
                                onChangeText = {(e)=>this.setState({firstname:e})} 
                                onBlur={()=>this.validateInput('firstname')}
                            />
                        </View>

                        {this.state.firstnameValidation ?<View style={styles.errorView}><Text style={styles.errorText}>{this.state.firstnameValidation}</Text></View>:null}

                        <View style={this.state.lastnameValidation? styles.fieldBackgroundError:styles.fieldBackground}>
                            <TextInput
                                
                                placeholder='LAST NAME'
                                placeholderTextColor= '#ed553b'
                                style={styles.fields}
                                onChangeText = {(e)=>this.setState({lastname:e})} 
                                onBlur={()=>this.validateInput('lastname')}
                            />
                        </View>
                        {this.state.lastnameValidation ?<View style={styles.errorView}><Text style={styles.errorText}>{this.state.lastnameValidation}</Text></View>:null}

                        <View style={this.state.emailValidation? styles.fieldBackgroundError:styles.fieldBackground}>
                            <TextInput
                                placeholder='EMAIL'
                                placeholderTextColor= '#ed553b'
                                style={styles.fields}
                                onChangeText={(e) => this.setState({ email: e })}
                                onBlur={()=>this.validateInput('email')}
                            />
                        </View>
                        {this.state.emailValidation ?<View style={styles.errorView}><Text style={styles.errorText}>{this.state.emailValidation}</Text></View>:null}

                        <View style={this.state.pinValidation? styles.fieldBackgroundError:styles.fieldBackground}>
                            <TextInput
                                placeholder='4 DIGIT PIN'
                                placeholderTextColor= '#ed553b'
                                style={styles.fields}
                                onChangeText={(e) => this.setState({ pin: e })}
                                onBlur={()=>this.validateInput('pin')}
                            />
                        </View>
                        {this.state.pinValidation ?<View style={styles.errorView}><Text style={styles.errorText}>{this.state.pinValidation}</Text></View>:null}

                        <View style= {styles.fieldBackground}>
                            <TextInput
                                secureTextEntry
                                placeholder='PASSWORD'
                                placeholderTextColor= '#ed553b'
                                style={styles.fields}
                                onChangeText={(e) => this.setState({ password: e })}
                            />
                        </View>

                        <View style={this.state.passwordValidation? styles.fieldBackgroundError:styles.fieldBackground}>
                            <TextInput
                                secureTextEntry
                                placeholder='CONFIRM PASSWORD'
                                placeholderTextColor= '#ed553b'
                                style={styles.fields}
                                onChangeText={(e) => this.setState({ confirmedPassword: e })}
                                onBlur={()=>this.validateInput('password')}
                            />
                        </View>
                        {this.state.passwordValidation ?<View style={styles.errorView}><Text style={styles.errorText}>{this.state.passwordValidation}</Text></View>:null}

                        {this.props.user.loading ?  <View style={{marginTop:10}}><ActivityIndicator size="large" color="#ed553b"/></View>  
                         : <TouchableOpacity
                            style={styles.createButton}
                            onPress={() => this.submitNewUser()}
                           >
                                <Text style={styles.createButtonText}>{'     '}CREATE ACCOUNT{'     '}</Text>
                            </TouchableOpacity>
                        }

                        <View>
                            <Text style={styles.validate}>{this.props.user.errMess ? '*VERIFY FIELDS ARE CORRECTLY FILLED':''}</Text>   
                        </View>
                    <TouchableOpacity onPress={()=>navigate('LogIn')} >


                        {/* *****************LINK TO SIGN IN!!!!!!!!!!!!!!!!!!!!!! */}
                        <Text  style ={styles.footer}>ALREADY HAVE AN ACCOUNT?</Text>
                    </TouchableOpacity>
    
                </View>
            </KeyboardAwareScrollView>
            </ScrollView>
           
           
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
    fieldBackgroundError:{
        marginTop:15,
        backgroundColor:'rgba(255, 255, 255, 0.51)',
        opacity:1,
        borderWidth:1,
        borderColor:'#ed553b',
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
    errorText:{
        // marginTop:15,
        fontFamily: 'Dosis',
        color:'#ed553b', 
        fontSize:10,
    },
    errorView:{
        alignSelf:'center',
        textAlign:'center'
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