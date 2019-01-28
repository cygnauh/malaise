import React, { Component } from 'react';
import Hours from './interactions/Hours/Hours'
import Personalization from './Personalization'
import Interactions from '../components/interactions/Interactions'
import "./episode.scss";
// 1) hours, --> personnalization ?? doorbell, boum, --> presentation soirée
class Episode extends Component {
    constructor(){
        super();
        this.state = {
            render:'',
            componentIndex:0,
        };
        this.nextComponent()
    }
    nextComponent = () => {
        setTimeout(()=>{
            this.setState({
                componentIndex:1
            })
        }, 5000)
    };
    goToWhatever = () => {
        this.setState({
            componentIndex:2
        })
    }
    render() {
        return (
            <div className="Episode">
                {/*{!this.state.nextComponent?*/}
                <div className={this.state.componentIndex !== 0?'Episode__hours hide':'Episode__hours'}>
                    <Hours />
                </div>

                {/*:*/}
                {/*<div className={this.state.componentIndex === 1?'doorbell__container':'doorbell__container hide'}>*/}
                    {/*<Doorbell onDoorbellPressed={this.goToPresentation}/>*/}
                {/*</div>*/}

                <div className={this.state.componentIndex === 1?'Episode__personalization':'Episode__personalization hide'}>
                    <Personalization nextComponent={this.goToWhatever}/>
                </div>
                {/*}*/}
            </div>
        )
    }
}

export default Episode;
