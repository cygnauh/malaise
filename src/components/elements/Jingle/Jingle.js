import React, { Component } from 'react';
import "./style.scss";
import Lottie from 'react-lottie';
import jingle from '../../../assets/animation/anim_1_1_jingle.json';

class Jingle extends Component {
    constructor(props) {
        super(props);
        this.defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: jingle,
            propsrendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }
    }

    render() {
        return (
            <div className="Jingle">
                <Lottie options={this.defaultOptions} />
            </div>
        )
    }

}

export default Jingle;