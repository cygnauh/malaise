import React, { Component } from 'react';
import "./UserQuestion.scss";

class UserQuestion extends Component {
    constructor(){
        super();
        this.state = {
            render:'',
            proposition: ''
        };
        this.propositions =[
            "été en dehors de la France",
            "couché avec quelqu’un dans cette pièce",
            "été en garde à vue",
            "couché avec quelqu’un dans cette pièce"
        ]
    }
    displayProposition = () => {
        let propositions = []
        for (let i = 0; i<this.propositions.length; i ++){
            propositions.push(
                <div key={i} onClick={()=>this.propositionSelected(this.propositions[i])}>
                    {this.propositions[i].toString()}
                </div>
            )
        }
        return propositions
    };
    propositionSelected = (value) => {
        this.setState({
            proposition : value
        })
    };
    inputChange = (e) => {
        this.setState({
            proposition : e.target.value
        })
    };
    validateProposition = () => {
        console.log(this.state.proposition)
        if(this.state.proposition !== ''){
            this.props.drinkActionEnd()
        }
    };

    render() {
        return (
            <div className="userQuestion">
                <div className="userQuestion__wrapper-input">
                    <label className="userQuestion__input-label">Je n'ai jamais</label>
                    <input type="text" value={this.state.proposition} onChange={this.inputChange}/>
                    <button onClick={this.validateProposition}>ok</button>
                </div>
                <div className="wrapper-proposition">
                    <div className="proposition">
                        {this.displayProposition()}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserQuestion;
