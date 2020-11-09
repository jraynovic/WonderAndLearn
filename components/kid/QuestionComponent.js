import React from 'react'
import {TouchableOpacity,Text,View, StyleSheet} from 'react-native';


const QuestionComponent = (props) => {
    return (
        <View>
            <Text style={{fontSize:30}}>
                {props.question}
            </Text>
        </View>
    )
}
export default QuestionComponent;
