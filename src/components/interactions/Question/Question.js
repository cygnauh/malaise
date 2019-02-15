import React, { Component } from 'react';
import './Question.scss';
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
                <div key={i} className="Question__choice" onClick={()=>this.onChoiceClicked(i)}>
                    {this.state.choices[i]}
                </div>
            )
        }
        // return choices
    };
    onChoiceClicked (index) {
        this.props.onAnwserClicked('question',this.state.choices[index]);
    }

    render() {
        return (
            <div className="Question">
                <div className="Question__container">
                    <h2 className="Question__label">
                        <span>{this.state.question}</span>
                    </h2>
                    <div className="Question__choices">
                        {this.questionChoices ? this.questionChoices : null}
                    </div>
                </div>
            </div>
        )
    }
}
export default Question;