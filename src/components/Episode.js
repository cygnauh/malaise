import React, { Component } from 'react';
import Hours from './interactions/Hours'
import Doorbell from './interactions/Doorbell/Doorbell'
import Presentation from './interactions/Presentation/Presentation'
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
    goToPresentation = () => {
        this.setState({
            componentIndex:2
        })
    }
    render() {
        return (
            <div className="Episode">
                {/*{!this.state.nextComponent?*/}
                <div className={this.state.nextComponent !== 0?'hours__container hide':'hours__container'}>
                    <Hours />
                </div>

                {/*:*/}
                <div className={this.state.nextComponent === 1?'doorbell__container':'doorbell__container hide'}>
                    <Doorbell onDoorbellPressed={this.goToPresentation}/>
                </div>

                <div className={this.state.nextComponent === 2?'presentation__container':'presentation__container hide'}>
                    <Presentation onDoorbellPressed={this.goToPresentation}/>
                </div>
                {/*}*/}
            </div>
        )
    }
}

export default Episode;
