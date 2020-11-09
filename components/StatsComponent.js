import React, { Component } from 'react'
import {View,Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl'

const mapStateToProps = state =>{
    return({
        users: state.users

    })
}

const HighlightedUser = (props)=>{
    return (
        <View style={styles.highlightedContainer}>
            <Text style={styles.highlightedTitle}>{props.name}</Text>
            <View>
                <Text style={styles.highlightedText}>Current score: {props.score} </Text>
            </View>
        </View>
    )
}


class StatsComponent extends Component {
    constructor(props){
        super (props);
        this.state = { 
            selectedUser:{},
            selectedTotalScore:0,
         }
    }
    
    componentDidMount() {
        const score= this.props.users.users[0].score
        this.setState(
            { 
                selectedUser: this.props.users.users[0],
                selectedTotalScore: score
            }
        )
    }
    render() {
        const renderStats = ({item}) => {
            return(
                <View style={styles.listItem}>
    
                  <ListItem bottomDivider
                        onPress={() => this.setState({selectedUser:item, selectedTotalScore:item.score})}
                    >
                        <Avatar source={{ uri: baseUrl + item.image }} />
                        <ListItem.Content>
                            <ListItem.Title>{item.name} </ListItem.Title>
                            {/* <ListItem.Subtitle>{'Click to add new user'}</ListItem.Subtitle> */}
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </View>
            )
        }
        return (
            <View style={styles.mainBg}>
                <HighlightedUser name ={this.state.selectedUser.name} score={this.state.selectedTotalScore}/>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonGroup}>
                        <Text style={styles.buttonGroupText}>Current</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonGroup}>
                        <Text style={styles.buttonGroupText}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonGroup}
                        onPress={()=>this.setState({selectedTotalScore:0})}
                    >
                        <Text style={styles.buttonGroupText}>Reset</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.props.users.users}
                    renderItem={renderStats}
                    keyExtractor={item => item.id.toString()}
                /> 
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainBg: { 
        flex: 1,
        backgroundColor: '#A0C4FF',
        alignItems:'center',
    },
    listItem:{
        width:350,
        marginTop:5
    },
    highlightedContainer:{
        paddingTop: 70,
        alignItems:'center',
        width:'100%',
        borderBottomWidth:2,
        borderColor:'#fff'
    },
    highlightedTitle:{
        fontSize:50,
        padding:10,
        // backgroundColor:'#77a7f7',
        marginBottom:60,
        color:'#fff'
    },
    highlightedText:{
        fontSize:30,
        color:'#fff',
        marginBottom:10
    },
    buttonContainer:{
        flexDirection:'row',
        marginBottom:10
    },
    buttonGroup:{
        backgroundColor: '#77a7f7',
        paddingTop:5,
        paddingBottom:5,
        flex:3,
        alignItems:'center',
        borderWidth:1,
        borderColor: '#3a7ef0'
    },
    buttonGroupText:{
        fontSize:24,
        color:'#fff'

    }
})
export default connect(mapStateToProps) (StatsComponent);