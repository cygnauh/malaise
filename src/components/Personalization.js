import React, { Component } from 'react';
import { Query } from "react-apollo";
import { getEpisode } from '../graphql/queries'
import { UserContext } from "../store/UserProvider";
import '../assets/styles/personalization.css';

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
            personalizations:[],
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
        this.setState({
            values: { ...this.state.values, [i]: event.target.value}
        });
        let pers = [];
            pers.push(this.state.personalizations);
            // let objName = params[i].name;
            // pers[objName] = this.state.value;
            pers[params[i].name] = this.state.values[i];
            this.setState({
                register:true,
                personalizations:pers
            });
            console.log(this.state.personalizations,"k");
            this.context.setPersonalization(pers);
            console.log(this.context.personalizations,"k");
            setTimeout(()=>{console.log(this.context.personalizations)},300)
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
                           placeholder={paramsP[this.state.questionIndex].answerLabel}
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

