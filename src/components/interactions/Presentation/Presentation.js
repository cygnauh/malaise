import React, { Component } from 'react';
import PresentationInput from './PresentationInput'
import Notice from '../../elements/Notice/Notice'
import './style.scss';
import {SoundContext} from "../../../store/SoundProvider";
import Lottie from 'react-lottie';
import anim from '../../../assets/animation/anim_2_2_points'
// characters introduction to users
// TODO remove every uncessary
class Presentation extends Component {
    constructor(props) {
        super(props);

        this.dotRefs = {};
        this.guestsNb=6;
        this.state = {
            render:'',
            positions:null, // dots positions
            intervalExtremeties:[],
            hote:this.props.host,
            canClickOnDot:true,
            dotClicked:[],
            dotPositions:[], // selected dot positions
            currentInput:'',
            currentQuestion:'pote', // first question to ask
            displayInput:false,
            personalizationsQuestions:this.props.questions,
            greetedGuests:[],
            randomLetters:[],
            guestLetters:[],
            indication:'Clique sur les points pour saluer les invités.',
            show: false
        };
        this.defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: anim,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
    }
    componentDidMount(){
        this.setState({
            show:true
        });
        this.calculateIntervalPositions(100,200, 3, 3);
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

        for(let i=0;i<this.guestsNb;i++){
            let random = Math.floor((Math.random() * this.state.intervalExtremeties.length)); // interval extremities
            let minY = this.state.intervalExtremeties[random].minY;
            let maxY = this.state.intervalExtremeties[random].maxY;
            let minX = this.state.intervalExtremeties[random].minX;
            let maxX = this.state.intervalExtremeties[random].maxX;

            if(i<this.state.personalizationsQuestions.length){
                let mid = Math.floor(this.state.intervalExtremeties.length/2);
                minY = this.state.intervalExtremeties[mid].minY;
                maxY = this.state.intervalExtremeties[mid].maxY;
                minX = this.state.intervalExtremeties[mid].minX;
                maxX = this.state.intervalExtremeties[mid].maxX;
            }

            let positionTop = Math.floor(Math.random() * (maxY-minY+1)) + minY;
            let positionLeft = Math.floor(Math.random() * (maxX-minX+1)) + minX;

            // check distant between dots before push
            if(pos.length>0){
                let paddingRequied = 100;
                for(let j = 0; j < pos.length; j ++){
                    if(Math.round(pos[j].top/paddingRequied) === Math.round(positionTop/paddingRequied) &&
                        Math.round(pos[j].left/paddingRequied) === Math.round(positionLeft/paddingRequied)){
                        positionTop = positionTop + 95
                    }
                }
            }
            pos.push({top:positionTop, left:positionLeft})
        }
        this.setState({
            positions:pos
        }, () => {
        this.hostPositions()}
        );
    }
    test = () => {

    }
    hostPositions = () => {
        let host = this.state.greetedGuests;
        host.push({
            name:this.state.hote,
            top:500,
            // top:this.state.positions[this.state.positions.length-1].top,
            // left:this.state.positions[this.state.positions.length-1].left,
            left:500,
            randomLetters:[]
        });
        this.setState({
            greetedGuests:host
        });
        this.lettersDisappearingOrder(this.state.hote.split(''));
    };
    displayGuest = () => {
        let guest=[];
        let posWhite=[
            {
                top : 308,
                left : 588
            },
            {
                top : 350,
                left : 755
            },
            {
                top : 550,
                left : 800
            },
            {
                top : 487,
                left : 616
            }
        ];
        for(let i=0;i<this.guestsNb;i++){
            let topPos = this.state.positions[i].top;
            let leftPos = this.state.positions[i].left;
            if(i<this.state.personalizationsQuestions.length){
                topPos = posWhite[i].top;
                leftPos = posWhite[i].left;
                let colorDot = '';
                if(this.state.displayInput){
                    colorDot ='rgba(255,255,255,0.3)'
                }else{
                    colorDot ='white'
                }
                guest.push( ///////////// clickable dot
                    <div key={i.toString()}
                         className={this.state.dotClicked.indexOf(i) === -1 ?
                             "Presentation_person clickable" : "Presentation_person clickable hide"}
                         ref={(ref) => {
                                 this.dotRefs = {
                                     ...this.dotRefs,
                                     [i]: ref,
                                 }
                             }
                         }
                         style={{
                             background:colorDot,
                             top:topPos+'px',
                             left:leftPos+'px'}}
                         onClick={!this.state.displayInput ? (ref, e)=>this.onDotClicked(i, topPos, leftPos, ref, e):null} // send the refs
                    />)
            }
            else{
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

    onDotClicked=(i, posTop, posLeft, refs, e)=>{
        if(this.state.show){
            this.setState({
                show:false
            })
        }

        let dots = this.state.dotClicked;
        dots.push(i);
        if(dots.length === 1 ){
            this.context.playGreeting("offPote")
        }
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
            });
        }
    };
    // TODO format form
    handleDisplayInputOrder=()=>{ // pote, copain, reloue, réservé
        let form = [];
        let questions = this.state.personalizationsQuestions;
        //1) pote + copain
        // if(this.state.currentQuestion !== "copain") { // copain is an exception that is handle after
            for(let i = 0; i<questions.length;i++) {
                if(questions[i].name === this.state.currentQuestion){
                    form = questions[i]
                }
            }
        // }
        return form;
    };
    displayPersonalizationInput=()=>{
        let form = this.handleDisplayInputOrder();
        let questionInput = [];
            if(this.state.dotPositions){
                if(this.state.dotPositions[0].top&&this.state.dotPositions[0].left){
                    questionInput.push(
                        <PresentationInput
                            key={1}
                            displayInput={this.state.displayInput}
                            form={form}
                            dotPositions={this.state.dotPositions[0]}
                            currentInput={this.state.currentInput}
                            handleKeyPress={this.handleKeyPress}
                            handleChange={this.handleChange}
                            validateInput={this.validateInput}
                        />)
                    }
                }
        return questionInput
    };

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.validateInput(event)
        }
    };

    handleChange = (event) => { // TODO should check on the input value : letter only
        this.setState({currentInput: event.target.value});
    };

    validateInput = (event) => {
        // TODO display first letter
        let newGreetedGuest = this.state.greetedGuests;
            newGreetedGuest.push({
                name:this.state.currentInput,
                top:this.state.dotPositions[0].top-18,
                left:this.state.dotPositions[0].left+10,
                randomLetters:[]
            });
            this.props.onNameFilled(this.state.greetedGuests.length-2, this.state.personalizationsQuestions, this.state.currentInput)
            this.setState({
                displayInput : false,
                canClickOnDot:true,
                currentInput:'',
                greetedGuests:newGreetedGuest
            });
        if (this.state.currentQuestion === "pote"){
            this.setState({currentQuestion: "copain"});
            let bf = null;
            if(this.state.dotClicked[0] < 4){
                for(let i = 0; i<4; i++){
                    if (this.state.dotClicked.indexOf(i)===-1){
                        bf = this.dotRefs[i];
                    }
                }
            }
            setTimeout(()=>{
                bf.click()
            },1000);
            setTimeout(()=>this.context.playGreeting("pote"), 500)
        }else if (this.state.currentQuestion === "copain"){
            this.setState({currentQuestion: "reloue"});
            let bf = null;
            if(this.state.dotClicked[0] < 4){
                for(let i = 0; i<4; i++){
                    if (this.state.dotClicked.indexOf(i)===-1){
                        bf = this.dotRefs[i];
                    }
                }
            }
            setTimeout(()=>{
                bf.click()
                this.context.playGreeting("offReloue")
            },1000);
            setTimeout(()=>this.context.playGreeting("copain"), 500)
        }else{
            if(this.state.currentQuestion === "reloue"){
                this.setState({currentQuestion: "reserve"});
                let bf = null;
                if(this.state.dotClicked[0] < 4){
                    for(let i = 0; i<4; i++){
                        if (this.state.dotClicked.indexOf(i)===-1){
                            bf = this.dotRefs[i];
                        }
                    }
                }
                setTimeout(()=>{
                    bf.click()
                    this.context.playGreeting("offReserve")
                },1000);
                setTimeout(()=>this.context.playGreeting("reloue"), 500)
            }else{
                setTimeout(()=>this.context.playGreeting("reserve"), 500);
                setTimeout(()=>this.props.onPresentationEnd(), 3000)
            }
        }
        this.lettersDisappearingOrder(newGreetedGuest[newGreetedGuest.length-1].name.split(''));
    };
    lettersDisappearingOrder = (letters) => {
        let letterPosition = [];
            setTimeout(()=>{
                    for(let i = 0; i<this.state.greetedGuests.length; i++){
                        let guests = this.state.greetedGuests;
                        if(this.state.greetedGuests[i].name === letters.join('')){
                            guests[i].displayed = true;
                        }
                        this.setState({
                            greetedGuests : guests
                        });
                    }
                this.setState({randomLetters:letterPosition})
            }, 500);
        setTimeout(()=>{
            letterPosition = [];
            this.setState({randomLetters:letterPosition})
        }, 250)
    };
    displayGreetingGuests = () => {
        let guests = [];
        if(this.state.greetedGuests && this.state.greetedGuests.length>0){
            for(let i = 0; i<this.state.greetedGuests.length;i++){
                let letters = this.state.greetedGuests[i].name.split('');
                let lettersHelper = [];
                for(let j = 0; j<letters.length; j++){
                    let letterClasses = this.state.randomLetters.indexOf(j) !== -1 || (this.state.greetedGuests[i].displayed && j>0)? 'nameLetter removeOpacity': 'nameLetter';
                    if(j===0){
                        letterClasses = 'nameLetter firstLetter'
                    }
                    if(j===0 && this.state.greetedGuests[i].displayed){
                        letterClasses = 'nameLetter firstLetter displayed'
                    }
                    lettersHelper.push(
                        <span key={j.toString()}
                            className={letterClasses}>
                            {letters[j]}
                        </span>
                    )
                }
                guests.push(
                    <div key={i.toString()}
                         className="Presentation_person greeted__guests"
                         style={{
                             top:this.state.greetedGuests[i].top,
                             left:this.state.greetedGuests[i].left,}}>
                            <span className="firstName">
                                {lettersHelper}
                                </span>
                    </div>
                )
            }
        }
        return guests
    };

    handlePassNames = () => {
        this.props.onPresentationEnd();
    }

    render () {
        return(
            <div className="Presentation">
                <button className="Presentation__action" onClick={this.handlePassNames}>Passer la saisie des prénoms</button>
                {this.state.positions ? this.displayGuest() : null}
                <div>
                    {this.state.displayInput && this.state.dotPositions ? this.displayPersonalizationInput() : null}
                </div>
                <div className="guest">
                    {this.state.greetedGuests ? this.displayGreetingGuests() : null}
                </div>
                <div>
                    <Lottie options={this.defaultOptions}/>
                </div>
                <div className={this.state.show && this.state.indication ? 'Notice__wrapper' : 'Notice__wrapper hide'}>
                    <Notice
                        notice={this.state.indication ? this.state.indication : null}/>
                </div>
            </div>
        )
    }
}
Presentation.contextType = SoundContext;
export default Presentation;