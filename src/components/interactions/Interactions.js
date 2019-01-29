import React, { Component } from 'react';
import Question from './Question/Question'
import DragAndDropDrink from './DragAndDropDrink/DragAndDropDrink'
import { SoundContext } from "../../store/SoundProvider";

class Interactions extends Component {
    constructor(props){
        super(props);
        this.state = {
            render:'',
            interactionPosition : 2,
            interaction : null
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
                console.log(this.state.interaction)
                this.context.playInteractionSound(this.state.interaction.name)
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
                {this.state.interaction && this.state.interaction.interactionType === "question" && this.state.interaction.content ?
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
