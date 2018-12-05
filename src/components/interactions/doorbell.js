import "./interactions.css";
import React from 'react';

class Doorbell extends React.Component {
    constructor(props) {
        super(props);
        var obj = JSON.parse(sessionStorage.getItem('characters'));
        this.state = {
            hostName: obj.name
        };
    }
    handleBellClick(evt){
        evt.preventDefault();
        console.log('doorbell');
    }
    render() {
        return (
            <div className="Interaction">
                <div className="Doorbell">
                    <div className="Doorbell__object">
                        <button className="Doorbell__button" onClick={this.handleBellClick}></button>
                        <label className="Doorbell__name">{this.state.hostName}</label>
                    </div>
                </div>
            </div>
        );
    }
}

export default Doorbell;