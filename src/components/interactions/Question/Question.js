import React, { Component } from 'react';

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render:'',
            question:this.props.question,
            choices:this.props.choices
        };
    }
    choices = () => {
        let choices = [];
        for(let i = 0; i<this.state.choices.length;i++){
            choices.push(
                <div className="question-choice" onClick={this.onChoiceClicked(i)}>
                    {this.state.choices[i]}
                </div>
            )
        }
    };
    onChoiceClicked (index) {
        console.log(this.state.choices[index]) // emit the result
    }

    render() {
        return (
            <div className="Question">
                <h2 className="question-label">
                    {this.state.question}
                </h2>
                <div className="question-choices">
                    {this.choices()}
                </div>
            </div>
        )
    }
}
export default Question;