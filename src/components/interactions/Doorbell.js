import "./interactions.css";
import React from 'react';

class Doorbell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hostName: window.sessionStorage.getItem('host')
        };
    }
    getHostName(){
        var label = document.querySelectorAll('.Doorbell__name');
        console.log(label);
    }
    render() {
        return (
            <div className="Interaction">
                <div className="Doorbell">
                    <div className="Doorbell__object">
                        <button className="Doorbell__button"></button>
                        <label className="Doorbell__name">{this.state.hostName}</label>
                    </div>
                </div>
            </div>
        );
    }
}

export default Doorbell;