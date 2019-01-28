import React, { Component } from 'react';
import { UserContext } from "../../store/UserProvider";
import { SoundContext } from "../../store/SoundProvider";
// 1) hours, --> personnalization ?? doorbell, boum, --> presentation soirée
class Interactions extends Component {
    constructor(){
        super();
        this.state = {
            render:'',
            interactions:''
            // componentIndex:0,
        };
        // this.nextComponent()
    }
    getInteractions = (value) =>{
        if(this.state.interactions === '') this.setState({interactions:value}, ()=>console.log(this.state.interactions))
    };
    render() {
        return (
            <div className="Interactions">
                <UserContext.Consumer>
                    {({episode}) => {this.getInteractions(episode)}}
                </UserContext.Consumer>
                {
                    this.state.interactions ?
                    <div>

                    </div>
                        : null}

            </div>
        )
    }
}

export default Interactions;
