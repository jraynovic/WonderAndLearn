import React, { Component } from 'react'
import {TouchableOpacity,Text,TextInput,View, StyleSheet,Image, KeyboardAvoidingView, ScrollView, SafeAreaView, FlatList, ActivityIndicator,Modal} from 'react-native';
import { signUp, logIn } from '../redux/ActionCreators';
import {connect} from 'react-redux'
import * as Font from 'expo-font';
import { checkForUpdateAsync } from 'expo/build/Updates/Updates';
import { Input } from 'react-native-elements';
import newUser from '../assets/NewUser.png'
import RingProgress from './RingProgressComponent'

const mapDispatchToProps = {
    signUp:(user)=> signUp(user),
    logIn:(user)=>logIn(user)
}

const mapStateToProps = state =>{
    return({
     users: state.users
    })
    
}

class ParentDashboardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            parent:this.props.parent,
            fontsLoaded:false,
            modalVisible: false,
            currentKid: '',
            
            
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
        this.setState({modalVisible:false})
    }

    renderUserStats = () =>{
       
        if(!this.state.currentKid){
            return(
                <View style={styles.noUserContainer}>
                    <Text style={styles.noUser}>You have no users yet.</Text>
                    <Text style={styles.noUser}>Add a user to see stats.</Text>
                </View>
            )
        }else {
            return(
                <View>
                    <Text>{this.state.currentKid}</Text>
                </View>
            )
        }
    }
    

    render() {
        if(!this.state.fontsLoaded){
            return(
                <View>
                    <Text>Loading</Text>
                </View>
            )
        }
        return (
            <View style={styles.main}>
                <View style={styles.centered}>
                    <Text style={styles.title}>PARENT DASHBOARD</Text>
                </View>
                {/* <TouchableOpacity onPress={()=>alert(JSON.stringify(this.props.users.parent.kids))}>
                    <Text>TEST</Text>
                </TouchableOpacity> */}
                <View style={styles.profiles}>
                    {this.props.users.parent.kids ?
                        <TouchableOpacity onPress={() => alert('Add new user')}>
                            <Image source={newUser} style={styles.image} />
                        </TouchableOpacity> : <View> </View>

                    }
                </View>

                <View style={styles.centered}>
                    <View>
                        {this.renderUserStats()}
                    </View>
                    <View style={{marginBottom:20}}>
                        <RingProgress
                            text= '650/1000'
                            textFontSize={16}
                            textFontColor='#ed553b' 
                            progressRingWidth={10} 
                            percent={65} 
                            ringColor='#ed553b' 
                            ringBgColor ='#f5d047' 
                            radius={70}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    main:{
        backgroundColor:'#f6d55c',
        flex:1,
        // alignItems:'center',
        justifyContent:'flex-start'
    },
    centered:{
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        fontFamily: 'Dosis',color:'#ed553b', marginTop:'20%',marginBottom:60,fontSize:40  
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
        fontFamily: 'Dosis',
        color:'#ed553b', 
        fontSize:40,     
    },
    noUser:{
        fontFamily: 'Dosis',
        color:'#ed553b', 
        fontSize:24, 
    },
    noUserContainer:{
        fontFamily: 'Dosis',
        color:'#ed553b', 
        fontSize:24,
        // marginBottom:250   
        marginBottom:50
    },
    image:{
        height:112,
        width:95,
        marginLeft:10
    },
    
    profiles:{
        flex:1,
        flexDirection:'row',
        alignContent:'flex-start',
        justifyContent:'flex-start',
    },
    forParentsButton:{
        width:175,
        marginBottom:25,
        backgroundColor:'#ed553b',
        color:'#fff',
        borderRadius:50,
        padding:5,
        shadowOffset:{  width: -5,  height: 5,  },
        shadowColor: 'black',
        shadowOpacity: .5,
        alignItems:'center'
    },
    forParentsButtonText:{
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
    },
    modalView: {
        margin: 30,
        marginTop:170,
        backgroundColor: "#fff",
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
      }
})
export default connect(mapStateToProps,mapDispatchToProps)(ParentDashboardComponent)