import React, { Component } from 'react';
import $ from 'jquery';
import "./style.scss";

class Timer extends Component {

    constructor(props) {
        super(props);
        this.timer = React.createRef();
    }

    componentWillReceiveProps() {
        /*this.countDown();*/
    }

    countDown = () => {

        let count = 7;

        let x = setInterval(() => {
            count = count - 1;
            this.timer.current.innerHTML = count;
            if (count === 0) {
                clearInterval(x);
                this.timer.current.innerHTML = "0";
            }
        }, 1000);

    }

    render() {
        return (
            <div className={this.props.activeTimer ? 'Timer Timer__active'  : 'Timer'}>
                <div className="Timer__container">
                    <div className="Timer__object" data-anim="base wrapper">
                        <div className="Timer__circle" data-anim="base left"></div>
                        <div className="Timer__circle" data-anim="base right"></div>
                    </div>
                    <div className="Timer__base" ref={this.timer}></div>
                    <div className="Timer__mask"></div>
                </div>
            </div>
        )
    }
}

export default Timer;