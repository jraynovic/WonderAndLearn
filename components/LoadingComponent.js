import React from 'react';
import {ActivityIndicator, StyleSheet,Text, View} from 'react-native';


Loading = () =>{
    return (
        <View style={styles.loadingView}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Loading . . .</Text>
        </View>
    );
}
const styles = StyleSheet.create(
    {
        loadingView:{
            alignItems: 'center',
            justifyContent: 'center',
            flex:1,
            backgroundColor:'#A0C4FF'
        },
        loadingText :{
            // color: '#00ff00',
            color: '#fff',
            fontSize:24,
            fontWeight: 'bold'
        }
    }
)
export default Loading;