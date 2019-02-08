import React, { Component } from 'react';
import "./style.scss";

class Timer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.activeTimer ? 'Timer Timer__active'  : 'Timer'}>
                <div className="Timer__container">
                    <div className="Timer__object" data-anim="base wrapper">
                        <div className="Timer__circle" data-anim="base left"></div>
                        <div className="Timer__circle" data-anim="base right"></div>
                    </div>
                    <div className="Timer__base"></div>
                    <div className="Timer__mask"></div>
                </div>
            </div>
        )
    }
}

export default Timer;