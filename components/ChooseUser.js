import React, { Component } from 'react';
import { FlatList, Text, View,StyleSheet} from 'react-native';
import {  ListItem } from 'react-native-elements';
import {USERS} from '../shared/Users'

class ChooseUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:USERS
        };
    }
    
    render() {
        const { navigate } = this.props.navigation;
        const renderUser = ({item})=>{
            return(
                <View style={{
                    padding: 4,
                    paddingLeft:8,
                    paddingRight:8,
                }}>
                    <ListItem
                        leftAvatar={{source:item.avatar}}
                        title={item.name}
                        onPress={()=>navigate('ChallengeList',{userId:item.id})}
                    />
                </View>
            )       
        }

        return (
            <View style={styles.userContainer}>
                <Text style={styles.headerText} >Who is Playing?</Text>
                <Text style={{
                    marginBottom:80,
                    marginTop:80 ,
                    color: 'white',
                    fontSize:20,
                    alignContent:'center'
                }}>
                
                </Text>
                <FlatList
                    
                    data={this.state.users}
                    renderItem={renderUser}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    // ...
    userContainer: {
        flex:1,
        backgroundColor: "#BDB2FF",
        
        
    },
    userCard: {
        marginTop:30,
        alignItems: 'center',
        alignContent:'center',
        backgroundColor: "#FFADAD",
        },
    headerText: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        marginTop:50,
        marginBottom:30
    }
  });
export default ChooseUser;