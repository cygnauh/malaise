import React, { Component } from 'react';
import Glass from '../../elements/Glass/Glass'
import DragDrop from '../../elements/DragDrop/DragDrop'
import { UserContext } from "./../../../store/UserProvider";
import {SoundContext} from "../../../store/SoundProvider";

class DrinkAction extends Component {
    constructor(){
        super();
        this.state = {
            render:''
        };
    }
    componentDidMount(){
        this.persons = this.context.personalizations;
        console.log(this.persons)
    };
    handleDrink(){
        console.log("user drinked")
    }
    render() {
        return (
            <div className="DrinkAction">

                <div className="Person_list">
                    <Glass name={"Coco"}/>
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
