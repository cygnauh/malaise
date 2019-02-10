import React, { Component } from 'react';
import Lottie from 'react-lottie';
//import anim
import anim_3_3_regles from '../../../assets/animation/anim_3.3_regles'
import anim_3_6_google from '../../../assets/animation/anim_3.6_google'

class AnimationLottie extends Component {
    constructor(props){
        super(props);
        this.state = {
            render:'',
            timer: this.props.time,
            animations:{
                'anim_3_3_regles':anim_3_3_regles,
                'anim_3_6_google':anim_3_6_google
            }
        };
        this.setAnim()
    }
    setAnim(){
        let anim = this.state.animations[this.props.name]
        // console.log(anim_3_3_regles)
        this.defaultOptions = {
            loop: false,
            autoplay: true,
            animationData: anim,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
    }
    componentDidMount(){
        this.timer = setTimeout(()=>{
            if(this.props.onEnd) {this.props.onEnd(this.props.animationType)}
        }, this.props.timer)
    };
    componentWillReceiveProps(){
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            if(this.props.onEnd) {this.props.onEnd(this.props.animationType)}
            console.log(this.props.animationType)
        }, this.props.timer)
    }
    render() {
        return (
            <div className="AnimationLottie">
                <div className="wrapper" style={{color:"red"}}>
                    HELLO THIS IS THE ANIM {this.props.name ? this.props.name : null}
                    <Lottie options={this.defaultOptions}/>
                </div>
            </div>
        )
    }
}
export default AnimationLottie;
