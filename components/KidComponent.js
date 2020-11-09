import React, { Component } from 'react'
import {Button,Text,View, TouchableOpacity,StyleSheet} from 'react-native';

class KidComponent extends Component {
    
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style = {styles.appButtonKid}
                    onPress = {()=>navigate('Challenge')}
            >
                    <Text style={styles.appButtonText}>Challenge!</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style = {styles.appButtonKid}
                    onPress = {()=>navigate('KidStats')}
            >
                    <Text style={styles.appButtonText}>Stats</Text>
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#9BF6FF',
      alignItems:'center'
    },
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
export default KidComponent;