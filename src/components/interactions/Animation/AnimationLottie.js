import React, { Component } from 'react';
import Lottie from 'react-lottie';
import boumboum from '../../../assets/animation/boumboum'

import { UserContext } from "./../../../store/UserProvider";
import {SoundContext} from "../../../store/SoundProvider";

class AnimationLottie extends Component {
    constructor(props){
        super(props);
        this.state = {
            render:'',
            timer: this.props.time
        };
        this.defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: boumboum,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
    }
    componentDidMount(){
        this.timer = setTimeout(()=>{
            if(this.props.onEnd) {this.props.onEnd(this.props.animationType)}
        }, this.props.timer)
        console.log(this.props.timer)
    };
    componentWillReceiveProps(){
        // this.setState({timer:this.props.timer});
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            if(this.props.onEnd) {this.props.onEnd(this.props.animationType)}
            console.log(this.props.animationType)
        }, this.props.timer)
        console.log(this.props.timer, "3")
    }
    render() {
        return (
            <div className="AnimationLottie">
                <div className="wrapper" style={{color:"red"}}>
                    HELLO THIS IS THE ANIM {this.props.name ? this.props.name : null}
                </div>
            </div>
        )
    }
}
AnimationLottie.contextType = UserContext;
export default AnimationLottie;
