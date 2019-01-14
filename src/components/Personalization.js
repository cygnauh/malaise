import React, { Component } from 'react';
import { Query } from "react-apollo";
import { getEpisode } from '../graphql/queries'
import { UserContext } from "../store/UserProvider";
import Presentation from "./interactions/Presentation/Presentation";
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
        // console.log(this.context);
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
        setTimeout(()=>{
            // console.log(this.context.personalizations)
        },0)
    };
    personalizationQuestion = (data) => {
        //reveice data, show first question, register anwser, show next question
        let questions=[];
        let paramsP=null;
        if(data.Episode&&data.Episode.personalizations){
            // console.log(data.Episode.personalizations)
            paramsP = data.Episode.personalizations;
            // for(let i=0; i<paramsP.length; i++){
            //     questions.push(
            //         <div key={i.toString()}>
            //             <h2>
            //                 {paramsP[i].question}
            //             </h2>
            //             <input type="text"
            //                    value={this.state.values[i] ? this.state.values[i] : ""}
            //                    placeholder={paramsP[i].answerLabel}
            //                    onChange={(e)=>this.handleChange(i,paramsP, e)}
            //                    onKeyPress={(e) => this.validateAnswer(i, paramsP, this.state.values[i], e)}
            //             />
            //         </div>)
            // }
        }
        // return questions
    };
    validateAnswer = (i, params, answer, event) => {
        // if(event.key === 'Enter'){
        //     console.log('enter press here! ');
        // }
        // ----------- TODO go next question animation
    };
    // fillWithDefaultNames = (data) => {
    //     let pers = [];
    //     // pers.push(this.state.personalizations);
    //     console.log(data.Episode.personalizations);
    //     for(let i=0;i<data.Episode.personalizations.length;i++){
    //         pers[data.Episode.personalizations[i].name] = data.Episode.personalizations[i].default;
    //     }
    //     this.context.setPersonalization(pers);
    //     setTimeout(()=>{console.log(this.context.personalizations)},0)
    // };
    presentationQuestions = (data) => {
        let questions = [];
        if(data){
            // console.log('data');
            // console.log(data.Episode.personalizations);
            for(let i = 0; i<data.Episode.personalizations.length;i++){
                if(data.Episode.personalizations[i].name!=="hote"){
                    questions.push(data.Episode.personalizations[i])
                }
            }
        }
        // console.log(questions);
        return questions
    };
    render () {
        return(
            <div>
                {/*<UserContext.Consumer>*/}
                    {/*{({personalizations}) => (*/}
                        {/*<div>*/}
                            {/*<h1>test {personalizations.hote}!</h1>*/}
                        {/*</div>*/}
                    {/*)}*/}
                {/*</UserContext.Consumer>*/}
                {
                    this.state.episode?
                        (<Query query={getEpisode} variables={{ id : this.state.episode }}>
                        {({ loading, error, data }) => {
                            if (loading) return (<div>loader</div>);
                            if (error) return `Error!: ${error}`;
                            // this.presentationQuestions(data)
                            return (
                                <div>
                                    {/*{data.Episode&&data.Episode.summary?data.Episode.summary:null}*/}
                                    <div className="questionP">{this.personalizationQuestion(data)}
                                        <Presentation questions={this.presentationQuestions(data)} />
                                        {/*<Presentation questions={"hello"} />*/}
                                    </div>

                                    {/*<button onClick={()=>this.fillWithDefaultNames(data)}>passer</button>*/}

                                    {/*<div className="nav-dot">{this.navigationDot(this.state.questionIndex,3)}</div>*/}
                                </div>
                            );
                        }}
                        </Query>):null
                }

            </div>
        )
    }
}
Personalization.contextType = UserContext;
export default Personalization;