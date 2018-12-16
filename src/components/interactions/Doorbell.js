import "./interactions.css";
import React from 'react';
// import ReactBodymovin from 'react-bodymovin'
import Lottie from 'react-lottie';
import animationData from '../../assets/animation/boum'
import { Howl, Howler } from 'howler';

class Doorbell extends React.Component {
    constructor(props) {
        super(props);
        this.JsonSessionStorage = JSON.parse(window.sessionStorage.getItem('characters'));
        this.state = {
            hostName: this.JsonSessionStorage.name,
            openDoor:false,
            blockBell:false
        };
        this.defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
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
        if(!this.state.blockBell){
            setTimeout(
                () => {
                    this.setState({
                        openDoor: true
                    });
                }, 2000
            );
        }

        this.setState({
            blockBell : true
        })

        this.props.bellPressed(true)


    }
    render() {
        return (
        <div className="WithAnimation">
            {!this.state.openDoor
            ?
            <div className="Doorbell">
                <div className="Doorbell__object">
                    <button className="Doorbell__button" onClick={this.handleBellClick}/>
                    <label className="Doorbell__name">{this.state.hostName}</label>
                </div>
                <div className="Interaction__instruction">
                    <p>Clique sur la sonnette pour rentrer</p>
                </div>
            </div>

            :
            <div className="Animation">
                <Lottie options={this.defaultOptions}
                />
            </div>
            }
        </div>
        );
    }
}

export default Doorbell;