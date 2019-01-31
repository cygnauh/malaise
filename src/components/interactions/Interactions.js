// COMPONENTS
import React, { Component } from 'react';
import MusicChoice from './MusicChoice/MusicChoice'
import Question from './Question/Question'
import DragDrop from './DragDrop/DragDrop'
// QUERY
import { Query } from "react-apollo";
import { getMusics } from '../../graphql/queries'
// API CONTEXT
import { SoundContext } from "../../store/SoundProvider";


class Interactions extends Component {
    constructor(props){
        super(props);
        this.state = {
            render:'',
            interactionPosition : 1,
            interaction : null,
            show : false
        };
        this.answers = this.props.anwsers.allAnswers
    }
    componentDidMount(){
        this.interactions = this.context.interactions;
        this.handleInteraction();
    };
    handleInteraction = () => {
        let inte = this.interactions.find(setting => setting.position === this.state.interactionPosition);
        if(this.interactions && this.state.interactionPosition){
            this.setState({
                interaction : inte
            }, ()=>{
                let test = this.context.playInteractionSound(this.state.interaction.name)
                setTimeout(()=>{
                    this.setState({
                    show : true
                })}, test)
            })
        }
    };
    handleAnswer = (value) => {
        let answer = (value) ? value : null;
        if(this.answers && this.state.interaction) {
            for(let i = 0; i <this.answers.length; i++) {
                if(this.answers[i].originInteraction &&
                    this.answers[i].originInteraction.id === this.state.interaction.id &&
                    this.answers[i].content === answer
                ) {
                    console.log(this.answers[i].destinationInteraction.position)
                    this.setState({
                        interactionPosition : this.answers[i].destinationInteraction.position,
                        show : !this.state.show
                    }, () =>{
                        this.handleInteraction()
                    })
                        ;
                    // return
                }
            }
        }
    };
    render() {
        return (
            <div className="Interactions" style={{backgroundColor:"blue"}}>
                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "musique" ?
                    // getMusics
                    <div>
                <Query
                    query={getMusics}
                    notifyOnNetworkStatusChange
                >
                    {({ loading, error, data, refetch, networkStatus }) => {
                        if (networkStatus === 4) return "Refetching!";
                        if (loading) return null;
                        if (error) return `Error!: ${error}`;
                        return (<div>

                                            <MusicChoice
                                                musics={data.allSounds}
                                                onMusicClicked={this.handleAnswer}
                                            />

                                </div>)
                    }}
                    </Query>
                </div>
                : null}
                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "question" && this.state.interaction.content ?
                    <Question question={this.state.interaction.question}
                              choices={this.state.interaction.content.split(',')}
                              onAnwserClicked={this.handleAnswer}
                    />
                    : null}

            </div>
        )
    }
}
Interactions.contextType = SoundContext;
export default Interactions;
