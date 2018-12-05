import "./interactions.css";
import React from 'react';
import { Howl, Howler } from 'howler';

class Doorbell extends React.Component {
    constructor(props) {
        super(props);
        var obj = JSON.parse(sessionStorage.getItem('characters'));
        this.state = {
            hostName: obj.name
        };
        this.sourceDoorbellWeb = 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/doorbell.mp3';
        this.source = this.sourceDoorbellWeb;
        this.stream = new Howl({
            src: [this.source],
            ext: ['mp3'],
            html5: true
        });
    }
    handleBellClick = (evt) => {
        evt.preventDefault();
        console.log('doorbell');
        this.stream.play();
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
                <div className="Interaction__instruction">
                    <p>Clique sur la sonnette pour rentrer</p>
                </div>
            </div>
        );
    }
}

export default Doorbell;