import React, { Component } from 'react'
import {TouchableOpacity,Text,View, StyleSheet} from 'react-native';
 
 
const ScoreComponent =(props) => {
     return (
        <View style={{justifyContent: 'center',alignItems: 'center',backgroundColor:'red',borderRadius:100,width:150,height:150}} >
            <Text style={{color:'white',fontSize:20}}>Score</Text>
             <Text style={{color:'white',fontSize:20}}>{props.score}</Text>
         </View>
     )
 }
 export default ScoreComponent;
 
