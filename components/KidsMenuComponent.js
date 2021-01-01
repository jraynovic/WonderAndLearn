import React , { useState, useEffect } from 'react'
import { TouchableOpacity, Text, TextInput, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, SafeAreaView, FlatList, ActivityIndicator, Alert } from 'react-native';
import * as Font from 'expo-font';
import HomeIcon from '../assets/HomeIcon.png'
import Challenges from '../assets/Challenges.png'
import KidsProgress from '../assets/KidsProgress.png'
import MedalIcon from '../assets/MedalIcon.png'

const KidsMenuComponent =(props)=> {

    customFonts = {
        Dosis: require('../assets/fonts/Dosis-Bold.ttf'),
    }

    const [fontsLoaded, setFont] = useState(false);
    const _loadFontsAsync= async()=> {
        await Font.loadAsync(this.customFonts)
            setFont(true)
    }
    useEffect(() => {
        _loadFontsAsync()
      });
    if(!fontsLoaded){
        return(
            <View style={styles.main}>
                <Text>LOADING</Text>
            </View>
        )
    }
    return (
        <View style={styles.main}>
            <View style={styles.line}></View>
            <View style={styles.menuRow}>


                <TouchableOpacity onPress={props.navProfile}>
                    <View style={styles.menuItem}>
                        <Image style={styles.image} source={HomeIcon} />
                        <Text style={styles.menuText}>HOME</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.challenge}>
                    <View style={styles.menuItem}>
                        <Image style={styles.image} source={Challenges} />
                        <Text style={styles.menuText}>CHALLENGES</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.progress}>
                    <View style={styles.menuItem}>
                        <Image style={styles.image} source={KidsProgress} />
                        <Text style={styles.menuText}>PROGRESS</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.badges}>
                    <View style={styles.menuItem} >
                        <Image style={styles.imageMedal} source={MedalIcon} />
                        <Text style={styles.menuText}>BADGES</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    main:{
        flex:1,
        //marginTop:10,
        backgroundColor:'#fce9a2',
        width:'100%',
        //backgroundColor:'#fff',
        padding:5
    },
    menuRow: {
        flexDirection: "row",
        marginTop:10,
        justifyContent:'space-around'

    },
    row:{
        flexDirection:'row'
    },
    menuItem:{
        // width:'100%',
        alignItems: 'center',
        justifyContent:'center'
    },
    line:{
        borderColor:'#fff',
        borderWidth:.3
    },
    menuText:{
        color:'#ed553b',
        fontSize:10,
        fontFamily: 'Dosis',
        marginTop:5
    },
    image:{
        height:40,
        width:40,
    },
    imageMedal:{
        height:40,
        width:28,
    }
})

export default KidsMenuComponent
