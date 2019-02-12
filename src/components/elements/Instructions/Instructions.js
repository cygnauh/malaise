import React, { Component } from 'react';
import "./style.scss";
import $ from 'jquery';
import { SoundContext } from "../../../store/SoundProvider";
import Notice from '../../elements/Notice/Notice';

class Instructions extends Component {

    constructor(props){
        super(props);
        this.state = {
            indication:'Les indications seront ici ;)',
            show: false
        }
    }

    componentWillReceiveProps() {
        if(this.props.startInstruction === true) {
            let $currentInstructionStep = $('.Instruction--current');
            let stepCurrent = $currentInstructionStep.data('step');
            setTimeout(() => {
                this.playInstruction(stepCurrent);
            }, 1000)
        }
    }

    nextInstruction = () => {
        let $currentInstructionStep = $('.Instruction--current');
        let $nextInstructionStep = $currentInstructionStep.next();

        let stepNextStep = $nextInstructionStep.data('step');

        if(stepNextStep === 2) {
            setTimeout(() => {
                this.setState({
                    show: true
                })
            }, 600);
        } else {
            this.setState({
                show: false
            })
        }

        $currentInstructionStep.toggleClass('Instruction--current');
        $nextInstructionStep.toggleClass('Instruction--current');

        if($currentInstructionStep.is(':last-child')) {
            this.props.onEnd();
        } else {
            setTimeout(() => {
                this.playInstruction(stepNextStep);
            }, 600);
        }

    }

    playInstruction = (step) => {
        let instruction = this.context.playInstructions(step);
        instruction.on('end', () => {
            setTimeout(() => {
                this.nextInstruction();
            }, 500);
        });
    }

    render() {
        return(
            <div className="Instructions">
                <div className="Instructions__container">
                    <div className="Instruction Instruction--current" data-step="1">Bienvenue dans un nouvel épisode de malaise.</div>
                    <div className="Instruction" data-step="2">Laisse toi guider et suis les indications en bas de l'écran.</div>
                    <div className="Instruction" data-step="3">Pour une meilleure expérience, il est préférable de brancher ton casque.</div>
                </div>
                <div className={this.state.show && this.state.indication ? 'Notice__wrapper' : 'Notice__wrapper hide'}>
                    <Notice notice={this.state.indication ? this.state.indication : null} />
                </div>
            </div>
        )
    }
}

Instructions.contextType = SoundContext;
export default Instructions;