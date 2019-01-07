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
            answer:[],
            personalizations:[],
            pQuestions:[],
            date:[],
            value: '',
            register:false

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // handleChange = (event) => {
    //     this.setState({answer: event.target.answer});
    //     console.log(this.state.answer)
    // }

    componentWillMount(){
        console.log(this.context)
    }
    handleChange(event) {
        this.setState({answer: event.target.value})
        console.log(this.state.answer);
    }

    handleSubmit(event){
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    personalizationQuestion(data){

        //reveice data, show first question, register anwser, show next question
        let questions=[];
        // let answers=[];
        let index = this.state.questionIndex;
        let perso = data.Episode.personalizations;

        for(let i=0; i<perso.length; i++){
            questions.push(
                <div key={i.toString()}>
                    <h2>
                        {perso[i].question}
                    </h2>
                    <input type="text"
                           value={this.state.answer}
                           placeholder={perso[this.state.questionIndex].answerLabel}
                           onChange={this.handleChange}
                           onKeyPress={(e) => this.validateAnswer(i, perso, e)}
                    />
                </div>)
        }
        // this.setState({
        //     pQuestions:data.Episode.personalizations
        // })
        //show first question
        // questions.push(
        //     <div key={index.toString()}>
        //         <h2>
        //             {perso[index].question}
        //         </h2>
        //         <input type="text"
        //                value={this.state.answer}
        //                placeholder={data.Episode.personalizations[this.state.questionIndex].answerLabel}
        //                onChange={this.handleChange}
        //                onKeyPress={(e) => this.validateAnswer(data.Episode.personalizations, e)}
        //         />
        //     </div>);

        // console.log(data)
        return questions
    }
    navigationDot(currentPosition, dotNumbers){
        let dots=[];
        for(let i=0; i<dotNumbers; i++){
            dots.push(
                <div key={i.toString()}
                     className={i <= currentPosition ? 'navigation-dot dot-fill': 'navigation-dot'}
                />
            )
        }
        return dots
    }
    validateAnswer = (i, params, event) => {
        let pers = []

        if(event.key === 'Enter'){
            console.log('enter press here! ')
            pers.push(this.state.personalizations);
            let objName = params[i].name;
            pers[objName]=this.state.answer;
            this.setState({
                register:true,
                pers:pers
            });
            this.context.setPersonalization(pers);
            setTimeout(()=>{console.log(this.context.personalizations)}
            ,0)

        }
    }
    render () {
        return(
            <div>
                {/*<UserContext.Consumer>*/}
                    {/*{({personalizations}) => (*/}
                        {/*<div>*/}
                            {/*<h1>this episode title is {personalizations[0]}!</h1>*/}
                        {/*</div>*/}
                    {/*)}*/}
                {/*</UserContext.Consumer>*/}
                <Query query={getEpisode} variables={{ id : this.state.episode }}>
                    {({ loading, error, data }) => {
                        if (loading) return (<div>loader</div>);
                        if (error) return `Error!: ${error}`;


                        return (
                            <div>{data.Episode.summary}
                                <div className="questionP">{this.personalizationQuestion(data)}</div>

                                <div className="nav-dot">{this.navigationDot(this.state.questionIndex,3)}</div>
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

