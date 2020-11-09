import React from 'react'
import {Button,Text,View, TouchableOpacity,StyleSheet} from 'react-native';


RenderAnswers = (props)=>{
    determineFontSize = (answer) => {
        if(answer.length>4){
           return  {fontSize: 12, color: "#FFADAD", fontWeight: "bold", alignSelf: "center",textTransform: "uppercase"}
        }
        else{
            return  {fontSize: 20, color: "#FFADAD", fontWeight: "bold", alignSelf: "center",textTransform: "uppercase"}
        }  
    }

    return(
        
        <View>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                style={styles.appButtonKid}
                onPress={()=> props.next(props.answers.answerOne)}>
                    <Text style={determineFontSize(props.answers.answerOne.answer)}>{props.answers.answerOne.answer}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.appButtonKid}
                onPress={()=> props.next(props.answers.answerTwo)}>
                    <Text style={determineFontSize(props.answers.answerOne.answer)}>{props.answers.answerTwo.answer}</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                style={styles.appButtonKid}
                onPress={()=> props.next(props.answers.answerThree)}>
                    <Text style={determineFontSize(props.answers.answerOne.answer)}>{props.answers.answerThree.answer}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.appButtonKid}
                onPress={()=> props.next(props.answers.answerFour)}>
                    <Text style={determineFontSize(props.answers.answerOne.answer)}>{props.answers.answerFour.answer}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
        
}

const AnswerComponent = (props) => {
    return (
    <View>
        <TouchableOpacity style={{justifyContent: 'center',
            alignItems: 'center',marginTop:300}}>
              {RenderAnswers(props)}
        </TouchableOpacity>
    </View>
    )
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
        margin:10,
        backgroundColor: "#CAFFBF",
        borderRadius: 50,
        borderWidth:3,
        borderColor:'#FDFFB6',
        paddingVertical: 5,
        paddingHorizontal: 20,
        width:150,
        justifyContent: 'center',
        alignItems: 'center'
        },
    appButtonText: {
    //   fontSize: 14,
      color: "#FFADAD",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  });
export default AnswerComponent;
