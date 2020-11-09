import React from 'react'
import {View,Text, TouchableOpacity} from 'react-native'

function PreviewModal(props) {
    
    return (
        <View>
            <Image source={props.background}>
                <Text> Preview Component</Text>
                <TouchableOpacity
                onPress={()=> navigate('Templates')}>
                    <Text>Done</Text>
                </TouchableOpacity>
            </Image>
        </View>
    )
}
export default PreviewComponent
