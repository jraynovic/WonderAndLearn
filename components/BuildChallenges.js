import React, { Component } from 'react'
import { ScrollView, View,Text, TouchableOpacity,Modal,StyleSheet, TextInput} from 'react-native'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import {postCategory,fetchQuestionsByCategory} from '../redux/ActionCreators'
import Loading from './LoadingComponent';


const mapStateToProps = state =>{
    return{
        categories: state.categories
    }
}

const mapDispatchToProps = {
    postCategory: (id, newCategory)=>postCategory(id,newCategory),
    fetchQuestionsByCategory:(category)=>fetchQuestionsByCategory(category)
}

RenderCategories = (props) => {
    const {navigate} = props.props.navigation
    const handleChange =(category)=>{
        props.handleLoading()
        props.props.fetchQuestionsByCategory(category.category).
        then(()=>navigate('QuestionsAvailable',{category:category.category}))
        
    }
    return (
        props.props.categories.categories.map(category => {
            return (
                <TouchableOpacity 
                    key={category.id} style={styles.listItem}
                    
                    onPress = {()=>
                        handleChange(category)}
                >
                    <Text style={styles.listItemText}>{category.category}</Text>
                </TouchableOpacity>
              
            )
        })
    )
}

class BuildComponent extends Component{
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            newCategory:'',
            loading:false
        }
    }
    componentDidMount() {
        // alert(JSON.stringify(this.props.categories.categories))
        this.setState(
            {
                modalVisible:false,
                loading:false
            }
        )
    }
    

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }

    handleCategoryText = (text)=>{
        this.setState({newCategory:text})
    }

    handleNewCategory = (category) =>{
        this.props.postCategory(this.props.categories.categories.length,category)
        this.resetCategory()
        this.setModalVisible(!this.state.modalVisible)
    }

    resetCategory = () =>{
        this.setState({newCategory:''})
    }
    handleLoading =()=>{
        this.setState({loading:!this.state.loading})
    }

    render() {
        const { modalVisible } = this.state;
        if(this.state.loading){
            return <Loading/>
        }
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.seperator}>
                        <Text style={styles.headerText}>Available Categories</Text>
                    </View>
                    
                    <View>
                        <TouchableOpacity
                            style={{ alignItems: 'center', marginLeft: 15, marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-start' }}
                            onPress={() => this.setModalVisible(!modalVisible)}>
                            <Icon
                                name='plus-circle'
                                type='font-awesome'
                                color='#FFF'
                                onPress={() => this.setModalVisible(!modalVisible)}
                            />
                            <Text style={{ color: '#FFF', marginLeft: 5,fontSize:20 }}>Add New Category</Text>
                        </TouchableOpacity>
                        <View>
                            <RenderCategories props={this.props} handleLoading={()=>this.handleLoading()} />
                        </View>
                    </View>
                </ScrollView>
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
                            <Text style={styles.modalHeader}>Add New Category</Text>

                            <TouchableOpacity
                                style={{ ...styles.openButton,marginTop:15 }}
                                onPress={() => {
                                    this.setModalVisible(!modalVisible);
                                }}
                            >
                            <View >
                                {/* <Text style={styles.modalText}>Enter New Category:</Text> */}
                                <View style={styles.modalEntryView}>
                                    <TextInput
                                        style={styles.modalEntryText}
                                        placeholder='category...'
                                        onChangeText = {this.handleCategoryText}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity 
                                style={styles.buttonContainer}
                                onPress={()=>this.handleNewCategory(this.state.newCategory)}
                            >
                                <Text>Done</Text>
                            </TouchableOpacity>    
                                
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // ...
    container:{
        backgroundColor: '#eb8deb',
        flex:1,
        alignItems:'center'
    },
    headerText: {
        alignSelf:'center',
        marginTop:50,
        marginBottom:20,
        fontSize:24,
        color:'#fff',
        
    },
    seperator:{
        borderBottomColor:'#fff',
        borderBottomWidth:2,
        marginBottom:20
    },
    buttonContainer: {
    margin:30,
      backgroundColor: "#eb8deb",
      borderRadius: 50,
      borderWidth:3,
      borderColor:'#ed3bed',
      paddingVertical: 20,
      paddingHorizontal: 50
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    listItem:{
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#fc8d8d',
        width:300,
        height:50,
        margin:10,
        alignItems:'center',
        justifyContent:'center',
    },
    listItemText:{
        fontSize:18,
        textTransform:'uppercase',
        color:'#fff'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalHeader:{
          fontSize:30,
          borderBottomColor:'black'
      },
      modalText:{

          fontSize:20
      },
      modalEntryText:{
        fontSize:20,
        alignSelf:'center'
    },
    modalEntryView:{
        borderBottomColor:'#d9d6d4',
        borderBottomWidth:2,
        margin:20
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
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
    
  });
export default connect(mapStateToProps,mapDispatchToProps)(BuildComponent);