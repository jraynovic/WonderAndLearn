import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ScrollView, View,Text, TouchableOpacity,Modal,StyleSheet, TextInput, FlatList} from 'react-native'
import { ListItem, Icon } from 'react-native-elements';
import{fetchQuestionsByCategory} from '../../redux/ActionCreators'

const mapStateToProps = state =>{
    return{
        categories: state.categories,
        questions: state.questions
    }
}

const mapDispatchToProps = {
    fetchQuestionsByCategory:(category)=>fetchQuestionsByCategory(category)
}

class QuestionsAvailable extends Component {
    constructor(props) {
        super(props)
        state = {
            questions:''
        }
    }

    componentDidMount() {
        this.props.fetchQuestionsByCategory(this.props.navigation.getParam('category')).then(this.setState({questions:this.props.questions}))
    }
    ///get category
    render() {
        // const questions = this.props.questions.questions[this.props.navigation.getParam('category')]
        renderQuestions =({item}) =>{
            return(
                <ListItem
                style={{margin:10}}
                 title={item.question}
                />
            )
        }

        if(this.props.questions.questions){
            return (
                <ScrollView style ={{backgroundColor:'#FFD6A5'}}>
                    
                    <TouchableOpacity
                        onPress style={{ alignItems: 'center', marginLeft: 15,marginBottom:20,marginTop:70, flexDirection: 'row',justifyContent:'flex-start' }} 
                        onPress={()=>this.props.navigation.navigate('Templates',{category:this.props.navigation.getParam('category')})}
                        >
                        <Icon
                            name='plus-circle'
                            type='font-awesome'
                            color='#FFF'
                            
                        />
                        <Text style={{color:'#FFF',marginLeft:5}}>Add New Question</Text>
                    </TouchableOpacity>
                    <FlatList
    
                        data={this.props.questions.questions}
                        renderItem={renderQuestions}
                        keyExtractor={item => item.id.toString()}
                    />
                </ScrollView>
            )   
        }
        return(
            <ScrollView style ={{backgroundColor:'#FFD6A5'}}>
                <Text style={{ marginTop: 70,marginLeft:15,marginBottom:20 }}>No Questions available add now</Text>
                <TouchableOpacity
                    style={{ alignItems: 'center', marginLeft: 15, marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-start' }}
                    // onPress={()=>this.props.navigation.navigate('Templates')}
                    onPress={()=> alert(JSON.stringify(this.props.questions.questions))}
                >
                    <Icon
                        name='plus-circle'
                        type='font-awesome'
                        color='#FFF'

                    />
                    <Text style={{ color: '#FFF', marginLeft: 5 }}>Add New Question</Text>
                </TouchableOpacity>
            </ScrollView>
        )
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionsAvailable)