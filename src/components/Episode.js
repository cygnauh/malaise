import React, { Component } from 'react';
import Hours from './interactions/Hours'
import Doorbell from './interactions/Doorbell/Doorbell'
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
                hello this is the episode page
                {!this.state.nextComponent? <Hours/> : <Doorbell/>}
            </div>
        )
    }
}

export default Episode;
