import React, { Component } from 'react';
import Hours from './interactions/Hours/Hours'
import Personalization from './Personalization'
import { Query } from "react-apollo";
import { getAnwsers } from './../graphql/queries'
import Interactions from '../components/interactions/Interactions'
import Loader from '../components/elements/Loader/Loader'
import ErrorScreen from '../components/elements/ErrorScreen/ErrorScreen'
import "./episode.scss";
import $ from 'jquery';

// 1) hours, --> personnalization ?? doorbell, boum, --> presentation soirée
class Episode extends Component {
    constructor(){
        super();
        this.state = {
            render:'',
            componentIndex:0,
        };
        this.nextComponent();
    }
    nextComponent = () => {
        setTimeout(()=>{
            this.setState({
                componentIndex:1
            })
        }, 4000)
    };
    goToWhatever = () => {
        if(this.state.componentIndex !== 2){
            this.setState({
                componentIndex:2
            })
        } else {
            console.log('next')
        }
    }
    render() {
        return (
            <div className="Episode">
                <div className={this.state.componentIndex !== 0?'Episode__hours hide':'Episode__hours'}>
                    <Hours />
                </div>
                {this.state.componentIndex === 1?
                <div className={this.state.componentIndex === 1?'Episode__personalization':'Episode__personalization hide'}>
                    <Personalization nextComponent={this.goToWhatever}/>
                </div> : null }

                {this.state.componentIndex === 2 ?
                    <div className={this.state.componentIndex === 2?'Episode__interactions':'Episode__interactions hide'}>
                    <Query key="1" query={getAnwsers}>
                        {({ loading, error, data }) => {
                            if (error) return (<ErrorScreen/>);
                            if (loading || !data) return (<Loader/>);
                            // console.log(data);
                            return <Interactions anwsers={data} nextComponent={this.goToWhatever}/>
                        }}
                    </Query>
                </div> : null}

            </div>
        )
    }
}

export default Episode;
