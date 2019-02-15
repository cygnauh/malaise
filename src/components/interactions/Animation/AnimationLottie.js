import React, { Component } from 'react';
import Lottie from 'react-lottie';
//import anim
import anim_3_2_regles from '../../../assets/animation/anim_3_2_regles'
import anim_3_6_google from '../../../assets/animation/anim_3.6_google'
import anim_3_1_jeu_jamais from '../../../assets/animation/anim_3_1_jeu-jamais'
import anim_3_3_verres from '../../../assets/animation/anim_3_3_verres'
import text_3_7_ending from '../../../assets/animation/text_3_7_ending'
import anim_3_4_boite from '../../../assets/animation/anim_3_4_boite'
import anim_3_4_5_puceau_google from '../../../assets/animation/anim_3_4_5_puceau_google'

import './AnimationLottie.scss'

class AnimationLottie extends Component {
    constructor(props){
        super(props);
        this.state = {
            render:'',
            timer: this.props.time,
            animations:{
                'anim_3_1_jeu_jamais':anim_3_1_jeu_jamais,
                'anim_3_2_regles':anim_3_2_regles,
                'anim_3_3_verres':anim_3_3_verres,
                'anim_3_6_google':anim_3_6_google,
                'text_3_7_ending':text_3_7_ending,
                'anim_3_4_boite':anim_3_4_boite,
                'anim_3_4_5_puceau_google':anim_3_4_5_puceau_google
            }
        };
        this.setAnim()
    }
    setAnim(){
        let anim = this.state.animations[this.props.name];
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
        }, this.props.timer)
    }
    render() {
        return (
            <div className="AnimationLottie">
                <div className="wrapper">
                    <Lottie options={this.defaultOptions}/>
                </div>
            </div>
        )
    }
}
export default AnimationLottie;
