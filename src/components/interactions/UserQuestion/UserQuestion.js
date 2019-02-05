import React, { Component } from 'react';
import "./UserQuestion.scss";

class UserQuestion extends Component {
    constructor(){
        super();
        this.state = {
            render:''
        };
        this.propositions =[
            "été en dehors de la France",
            "couché avec quelqu’un dans cette pièce",
            "été en garde à vue",
            "couché avec quelqu’un dans cette pièce"
        ]
    }

    render() {
        return (
            <div className="UserQuestion">
                <h2>Je n'ai jamais</h2>
                <div className="wrapper-input">
                    <input type="text"/>
                    <button>ok</button>
                </div>
                <div className="wrapper-proposition">
                    <div className="proposition">
                        été en dehors de la France
                    </div>
                </div>
            </div>
        )
    }
}

export default UserQuestion;
