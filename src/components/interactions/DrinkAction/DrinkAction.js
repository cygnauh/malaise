import React, { Component } from 'react';
import Glass from '../../elements/Glass/Glass'
import DragDrop from '../../elements/DragDrop/DragDrop'
import { UserContext } from "./../../../store/UserProvider";
import {SoundContext} from "../../../store/SoundProvider";
import "./DrinkAction.scss";

class DrinkAction extends Component {
    constructor(props){
        super(props);
        this.state = {
            render:'',
            persons : '',
            canDrink: false,
            toDrink: false
        };
        this.drinkers = this.props.drinkers; // persons who drinks at the question
        this.timer = this.props.timer;
        this.asker = this.props.question[0]; // who is asking the question
        this.question = this.props.question[1];
        this.userDrank = this.userDrank.bind(this)
        this.handleTimer = setTimeout( () => {this.userDrank(); console.log("time up")}, this.timer)
    }
    componentDidMount(){
        this.setState({
            persons: this.context.personalizations
        }, ()=>{
            console.log(this.state.persons)
        })
    };
    handleDrink = () => {
        let glasses = []
        if(this.state.persons){
            for (let i = 0; i<this.state.persons.length;i++) {
                let name = this.state.persons[i].name;
                let glassLevel = this.state.persons[i].glass;
                let toDrink = this.state.canDrink && this.drinkers.indexOf(this.state.persons[i].role)!==-1;
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
    userDrank = () => {
        // show drinkers
        clearTimeout(this.handleTimer)
        for (let i = 0; i<this.state.persons.length;i++) {
            if(this.drinkers.indexOf(this.state.persons[i].role)!==-1){
                let persons = this.state.persons;
                persons[i].glass = 1;
                // console.log(persons)
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
        setTimeout(()=>{ this.props.drinkActionEnd('drink action') }, 2000)
        //TODO register user alcohol level
    };
    // handleTimer = () => {
    //     // check if user use to do an action
    //     this.setTimeout()
    // };
    render() {
        return (
            <div className="DrinkAction">
                <div className="wrapper">
                    {this.state.persons ? this.handleDrink() : null}
                </div>
                <div className="Drink">
                    <DragDrop onDrink={this.userDrank} disableDrag={this.state.canDrink}/>
                </div>
            </div>
        )
    }
}
DrinkAction.contextType = UserContext;
export default DrinkAction;
