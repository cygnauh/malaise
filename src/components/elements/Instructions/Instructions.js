import React, { Component } from 'react';
import "./style.scss";
import $ from 'jquery';
import { SoundContext } from "../../../store/SoundProvider";

class Instructions extends Component {

    constructor(props){
        super(props);
    }

    componentWillReceiveProps() {
        console.log(this.props.startInstruction);
        if(this.props.startInstruction === true) {
            let $currentInstructionStep = $('.Instruction--current');
            let stepCurrent = $currentInstructionStep.data('step');
            this.playInstruction(stepCurrent);
        }
    }

    nextInstruction = () => {
        let $currentInstructionStep = $('.Instruction--current');
        let $nextInstructionStep = $currentInstructionStep.next();

        let stepNextStep = $nextInstructionStep.data('step');

        $currentInstructionStep.toggleClass('Instruction--current');
        $nextInstructionStep.toggleClass('Instruction--current');

        if($currentInstructionStep.is(':last-child')) {
            this.props.onEnd();
        } else {
            setTimeout(() => {
                this.playInstruction(stepNextStep);
            }, 1000);
        }

    }

    playInstruction = (step) => {
        let instruction = this.context.playInstructions(step);
        instruction.on('end', () => {
            setTimeout(() => {
                this.nextInstruction();
            }, 1000);
        });
    }

    render() {
        return(
            <div className="Instructions">
                <div className="Instructions__container">
                    <div className="Instruction Instruction--current" data-step="1">Bienvenue dans un nouvel épisode de malaise.</div>
                    <div className="Instruction" data-step="2" data-notice="Les indications seront affichées ici !">Laisse toi guider et suis les indications en bas de l'écran.</div>
                    <div className="Instruction" data-step="3">Pour une meilleure expérience, il est préférable de brancher ton casque.</div>
                </div>
            </div>
        )
    }
}

Instructions.contextType = SoundContext;
export default Instructions;