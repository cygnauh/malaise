import React, { Component } from 'react';
import Hours from './interactions/Hours'
import Doorbell from './interactions/Doorbell/Doorbell'
import Header from "./layout/Header/Header";

// 1) hours
class Episode extends Component {
    constructor(){
        super();
        this.state = {
            render:'',
            nextComponent:false
        };
        this.nextComponent()
    }
    nextComponent = () => {
        setTimeout(()=>{
            this.setState({
                nextComponent:true
            })
        }, 5000)
    }
    render() {
        return (
            <div className="Episode">
                {!this.state.nextComponent? <Hours/> : <Doorbell/>}
            </div>
        )
    }
}

export default Episode;
