import React, { Component } from 'react';
import { Query } from "react-apollo";
import { getEpisode } from '../graphql/queries'
import { UserContext } from "../store/UserProvider";
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
            episode:'cjqbi7txpwd180167t0flrl7g',
            questionIndex:0,
            values:[],
            // personalizations:[],
            pQuestions:[],
            date:[],
            value: '',
            register:false

        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    // handleChange = (event) => {
    //     this.setState({answer: event.target.answer});
    //     console.log(this.state.answer)
    // }

    componentWillMount(){
        console.log(this.context)
    }
    handleChange = (i, params, event) => {
        let pers = [];
        this.setState({
            values: { ...this.state.values, [i]: event.target.value}
        },()=>{
            // pers.push(this.state.personalizations);
            pers[params[i].name] = this.state.values[i];
            this.context.setPersonalization(pers);
        });
        setTimeout(()=>{console.log(this.context.personalizations)},0)
    };
    personalizationQuestion = (data) => {
        //reveice data, show first question, register anwser, show next question
        let questions=[];
        let paramsP = data.Episode.personalizations;
        for(let i=0; i<paramsP.length; i++){
            questions.push(
                <div key={i.toString()}>
                    <h2>
                        {paramsP[i].question}
                    </h2>
                    <input type="text"
                           value={this.state.values[i] ? this.state.values[i] : ""}
                           placeholder={paramsP[i].answerLabel}
                           onChange={(e)=>this.handleChange(i,paramsP, e)}
                           onKeyPress={(e) => this.validateAnswer(i, paramsP, this.state.values[i], e)}
                    />
                </div>)
        }
        return questions
    };
    // navigationDot(currentPosition, dotNumbers){
    //     let dots=[];
    //     for(let i=0; i<dotNumbers; i++){
    //         dots.push(
    //             <div key={i.toString()}
    //                  className={i <= currentPosition ? 'navigation-dot dot-fill': 'navigation-dot'}
    //             />
    //         )
    //     }
    //     return dots
    // }
    validateAnswer = (i, params, answer, event) => {
        // if(event.key === 'Enter'){
        //     console.log('enter press here! ');
        // }
        // ----------- TODO go next question animation
    };
    fillWithDefaultNames = (data) => {
        let pers = [];
        // pers.push(this.state.personalizations);
        console.log(data.Episode.personalizations);
        for(let i=0;i<data.Episode.personalizations.length;i++){
            pers[data.Episode.personalizations[i].name] = data.Episode.personalizations[i].default;
        }
        this.context.setPersonalization(pers);
        setTimeout(()=>{console.log(this.context.personalizations)},0)
    };
    render () {
        return(
            <div>
                <UserContext.Consumer>
                    {({personalizations}) => (
                        <div>
                            <h1>test {personalizations.hote}!</h1>
                        </div>
                    )}
                </UserContext.Consumer>
                <Query query={getEpisode} variables={{ id : this.state.episode }}>
                    {({ loading, error, data }) => {
                        if (loading) return (<div>loader</div>);
                        if (error) return `Error!: ${error}`;
                        return (
                            <div>{data.Episode.summary}
                                <div className="questionP">{this.personalizationQuestion(data)}</div>
                                <button onClick={()=>this.fillWithDefaultNames(data)}>passer</button>

                                {/*<div className="nav-dot">{this.navigationDot(this.state.questionIndex,3)}</div>*/}
                            </div>
                        );
                    }}
                </Query>
            </div>
        )
    }
}
Personalization.contextType = UserContext;
export default Personalization;

