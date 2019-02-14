import React, { Component } from 'react';
import Glass from '../../elements/Glass/Glass'
import DragDrop from '../../elements/DragDrop/DragDrop'
import { UserContext } from "./../../../store/UserProvider";
import Timer from "../../elements/Timer/Timer";
import "./DrinkAction.scss";

class DrinkAction extends Component {
    constructor(props){
        super(props);
        this.state = {
            render:'',
            persons : '',
            canDrink: false,
            toDrink: false,
            hide:false,
            started: false,
            showTimer:true
        };
        this.drinkers = this.props.drinkers; // persons who drinks at the question
        this.userDrank = this.userDrank.bind(this);
        if (this.props.mode === 'action') {
            this.asker = this.props.question[0]; // who is asking the question
            // console.log(this.asker, 'componentDidMount')
            this.question = this.props.question[1];
            this.timer = this.props.timer;
            this.hasAnswer = this.props.hasAnswer;
        }

    }
    componentDidMount(){
        this.setState({
            started: true,
            persons: this.context.personalizations
        }, ()=>{
            // console.log(this.state.persons);
            if(this.props.mode === 'drink') this.userDrank(false);
            if (this.props.mode === 'action') {
                // this.asker = this.props.question[0]; // who is asking the question
                // console.log(this.asker, 'componentDidMount')
                // this.question = this.props.question[1];
                // this.timer = this.props.timer;
                // this.hasAnswer = this.props.hasAnswer;
                this.handleTimer = setTimeout( () => {
                    this.userDrank(false);
                    // console.log("time up");
                    // console.log(this.timer)
                }, this.timer);
            }
        })
    };
    handleDrink = () => {
        let glasses = []
        if(this.state.persons){
            for (let i = 0; i<this.state.persons.length;i++) {
                let name = this.state.persons[i].name;
                let glassLevel = this.state.persons[i].glass;
                let toDrink = this.state.canDrink && this.drinkers.indexOf(this.state.persons[i].role)!==-1;
                // console.log(this.asker, this.state.persons[i].role)
                glasses.push(
                    <div key={i} className="Person_list">
                        <Glass name={name}
                               glassFilled={glassLevel}
                               onDrink={toDrink}
                               mode="interaction"
                        />
                        {this.asker === this.state.persons[i].role ?
                            <span className="Drink_Games_content">
                                {this.question}
                                {/*Je n'ai jamais été viré d'un bar*/}
                            </span> : null}
                    </div>
                )

            }
        }
        return glasses
    };
    userDrank = (value) => {
        // show drinkers
        clearTimeout(this.handleTimer)
        for (let i = 0; i<this.state.persons.length;i++) {
            if(this.drinkers.indexOf(this.state.persons[i].role)!==-1){
                let persons = this.state.persons;
                persons[i].glass ++;
                this.context.setPersonalization(persons)
            }
        }
        this.setState({
            canDrink:!this.state.canDrink,
            persons : this.context.personalizations
        }, ()=>{
            this.setState({
                test:"Temporary fix"
            })
        });
        if(this.props.mode ==='action'){
            clearTimeout(this.handleTimer);
            // setTimeout( () => {
            //     console.log(this.props.hasAnwser)
                if(this.props.hasAnwser && value){
                    this.props.drinkActionEnd('drink action', 'drink')
                }else{
                    this.props.drinkActionEnd('drink action')
                }
                this.setState({
                    showTimer:false
                })
            // }, 2000)
        }else{
            setTimeout( () => {
                this.setState({hide:true})
            }, 5000)
            setTimeout( () => {
                this.props.drinkActionEnd('drink action')
            }, 5800)
        }

        //TODO register user alcohol level
    };

    render() {
        return (
            <div className={!this.state.hide ? "DrinkAction" : "DrinkAction hide"}>
                {this.props.mode === 'action' && this.state.showTimer?
                    <div className="DrinkAction__timer">
                        <Timer activeTimer={this.state.started} />
                    </div> :
                    null }
                <div className="wrapper">
                    {this.state.persons ? this.handleDrink() : null}
                </div>
                {this.props.mode ==='action' ?
                    <div className="Drink">
                        <DragDrop onDrink={()=>this.userDrank(true)} disableDrag={this.state.canDrink}/>
                    </div>
                 : null}

            </div>
        )
    }
}
DrinkAction.contextType = UserContext;
export default DrinkAction;
