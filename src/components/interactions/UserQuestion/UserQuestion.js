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
            "volé dans un magasin"
        ]
    }
    displayProposition = () => {
        let propositions = []
        for (let i = 0; i<this.propositions.length; i ++){
            propositions.push(
                <div key={i}
                     className={this.propositions[i] === this.state.proposition ? 'proposition clicked':'proposition'}
                     onClick={()=>this.propositionSelected(this.propositions[i])}>
                {/*<div key={i} className="proposition" onClick={()=>this.propositionSelected(this.propositions[i])}>*/}
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
            this.props.drinkActionEnd('user question')
        }
    };

    render() {
        return (
            <div className="userQuestion">
                <div className="userQuestion__wrapper">
                    <div className="userQuestion__input_wrapper">
                        <label className="userQuestion__label">Je n'ai jamais...</label>
                        <input className="userQuestion__input" type="text" value={this.state.proposition} onChange={this.inputChange} placeholder={'entre ta proposition'}/>
                        <button className="userQuestion__valid" onClick={this.validateProposition}>ok</button>
                    </div>
                    <div className="wrapper-proposition">
                        <div className="propositions">
                            {this.displayProposition()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserQuestion;
