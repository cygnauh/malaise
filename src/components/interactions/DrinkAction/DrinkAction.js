import React, { Component } from 'react';
import Glass from '../../elements/Glass/Glass'
import DragDrop from '../../elements/DragDrop/DragDrop'
import { UserContext } from "./../../../store/UserProvider";
import {SoundContext} from "../../../store/SoundProvider";

class DrinkAction extends Component {
    constructor(){
        super();
        this.state = {
            render:'',
            persons : ''
        };
    }
    componentDidMount(){
        this.setState({
            persons: this.context.personalizations
        }, ()=>{
            console.log(this.state.persons)
        })
        // for(let i =0; i<this.persons.length; i++){
        //     console.log(this.persons[i])
        // }

    };
    handleDrink(){
        let glasses = []
        if(this.state.persons){
            for (let i = 0; i<this.state.persons.length;i++) {
                let name = this.state.persons[i].name
                let glassLevel = this.state.persons[i].glass
                let test = false
                glasses.push(<Glass key={i} name={name} glassFilled={glassLevel} onDrink={false}/>)
            }
        }
        return glasses
    }
    render() {
        return (
            <div className="DrinkAction">

                <div className="Person_list">
                    {this.state.persons ? this.handleDrink() : null}
                </div>
                <div className="Drink">
                    <DragDrop onDrink={this.handleDrink}/>
                </div>
            </div>
        )
    }
}
DrinkAction.contextType = UserContext;
export default DrinkAction;
