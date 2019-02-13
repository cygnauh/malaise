import React, { Component } from 'react';
import "./style.scss";
import Lottie from 'react-lottie';
import jingle from '../../../assets/animation/anim_1_1_jingle.json';
import { SoundContext } from "../../../store/SoundProvider";

class Jingle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: false
        }
        this.lottieJingle = {
            loop: false,
            autoplay: true,
            animationData: jingle,
            propsrendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

    }

    componentWillReceiveProps() {
        this.setState({
            start:true
        });
    }

    onComplete = () => {
        this.setState({
            start:false
        });

        this.props.onEnd();
    }

    render() {
        return (
            <div className="Jingle">
                {this.state.start ?
                    <Lottie
                        start={this.props.launchLottie}
                        options={this.lottieJingle}
                        eventListeners={
                            [
                                {
                                    eventName: 'complete',
                                    callback: obj => this.onComplete(),
                                },
                            ]
                        }
                    />
                    : null
                }
            </div>
        )
    }

}

/*Jingle.contextType = SoundContext;*/
export default Jingle;