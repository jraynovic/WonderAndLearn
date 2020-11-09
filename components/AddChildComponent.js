import React, { Component } from 'react'
import { View, Text, FlatList, Modal,TextInput, StyleSheet, TouchableOpacity,Switch} from 'react-native'
import {  ListItem, Avatar, Icon } from 'react-native-elements';
import {baseUrl} from '../shared/baseUrl'
import {connect} from 'react-redux'
import { postUser } from '../redux/ActionCreators'


const mapStateToProps = state =>{
    return({
        categories: state.categories,
        users: state.users
    })
    
}

const mapDispatchToProps = {
    postUser: (user)=> postUser(user)
}

// RenderCategorys = (props)=>{


//     return(
//         <View>
//             <View style={{ flexDirection: 'row' }}>
                
//             </View>
//         </View>
        
//     )
// }


class AddChild extends Component {
    constructor(props){
        super (props)
        this.state = {
            modalVisible: false,
            users: '',
            name: '',
            image: '',
            score: 0,
            challenges: []
        }
    }

    componentDidMount() {
        this.setState({modalVisible:false})
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }

    handleSwitchChange = (category) =>{
        // alert(this.state[category])
        this.setState({[category]:!this.state[category]})
    }

    render() {

        const {modalVisible} = this.state;
        const renderCategories = ({ item }) => {
            if(this.state[item.category] === undefined){
                this.setState({[item.category]:false})
                // console.log(`${item.category} set to ${this.state[item.category]}`)
            }
            
            return (
                <View style={styles.modalInnerView}>
                    <View style={{marginRight:10,marginBottom:12}}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#767577" }}
                            thumbColor={this.state[item.category] ? "#CAFFBF" : "#f27474"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => this.handleSwitchChange(item.category)}
                            value={this.state[item.category]}
                        />
                    </View>
                    <Text style={styles.modalText}>{item.category}</Text>
                </View>
            )
        }

        const renderUser = ({ item }) => {
            return (
                <View style={{
                    padding: 4,
                    paddingLeft: 8,
                    paddingRight: 8,
                }}>

                    <ListItem bottomDivider
                        onPress={()=> alert(item.name)}
                    >
                        <Avatar source={{ uri: baseUrl+item.image }} />
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{'Challenges: '+item.challenges.map(challenge=>" "+challenge)}</ListItem.Subtitle>
                        </ListItem.Content>    
                        <ListItem.Chevron />
                    </ListItem>
                </View>
            )
        }
        
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>
                        Manage Users
                    </Text>
                </View>
                
                <View style={{
                    padding: 4,
                    paddingLeft: 8,
                    paddingRight: 8,
                }}>
                    <ListItem bottomDivider
                        onPress={() => this.setModalVisible(!modalVisible)}
                    >
                        <Avatar source={{ uri: baseUrl + 'newUser' }} />
                        <ListItem.Content>
                            <ListItem.Title>{'New User'} </ListItem.Title>
                            <ListItem.Subtitle>{'Click to add new user'}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </View>
                <FlatList
                    data={this.props.users.users}
                    renderItem={renderUser}
                    keyExtractor={item => item.id.toString()}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View>
                                <View style={styles.modalRow}>
                                    <Text style={styles.modalText}>
                                        Name:
                                    </Text>
                                    <TextInput
                                        style={styles.modalText}
                                        placeholder=' enter user name'
                                        onChangeText = {(text)=>this.setState({name:text})}
                                        value={this.state.name}
                                    />
                                </View>
                                <View style={styles.modalRow}>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={styles.modalText}>
                                            Select Image:
                                        </Text>
                                    </View>

                                    <TouchableOpacity 
                                        style={styles.modalIcon}
                                        onPress={()=>alert('Select Image')}    
                                    >
                                        <View style={styles.modalRow}>
                                            <Icon
                                                reverse
                                                name='image'
                                                type='font-awesome'
                                                color='#77a7f7'
                                            />
                                        </View>
                                    </TouchableOpacity>

                                </View>
                                <View style={styles.modalRow}>
                                    <FlatList
                                        data={this.props.categories.categories}
                                        renderItem={renderCategories}
                                        keyExtractor={item => item.id.toString()}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.buttonText}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#acf29d'
    },
    headerText:{
        fontSize: 24,
        color:'#fff',
        marginTop:50
    },
    headerView:{
        borderBottomColor:'#fff',
        borderBottomWidth:2,
        alignItems:'center',
        marginBottom:10
    },
    centerView:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
            }
    },modalInnerView:{
        borderBottomColor:'black',
        borderBottomWidth:1,
        flexDirection: 'row',
        alignItems:'center',
        margin:10,
        padding:10
    },
    modalText: {
        borderBottomWidth:1,
        borderBottomColor:'#f5f0f0',
        textAlign: "center",
        fontSize:20,
        textTransform:'capitalize',
        marginBottom:15
    },
    modalIcon:{
        marginLeft:10,
    },
    modalIconText:{
        fontSize:20
    },
    modalRow:{
        flexDirection:'row',
        alignItems:'center'      
    },
    button:{
        marginTop:10,
        borderWidth:2,
        borderColor: '#aec9f5',
        borderRadius:50,
        backgroundColor:'#77a7f7'
    },
    buttonText:{
        color:'#fff',
        fontSize:20,
        padding:15
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(AddChild);