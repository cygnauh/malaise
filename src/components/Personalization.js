import React, { Component } from 'react';
import { Query } from "react-apollo";
import { getEpisode } from '../graphql/queries'
import { UserContext } from "../store/UserProvider";

// 1) Fetch personalizations questions from data base : can use <Query> or <ApolloConsumer>
// 2) Display the questions
// 3) Register Anwser in the store

//TODO get the episode ID Select in the store
//TODO get the questions personalizations associated to the episode ID

class Personalisation extends Component {
    constructor() {
        super();
        this.state = {
            render:'',
            episode:'cjqbi7txpwd180167t0flrl7g'
        };
    }
    personalizationQuestion(data){
        // console.log(data)
        let questions=[];
        let personalizations = data.Episode.personalizations
        for(let i=0; i<personalizations.length; i++){
            questions.push(
                <div key={i.toString()}>
                    <h2>
                        {personalizations[i].question}
                    </h2>
                    <input type="text" placeholder={personalizations[i].answerLabel}/>
                </div>)
        }
        console.log(data)
        return questions
    }
    navigationDot(currentPosition, dotNumbers){
        let dot=[];
        return dot
    }
    render () {
        return(
            <div>personalization
                {/*<UserContext.Consumer>*/}
                    {/*{({episode}) => (*/}
                        {/*<div>*/}
                            {/*<h1>this episode title is {episode.id}!</h1>*/}
                        {/*</div>*/}
                    {/*)}*/}
                {/*</UserContext.Consumer>*/}
                <Query query={getEpisode} variables={{ id : this.state.episode }}>
                    {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return `Error!: ${error}`;


                        return (
                            <h1>hello{data.Episode.summary}
                                {this.personalizationQuestion(data)}
                                </h1>

                        // {this.createOption('location')}
                        );
                    }}
                </Query>

            </div>
        )
    }
}

export default Personalisation;

