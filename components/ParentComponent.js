import React, { Component } from 'react'
import {Button,Text,View, TouchableOpacity,StyleSheet} from 'react-native';

class ParentComponent extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{flex:1,backgroundColor:'#9BF6FF',
            justifyContent: 'center',
            alignItems: 'center'}}>
            <TouchableOpacity
                    style = {styles.appButtonKid}
                    onPress = {()=>navigate('BuildChallenges')} //buildcomponent
            >
                    <Text style={styles.appButtonText}>Challenges</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                    style = {styles.appButtonKid}
                    onPress = {()=>navigate('Custom')}
            >
                    <Text style={styles.appButtonText}>Custom</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
                    style = {styles.appButtonKid}
                    onPress = {()=>navigate('Stats')}
            >
                    <Text style={styles.appButtonText}>Stats</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style = {styles.appButtonKid}
                    onPress = {()=>navigate('AddChild')}
            >
                    <Text style={styles.appButtonText}>Add Child</Text>
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
export default ParentComponent;