import React, { Component } from 'react';
import styled from 'styled-components'
import './style.scss';
// characters introduction to users

class Presentation extends Component {
    constructor() {
        super();
        this.state = {
            render:'',
            guestsNb:15,
            greetingNb:4,
            positions:null, // dots positions
            color:'blue', // test, should be remove later
            intervalExtremeties:[],
            hote:"Alice", // to be update with the user data
            canClickOnDot:true,
            dotClicked:[],
            dotPositions:[], // selected dot positions
            currentInput:'',
            displayInput:false,
            inputNotEmpty:false,
            personalizationsQuestions:[
                {question:"question koko",answerLabel:"aaaa"},
                {question:"question koko 2",answerLabel:"aaaa 2"},
                {question:"question koko 3",answerLabel:"aaaa 3"},
                {question:"question koko 4",answerLabel:"aaaa 4"}
            ], // this.props.personalization data
            greetedGuests:[]
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
            // pos.push({top:positionTop+'px', left:positionLeft+'px'})
            pos.push({top:positionTop, left:positionLeft})
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
                         className="Presentation_person greeted__guests"
                         style={{
                             top:topPos+'px',
                             left:leftPos+'px'}}>
                        <span>{firstLetter}</span>
                    </div>)
            // }else if(i<this.state.greetingNb){
            }else if(i<this.state.personalizationsQuestions.length){
                guest.push(
                    <div key={i.toString()}
                         className={this.state.dotClicked.indexOf(i) === -1 ? "Presentation_person clickable" : "Presentation_person clickable hide"}
                         style={{
                             background:'white',
                             top:topPos+'px',
                             left:leftPos+'px'}}
                         onClick={(e)=>this.onDotClicked(i, topPos, leftPos, e)} // send the refs
                    />)
            }else{
                guest.push(
                    <div key={i.toString()}
                         className="Presentation_person"
                         style={{
                             background:'rgba(255,255,255, 0.2)',
                             top:topPos+'px',
                             left:leftPos+'px'}}
                         onClick={this.state.personalizationsQuestions.length>i?this.test:null}
                    />)
            }
        }
        return guest
    };
    onDotClicked=(i, posTop, posLeft, e)=>{
        let dots = this.state.dotClicked;
        dots.push(i);
        let pos = [{
            top:posTop,
            left:posLeft
        }];
        if(this.state.canClickOnDot){
            this.setState({
                dotClicked: dots,
                dotPositions:pos,
                displayInput:true,
                canClickOnDot:false
            }, console.log(this.state.dotPositions));
        }
    };
    displayPersonalizationInput=()=>{
        // TODO get the questions,
        // TODO get a random number in the questions empty --> check in the store if personalization already set
        let form = this.state.personalizationsQuestions[2];
        let questionInput = [];
            if(this.state.dotPositions){
                if(this.state.dotPositions[0].top&&this.state.dotPositions[0].left){
                    questionInput.push(
                        <div key={1}
                             className='questionInput__container'
                             style={{top:this.state.dotPositions[0].top+'px', left:this.state.dotPositions[0].left+'px'}}>
                            <h3>{form.question}</h3>
                            <div className={this.state.displayInput ? 'input__container animate-input': 'input__container'}>
                                <div className="input__box">
                                    <div className="input-border">
                                        <input type="text"
                                               value={this.state.currentInput}
                                               placeholder={form.answerLabel}
                                               onKeyPress={this.handleKeyPress}
                                               onChange={this.handleChange}/>
                                    </div>
                                    <button className={this.state.inputNotEmpty ? 'btn btn__input border-white': 'btn btn__input border-white empty'}
                                            onClick={this.state.currentInput ? (e)=>this.validateInput(e):null}>
                                        <span>OK</span>
                                    </button>
                                </div>
                            </div>
                        </div>);
                    }
                }
        return questionInput
    };
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            console.log("entered");
            this.validateInput(event)
        }
    }
    handleChange = (event) => { // TODO should check on the input value : letter only
        this.setState({
            currentInput: event.target.value
        },()=>{
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
    validateInput = (event) => {
        // TODO display first letter
        let newGreetedGuest = this.state.greetedGuests;
        // if(this.currentInput !== ''){
            newGreetedGuest.push({
                name:this.state.currentInput,
                top:this.state.dotPositions[0].top-35+'px',
                left:this.state.dotPositions[0].left+20
            });

            this.setState({
                displayInput : false,
                inputNotEmpty:false,
                canClickOnDot:true,
                currentInput:'',
                greetedGuests:newGreetedGuest
            }, console.log(this.state.greetedGuests))
        // }
    };

    displayGreetingGuests = () => {
        let guests = [];
        if(this.state.greetedGuests && this.state.greetedGuests.length>0){
            for(let i = 0; i<this.state.greetedGuests.length;i++){
                let firstLetter = this.state.greetedGuests[i].name.charAt(0);
                // let key = i+"h";
                guests.push(
                    <div key={i.toString()}
                         className="Presentation_person greeted__guests"
                         style={{
                             top:this.state.greetedGuests[i].top,
                             left:this.state.greetedGuests[i].left,}}>
                        <span>{firstLetter}</span>
                    </div>)
            }
        }
        return guests
    }

    render () {
        return(
            <div className="Presentation">
                {this.state.positions ? this.displayGuest() : null}
                <div>
                    {
                        this.state.displayInput && this.state.dotPositions ?
                            this.displayPersonalizationInput(this.state.dotPositions) : null
                    }
                </div>
                <div className="guest">
                    {
                        this.state.greetedGuests ?
                            this.displayGreetingGuests() : null
                    }
                </div>
            </div>
        )
    }
}
export default Presentation;