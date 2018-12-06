import "./interactions.css";
import React from 'react';
import ReactBodymovin from 'react-bodymovin'
import animation from '../../assets/animation/test'

class Doorbell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hostName: window.sessionStorage.getItem('host')
        };
        this.bodymovinOptions = {
            loop: true,
            autoplay: true,
            prerender: true,
            animationData: animation
        }
    }
    getHostName(){
        var label = document.querySelectorAll('.Doorbell__name');
        console.log(label);
    }
    render() {
        return (
            <div>
                {/*<div className="Interaction">*/}
                    {/*<div className="Doorbell">*/}
                        {/*<div className="Doorbell__object">*/}
                            {/*<button className="Doorbell__button"/>*/}
                            {/*<label className="Doorbell__name">{this.state.hostName}</label>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <div>
                    <ReactBodymovin options={this.bodymovinOptions} />
                </div>
            </div>
        );
    }
}

export default Doorbell;