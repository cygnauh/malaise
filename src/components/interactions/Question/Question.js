import React, { Component } from 'react';

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render:'',
            question:this.props.question,
            choices:this.props.choices
        };
        this.choices();
    }
    choices = () => {
        this.questionChoices = [];
        for(let i = 0; i<this.state.choices.length;i++){
            this.questionChoices.push(
                <div key={i} className="question-choice" onClick={()=>this.onChoiceClicked(i)}>
                    {this.state.choices[i]}
                </div>
            )
        }
        // return choices
    };
    onChoiceClicked (index) {
        this.props.onAnwserClicked(this.state.choices[index]);
    }

    render() {
        return (
            <div className="Question">
                <h2 className="question-label">
                    QUESTION
                    {this.state.question}
                </h2>
                <div className="question-choices">
                    {this.questionChoices ? this.questionChoices : null}
                </div>
            </div>
        )
    }
}
export default Question;