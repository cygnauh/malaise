import React, { Component } from 'react';
import Lottie from 'react-lottie';
import loader from '../../../assets/animation/_loader.json';
import "./style.scss";

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notice : ''
        }
        this.lottieLoader = {
            loop: true,
            autoplay: true,
            animationData: loader,
            propsrendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
    }

    render() {
        return (
            <div className="Loader">
                <div className="Loader__animation">
                    <Lottie options={this.lottieLoader} />
                </div>
            </div>
        )
    }
}

export default Loader;