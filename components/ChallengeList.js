import React, { Component } from 'react'
import { FlatList, Text, ScrollView,StyleSheet,View,TouchableOpacity} from 'react-native';
import { ListItem} from 'react-native-elements'
import {USERS} from '../shared/Users';
import {postCategory,fetchQuestionsByCategory} from '../redux/ActionCreators';
import {connect} from 'react-redux';
import Loading from './LoadingComponent';

const mapDispatchToProps = {
    fetchQuestionsByCategory:(category)=>fetchQuestionsByCategory(category)
}

class ChallengeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: USERS,
            challenges:'',
            loading: false
        }
    }
    componentDidMount() {

        this.setState({
            challenges: this.state.users.filter(user => user.id === this.props.navigation.getParam('userId'))[0],
            loading:false
        })
    }
    
    render() {
        if(this.state.loading){
            return <Loading/>
        }
        const { navigate } = this.props.navigation;
        const renderChallenges = ({ item })=>{
            return(
               <TouchableOpacity 
                style={styles.button}
                onPress={()=>{
                    this.setState({ loading:true })
                    this.props.fetchQuestionsByCategory(item.location).then(()=>navigate('Challenge',{selected:item.location}))
                    

                }}
                // {selected:item.location})
               >
                   <Text>{item.name}</Text>
               </TouchableOpacity>
                
            )
        }
        return (
            
                <View style={styles.userContainer}>
                    <View style={styles.textCenter}>
                        <Text style={styles.headerText} >{'Hi '+this.state.challenges.name+'!'}</Text>
                        <Text style={styles.bodyText}>pick a challenge!</Text>
                    </View>
                
                <View >
                <FlatList
                    
                    data={this.state.challenges.challenge}
                    renderItem={renderChallenges}
                    keyExtractor={item => item.name}
                />
                </View>
                </View>
           
        )
    }
}
const styles = StyleSheet.create({
    // ...
    userContainer: {
        flex:1,
        backgroundColor: "#FFADAD",
        alignItems: 'center',
        alignContent:'center',
    
    },
    textCenter: {
        alignItems: 'center',
        alignContent:'center',
        
        },
    headerText: {
      fontSize: 30,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      marginTop:50,
      marginBottom:30
    },
    bodyText: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
        // alignSelf: "center",
        marginTop:30,
        marginBottom:10
    },
    button: {
        alignItems: 'center',
        alignContent:'center',
        margin:30,
        backgroundColor: "#FFD6A5",
        borderRadius: 50,
        borderWidth:3,
        borderColor:'#FDFFB6',
        paddingVertical: 20,
        paddingHorizontal: 50,
        width:200
        },
  });
export default connect(null,mapDispatchToProps)(ChallengeList);