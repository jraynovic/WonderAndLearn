import React, { Component } from 'react'
import {TouchableOpacity,Text,TextInput,View, StyleSheet, KeyboardAvoidingView, ScrollView, SafeAreaView, FlatList, ActivityIndicator, Alert} from 'react-native';
import { signUp, logIn,logInFailed } from '../redux/ActionCreators';
import {connect} from 'react-redux'
import * as Font from 'expo-font';


const mapDispatchToProps = {
    signUp:(user)=> signUp(user),
    logIn:(user)=>logIn(user),
    logInFailed:(err)=>logInFailed(err)
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
            loading: false
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
                
                <Text style={styles.title}>TEMPLATE</Text>
               
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
        fontFamily: 'Dosis',color:'#ed553b', marginTop:'40%',marginBottom:60,fontSize:40  
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
    logInButton:{
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
    logInButtonText:{
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