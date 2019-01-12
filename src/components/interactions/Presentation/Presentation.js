

import React, { Component } from 'react';
import styled from 'styled-components'
import './presentation.scss';


class Presentation extends Component {
    constructor() {
        super();
        this.state = {
            render:'',
            guestsNb:15,
            greetingNb:4,
            positions:null,
            color:'blue',
            intervalExtremeties:[],
            hote:"Alice", // to be update with the user data
            dotClicked:[],
            currentInput:'',
            displayInput:false,
            inputNotEmpty:false,
            personalizationsQuestions:[
                {question:"question koko",answerLabel:"aaaa"},
                {question:"question koko 2",answerLabel:"aaaa 2"},
                {question:"question koko 3",answerLabel:"aaaa 3"},
                {question:"question koko 4",answerLabel:"aaaa 4"}
                ] // this.props.personalization data
        };
    }
    componentDidMount(){
        this.calculateIntervalPositions(100,200, 2, 2)
    }
    calculateIntervalPositions=(margeW, margeH, dispersionX, dispersionY)=>{
        let height = window.innerHeight;
        let width = window.innerWidth;
        // random value interval, random dispersion --> top: random(min, max); left:random(min, max);
        let extremeties = []; // top, left extremities
        for(let i=0;i<dispersionX;i++){
            for(let j=0;j<dispersionY;j++){
                extremeties.push({
                        minX:Math.floor(margeW + (((width-(2*margeW)) / dispersionX) * i)),
                        maxX:Math.floor(margeW + (((width-(2*margeW)) / dispersionX) * (i+1))),
                        minY:Math.floor(margeH + (((height-(2*margeH)) / dispersionY) * j)),
                        maxY:Math.floor(margeH + (((height-(2*margeH)) / dispersionY) * (j+1)))
                    },
                );
            }
        }
        this.setState({
            intervalExtremeties:extremeties
        },()=>{
            this.calculatePositions()
        })
    };
    calculatePositions(){
        let pos = [];
        for(let i=0;i<this.state.guestsNb;i++){
            let random = Math.floor((Math.random() * this.state.intervalExtremeties.length)); // interval extremities
            let minY = this.state.intervalExtremeties[random].minY;
            let maxY = this.state.intervalExtremeties[random].maxY;
            let minX = this.state.intervalExtremeties[random].minX;
            let maxX = this.state.intervalExtremeties[random].maxX;
            let positionTop = Math.floor(Math.random() * (maxY-minY+1)) + minY;
            let positionLeft = Math.floor(Math.random() * (maxX-minX+1)) + minX;
            if(positionTop>window.innerHeight-80){
                positionTop = positionTop/2
            }
            if(positionLeft>window.innerHeight-80){
                positionLeft = positionLeft/1.2
            }
            pos.push({top:positionTop+'px', left:positionLeft+'px'})
        }
        this.setState({
            positions:pos
        })
    }
    displayGuest(){
        let guest=[];
        for(let i=0;i<this.state.guestsNb;i++){
            let topPos = this.state.positions[i].top;
            let leftPos = this.state.positions[i].left;
            if(i===this.state.guestsNb-1){
                let firstLetter = this.state.hote.charAt(0);
                guest.push(
                    <div key={i.toString()}
                         className="Presentation_person hote"
                         style={{
                             top:topPos,
                             left:leftPos}}>
                        <span>{firstLetter}</span>
                    </div>)
            }else if(i<this.state.greetingNb){
                guest.push(
                    <div key={i.toString()}
                         className={this.state.dotClicked.indexOf(i) === -1 ? "Presentation_person" : "Presentation_person hide"}
                         style={{
                             background:'white',
                             top:topPos,
                             left:leftPos}}
                         onClick={(e)=>this.onDotClicked(i, topPos, leftPos, e)} // send the refs
                    />)
            }else{
                guest.push(
                    <div key={i.toString()}
                         className="Presentation_person"
                         style={{
                             background:'rgba(255,255,255, 0.2)',
                             top:topPos,
                             left:leftPos}}
                         onClick={this.state.greetingNb>i?this.test:null}
                    />)
            }
        }
        return guest
    };
    onDotClicked=(i, posTop, posLeft, e)=>{
        let dots = this.state.dotClicked;
        dots.push(i);
        this.setState({
            dotClicked: dots
        }, ()=>{
            console.log(this.state.dotClicked)
        })
        // console.log(posTop, posLeft);
        this.setState({displayInput:true}, console.log("ok"));
        setTimeout(()=>{
            this.displayPersonalizationInput(posTop, posLeft)
        }, 1)
    };
    displayPersonalizationInput=(posTop, posLeft)=>{
        // get the questions,
        // get a random number in the questions empty --> check in the store if personalization already set
        // first : display one question
        let form = this.state.personalizationsQuestions[2];
        let questionInput = [];
        console.log(posTop, posLeft)
        setTimeout(()=>{
            if(posTop&&posLeft){
                questionInput.push(
                    <div key={1}
                         className='questionInput__container'
                         style={{
                             top:posTop,
                             left:posLeft}}>
                        <h2>
                            {form.question}
                        </h2>
                        <div className={this.state.displayInput ? 'input__container animate-input': 'input__container'}>
                            <div className="input-border">
                                <input type="text"
                                       value={this.state.currentInput}
                                       placeholder={form.answerLabel}
                                       onChange={this.handleChange}
                                />
                            </div>
                            <button className={this.state.inputNotEmpty ? 'btn btn__input border-white': 'btn btn__input border-white empty'}
                                    onClick={(e)=>this.validateInput(posTop, posLeft, e)}>
                                <span>OK</span>
                            </button>
                        </div>
                        {/*hello*/}
                    </div>);
                return questionInput
            }
        }, 100)

        // console.log(questionInput);


    };
    handleChange = (event) => {
        this.setState({
            currentInput: event.target.value
        },()=>{
            console.log(this.state.currentInput.length>0)
            if(this.state.currentInput.length>0){
                this.setState({
                    inputNotEmpty:true
                })
            }else{
                this.setState({
                    inputNotEmpty:false
                })
            }

        });

    };
    validateInput = (posTop, posLeft, event) => {
        this.setState({
            displayInput : false,
            inputNotEmpty:false
        })
    };

    render () {
        return(
            <div className="Presentation">
                {this.state.positions ? this.displayGuest() : null}
                <div>{
                this.state.displayInput ?
                    this.displayPersonalizationInput()
                    : null
            }</div>
            </div>
        )
    }
}
export default Presentation;

