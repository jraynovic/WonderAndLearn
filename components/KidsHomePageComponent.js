import React, { Component } from 'react'
import { TouchableOpacity, Text, TextInput, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, SafeAreaView, FlatList, ActivityIndicator, Alert } from 'react-native';
import { signUp, logIn, logInFailed } from '../redux/ActionCreators';
import { connect } from 'react-redux'
import * as Font from 'expo-font';
import rainbow from '../assets/rainbowHills.png'
import cat from '../assets/Cat.png'
import dinosaur from '../assets/Dinosaur.png'
import dog from '../assets/Dog.png'
import KidsMenuComponent from './KidsMenuComponent'


const mapDispatchToProps = {
    signUp: (user) => signUp(user),
    logIn: (user) => logIn(user),
    logInFailed: (err) => logInFailed(err)
}

const mapStateToProps = state => {
    return ({
        user: state.user
    })

}

class LogInComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fontsLoaded: false,
            loading: false
        }
    }

    customFonts = {
        Dosis: require('../assets/fonts/Dosis-Bold.ttf'),
    }

    async _loadFontsAsync() {
        await Font.loadAsync(this.customFonts)
        this.setState({ fontsLoaded: true })
    }

    componentDidMount() {
        this._loadFontsAsync()
    }

    RenderImage = (image) => {
        if (image === '../assets/rainbowHills.png') {
            return (
                <Image style={styles.image} source={rainbow} />
            )
        } else if (image === '../assets/Cat.png') {
            return (
                <Image style={styles.image} source={cat} />
            )
        } else if (image === '../assets/Dinosaur.png') {
            return (
                <Image style={styles.image} source={dinosaur} />
            )
        } else if (image === '../assets/Dog.png') {
            return (
                <Image style={styles.image} source={dog} />
            )
        }

    }
    changeScreen = (screen)=>{
        this.props.navigation.navigate(screen)
    }

    render() {
        if (!this.state.fontsLoaded) {
            return (
                <View>
                    <Text>Loading</Text>
                </View>
            )
        }
        const { navigate } = this.props.navigation;
        if (this.props.user.loading) {
            return (
                <View style={styles.main}>
                    <ActivityIndicator size="large" color="#ed553b" />
                </View>
            )
        }
        return (
            <View style={styles.main}>

                <Text style={styles.title}>WONDER + LEARN</Text>


                {this.RenderImage(this.props.user.selectedKid.image)}
                <Text style={styles.userName}>{this.props.user.selectedKid.name}</Text>
                {/* <Text>{JSON.stringify(this.props.user.selectedKid)}</Text> */}
                <View>
                    {/* <TouchableOpacity style={styles.row} onPress={()=>this.props.navigation.navigate('KidsChallenge')}> */}
                    <TouchableOpacity style={styles.row} onPress={()=>this.props.navigation.navigate('KidsChallenge')}>
                        <View style={styles.button}>
                            <View style={styles.row}>
                                <Text style={styles.buttonText}>CHALLENGES</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <View style={styles.button}>
                            <View style={styles.row}>
                                <Text style={styles.buttonText}>PROGRESS</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <View style={styles.button}>
                            <View style={styles.row}>
                                <Text style={styles.buttonText}>BADGES</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Bottom Menu */}
                {/* <KidsMenuComponent navProfile= {()=>this.changeScreen('profile')}/> */}
                <View style={styles.menu}> 
                    <KidsMenuComponent navProfile= {()=>this.changeScreen('Profile')}/>
                </View>

            </View>
        )

    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#f6d55c',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontFamily: 'Dosis', color: '#ed553b', marginTop: '10%', marginBottom: 40, fontSize: 40
    },
    userName: {
        fontFamily: 'Dosis', color: '#ed553b', marginBottom: 10, fontSize: 40
    },
    errMess: {
        fontFamily: 'Dosis', color: '#ed553b', marginTop: 10, fontSize: 24
    },
    fieldBackground: {
        width: '60%',
        marginTop: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.51)',
        opacity: 1,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.51)',
        borderRadius: 50,
        color: 'red'
    },
    fields: {
        padding: 5,
        opacity: 1,
        fontFamily: 'Dosis',
        color: '#ed553b',
        fontSize: 16,
        marginLeft: 10
    },
    logInButton: {
        width: 225,
        marginTop: 40,
        backgroundColor: '#ed553b',
        color: '#fff',
        borderRadius: 50,
        padding: 5,
        shadowOffset: { width: -5, height: 5, },
        shadowColor: 'black',
        shadowOpacity: .5,
        alignItems: 'center'
    },
    logInButtonText: {
        fontFamily: 'Dosis',
        color: '#fff',
        fontSize: 16,
    },
    button: {
        width: 225,
        marginTop: 20,
        backgroundColor: '#ed553b',
        color: '#fff',
        borderRadius: 10,
        padding: 5,
        // shadowOffset:{  width: -5,  height: 5,  },
        // shadowColor: 'black',
        // shadowOpacity: .5,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Dosis',
        color: '#fff',
        fontSize: 24,
    },
    row: {

        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    menu: {
        flexDirection: "row",
        alignItems: 'flex-end',
        marginTop:35
    },
    footer: {
        fontFamily: 'Dosis',
        color: '#ed553b',
        fontSize: 16,
        marginTop: 200,
        marginLeft: 8
    },
    image: {
        height: 186,
        width: 160,
        marginLeft: 10
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(LogInComponent)