import React, { Component } from 'react';
import { Query } from "react-apollo";
import { getEpisode } from '../graphql/queries'
import { UserContext } from "../store/UserProvider";
import Presentation from "./interactions/Presentation/Presentation";
import Doorbell from './interactions/Doorbell/Doorbell'
import Loader from './elements/Loader/Loader'
import ErrorScreen from './elements/ErrorScreen/ErrorScreen'
import './personalization.scss';



// 1) Fetch personalizations questions from data base : can use <Query> or <ApolloConsumer>
// 2) Display the questions
// 3) Register Anwser in the store

//TODO get the episode ID Select in the store
//TODO get the questions personalizations associated to the episode ID

class Personalization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render:'',
            episode:'cjqwfe1kj1j2x0122tixfvb5i',
            values:[],
            personalizations:[],
            value: '',
            register:false,
            componentIndex:1

        };
    }
    handleChange = (i, params, value) => {
        this.setState({
            values: [ ...this.state.values, {role:params[i].name, name:value, glass:0}]
        },()=>{
             this.context.setPersonalization(this.state.values);
        });
    };
    presentationQuestions = (data) => {
        let questions = [];
        if(data){
            for(let i = 0; i<data.Episode.personalizations.length;i++){
                if(data.Episode.personalizations[i].name!=="hote"){
                    questions.push(data.Episode.personalizations[i])
                }
            }
        }
        return questions
    };
    goToPresentation = () => {
        this.setState({
            componentIndex:2
        })
    };
    render () {
        return(
            <div className='Personalization'>
                {
                    this.state.episode?
                        (<Query query={getEpisode} variables={{ id : this.state.episode }}>
                            {({ loading, error, data }) => {
                                if (loading) return (<Loader/>);
                                if (error) return (<ErrorScreen/>);
                                return (
                                    <div className="Personalization__container">
                                        <div className={this.state.componentIndex === 1?'Personalization__doorbell':'Personalization__doorbell hide'}>
                                            <Doorbell onDoorbellPressed={this.goToPresentation} onHostRegister={this.handleChange}/>
                                        </div>
                                        {this.state.componentIndex === 2 ?
                                            <div className={this.state.componentIndex === 2?'questionP presentation__container':'questionP presentation__container hide'}>
                                                <Presentation
                                                    questions={this.presentationQuestions(data)}
                                                    onPresentationEnd={this.props.nextComponent}
                                                    onNameFilled={this.handleChange}
                                                    host={this.context.personalizations.find(setting=>setting.role === 'hote').name}
                                                />
                                            </div>
                                            : null}
                                    </div>
                                );
                            }}
                        </Query>
                    ):null
                }
            </div>
        )
    }
}
Personalization.contextType = UserContext;
export default Personalization;