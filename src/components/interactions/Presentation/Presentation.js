import React, { Component } from 'react';
import './style.scss';
// characters introduction to users

class Presentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render:'',
            guestsNb:15,
            positions:null, // dots positions
            color:'blue', // test, should be remove later // TODO Remove
            intervalExtremeties:[],
            hote:"Alice", // to be update with the user data // TODO Remove
            canClickOnDot:true,
            dotClicked:[],
            dotPositions:[], // selected dot positions
            currentInput:'',
            currentQuestion:'pote', // first question to ask
            displayInput:false,
            inputNotEmpty:false,
            personalizationsQuestions:this.props.questions,
            greetedGuests:[],
            randomLetters:[],
            guestLetters:[]
        };
        this.myRef = React.createRef();
    }
    componentDidMount(){
        this.calculateIntervalPositions(100,200, 3, 3);
        setTimeout(()=>{
            console.log('this.myRef.current');
            console.log(this.refs.hote)
        }, 0)
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

            if(i<this.state.personalizationsQuestions.length){
                let mid = Math.floor(this.state.intervalExtremeties.length/2);
                minY = this.state.intervalExtremeties[mid].minY;
                maxY = this.state.intervalExtremeties[mid].maxY;
                minX = this.state.intervalExtremeties[mid].minX;
                maxX = this.state.intervalExtremeties[mid].maxX;
            }

            let positionTop = Math.floor(Math.random() * (maxY-minY+1)) + minY;
            let positionLeft = Math.floor(Math.random() * (maxX-minX+1)) + minX;
            ////////////  case where the dot goes out of the window
            // if(positionTop>window.innerHeight-80){
            //     positionTop = positionTop/2
            // }
            // if(positionLeft>window.innerHeight-80){
            //     positionLeft = positionLeft/1.2
            // }
            ///////
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
            // pos.push({top:positionTop+'px', left:positionLeft+'px'})
            pos.push({top:positionTop, left:positionLeft})
        }
        this.setState({
            positions:pos
        })
    }
    test = () => {
        console.log(this.refs.hote)
    }
    displayGuest = () => {
        let guest=[];
        for(let i=0;i<this.state.guestsNb;i++){
            let topPos = this.state.positions[i].top;
            let leftPos = this.state.positions[i].left;
            if(i===this.state.guestsNb-1){
                let firstLetter = this.state.hote.charAt(0);
                guest.push( ////////// guest TODO animation, letter disappearing
                    <div key={i.toString()}
                         ref="hote"
                         className="Presentation_person greeted__guests"
                         style={{
                             top:topPos+'px',
                             left:leftPos+'px'}}>
                        <span onClick={this.test}>{firstLetter}</span>
                    </div>)
            }else if(i<this.state.personalizationsQuestions.length){
                let colorDot = '';
                if(this.state.displayInput){
                    colorDot ='rgba(255,255,255,0.5)'
                }else{
                    colorDot ='white'
                }
                guest.push( ///////////// clickable dot
                    <div key={i.toString()}
                         className={this.state.dotClicked.indexOf(i) === -1 ?
                             "Presentation_person clickable" : "Presentation_person clickable hide"}
                         ref={this.state.currentQuestion === "copain" ? this.state.currentQuestion : null}
                         style={{
                             background:colorDot,
                             top:topPos+'px',
                             left:leftPos+'px'}}
                         onClick={!this.state.displayInput ? (e)=>this.onDotClicked(i, topPos, leftPos, e):null} // send the refs
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
            });
        }
        console.log(this.state.greetedGuests)
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
        // TODO get the questions,
        // TODO get a random number in the questions empty --> check in the store if personalization already set
        // let form = this.state.personalizationsQuestions[2];
        let form = this.handleDisplayInputOrder();
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
                                               className="nameInput"
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
            this.validateInput(event)
        }
    };
    handleChange = (event) => { // TODO should check on the input value : letter only
        this.setState({currentInput: event.target.value},
            ()=>{
            if(this.state.currentInput.length>0){
                this.setState({inputNotEmpty:true})
            }else{
                this.setState({inputNotEmpty:false})
            }
        });
    };
    validateInput = (event) => {
        // TODO display first letter
        let newGreetedGuest = this.state.greetedGuests;
        // if(this.currentInput !== ''){
            newGreetedGuest.push({
                name:this.state.currentInput,
                top:this.state.dotPositions[0].top-35,
                left:this.state.dotPositions[0].left+20,
                displayed:false,
                randomLetters:[]
            });
            this.setState({
                displayInput : false,
                inputNotEmpty:false,
                canClickOnDot:true,
                currentInput:'',
                greetedGuests:newGreetedGuest
            });
        // }
        if (this.state.currentQuestion === "pote"){
            this.setState({currentQuestion: "copain"});
            setTimeout(()=>{
                // this.refs[this.state.currentQuestion].click()
            },4000)
        }else if (this.state.currentQuestion === "copain"){
            this.setState({currentQuestion: "reloue"});
        }else{
            this.setState({currentQuestion: "reserve"});
        }
        // console.log(newGreetedGuest[0].name);
        // console.log(newGreetedGuest.length, 'len');
        this.lettersDisappearingOrder(newGreetedGuest[newGreetedGuest.length-1].name.split(''), this.state.greetedGuests.length);
        // this.displayGreetingGuests(newGreetedGuest)
        // if (pote), formatForm, then copain
        // TODO find a way to handle the animation, and order
    };
    lettersDisappearingOrder = (letters, l) => {
        // console.log(letters)
        let letterPosition = [];
            setTimeout(()=>{
                let random = Math.floor(Math.random() * (letters.length)) + 1;
                // while(letterPosition.indexOf(random) !== -1) { // make sure to have a different random
                //     random = Math.floor(Math.random() * (letters.length)) + 1;
                // }
                console.log('random')
                console.log(random)
                // if(letterPosition.length!==letters.length && random!=null){
                //     letterPosition.push(random);
                //     // this.lettersDisappearingOrder(letters)
                // } else{
                    console.log(letterPosition)
                    for(let i = 0; i<this.state.greetedGuests.length; i++){
                        let guests = this.state.greetedGuests;
                        if(this.state.greetedGuests[i].name === letters.join('')){
                            guests[i].displayed = true;
                            guests[i].randomLetters = letterPosition
                            for(let j = 1; j<letters.length;j++){
                                letterPosition.push(j)
                                console.log('j')
                                console.log(j)
                                console.log(letterPosition)
                            }
                        }
                        this.setState({
                            greetedGuests : guests
                        });
                        console.log('[0]');
                        console.log(this.state.greetedGuests[i].randomLetters[0])
                    }

                // }
                this.setState({randomLetters:letterPosition})
            }, 200);
        setTimeout(()=>{letterPosition = []
            this.setState({randomLetters:letterPosition})
        }, 250)

    }
    displayGreetingGuests = () => {
        // console.log(this.state.greetedGuests)
        let guests = [];
        if(this.state.greetedGuests && this.state.greetedGuests.length>0){
            for(let i = 0; i<this.state.greetedGuests.length;i++){
                let letters = this.state.greetedGuests[i].name.split('');
                let lettersHelper = [];
                for(let j = 0; j<letters.length; j++){
                    let letterClasses = this.state.randomLetters.indexOf(j) !== -1 || (this.state.greetedGuests[i].displayed && j>0)? 'nameLetter removeOpacity': 'nameLetter';
                    // let letterClasses = this.state.greetedGuests[i].randomLetters[0].indexOf(j) !== -1 ? 'nameLetter removeOpacity': 'nameLetter';
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
                                </span>)
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
                    </div>)
                }
            // this.setState({displayGreetingGuests:guests})
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
                            // this.handleDisplayInputOrder() : null
                            this.displayPersonalizationInput() : null
                    }
                </div>
                <div className="guest">
                    {
                        this.state.greetedGuests ?
                            // this.state.guestLetters : null
                            this.displayGreetingGuests() : null
                    }
                </div>
            </div>
        )
    }
}
export default Presentation;