import React, { Component } from 'react';
import MusicChoice from './MusicChoice/MusicChoice'
import Question from './Question/Question'
import DragDrop from '../elements/DragDrop/DragDrop'
import { SoundContext } from "../../store/SoundProvider";

class Interactions extends Component {
    constructor(props){
        super(props);
        this.state = {
            render:'',
            interactionPosition : 2,
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
                    this.setState({
                        interactionPosition : this.answers[i].destinationInteraction.position
                    }, () => this.handleInteraction());
                    // return
                }
            }
        }
    };
    render() {
        return (
            <div className="Interactions">
                {this.state.show && this.state.interaction && this.state.interaction.interactionType === "music" && this.state.interaction.content ?
                    <MusicChoice
                        onAnwserClicked={this.handleAnswer}
                    />
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