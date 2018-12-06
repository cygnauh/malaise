import "./interactions.css";
import React from 'react';
import ReactBodymovin from 'react-bodymovin'
import animation from '../../assets/animation/test'
import { Howl, Howler } from 'howler';

class Doorbell extends React.Component {
    constructor(props) {
        super(props);
        this.JsonSessionStorage = JSON.parse(window.sessionStorage.getItem('characters'))
        this.state = {
            hostName: this.JsonSessionStorage.name
        };
        this.bodymovinOptions = {
            loop: true,
            autoplay: true,
            prerender: true,
            animationData: animation
        }
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
            <div>
                <div className="Interaction">
                    <div className="Doorbell">
                        <div className="Doorbell__object">
                            <button className="Doorbell__button" onClick={this.handleBellClick}/>
                            <label className="Doorbell__name">{this.state.hostName}</label>
                        </div>
                    </div>
                </div>
                {/*<div>*/}
                    {/*<ReactBodymovin options={this.bodymovinOptions} />*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default Doorbell;