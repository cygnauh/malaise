import React, { Component } from 'react';
import $ from 'jquery';
import './style.scss';
import Timer from "../../elements/Timer/Timer";

class Talk extends Component {

    constructor(props) {
        super(props);
        this.state = {
            started: true,
        }
    }

    render() {

        return (
            <div className="Talk">
                <div className="Talk__timer">
                    <Timer activeTimer={this.state.started} />
                </div>
                <div className="Talk__container">
                    <div className="Talk__label">
                        On peut perdre sa virginité avec un cuni.
                    </div>
                    <div className="Talk__answers">
                        <ul className="Talk__choices">
                            <li className="Talk__choice">Pas d'accord !</li>
                            <li className="Talk__choice">Assez d'accord..</li>
                            <li className="Talk__choice">Totalement d'accord</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Talk;