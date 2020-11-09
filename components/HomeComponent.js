import React, { Component } from 'react'
import {TouchableOpacity,Text,View, StyleSheet} from 'react-native';

class HomeComponent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{flex:1,backgroundColor:'#A0C4FF',
            justifyContent: 'center',
            alignItems: 'center'}}>
                <Text style={{marginTop:80,fontSize:30}}>
                    I am a.....
                </Text>
                <TouchableOpacity
                    style = {styles.appButtonContainer}
                    onPress = {()=>navigate('Parent')}
                >
                    <Text style={styles.appButtonText}>Parent</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.appButtonKid}
                    onPress = {()=>navigate('ChooseUser')}
                >
                    <Text style={styles.appButtonText}>{'     '}Kid{'     '}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.appButtonKid}
                    onPress = {()=>navigate('SignUp')}
                >
                    <Text style={styles.appButtonText}>{'     '}SignUp{'     '}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.appButtonKid}
                    onPress = {()=>navigate('LogIn')}
                >
                    <Text style={styles.appButtonText}>{'     '}login{'     '}</Text>
                </TouchableOpacity>
                

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
export default HomeComponent;
