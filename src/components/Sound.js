import React, { Component } from 'react';
import { Howl, Howler } from 'howler';


class Sound extends React.Component {

    constructor(props) {
        super(props);
        this.volume = 0.1

        this.sourceMp3Web = 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/party-ambience-1-no-copyright-sound-effect.mp3';
        this.source = this.props.source;
        // this.volume = this.props.volume;

        this.stream = new Howl({
            src: [this.source],
            ext: ['mp3'],
            volume: this.volume,
            autoplay: true,
            html5: true
        });
        this.stream.play()
    }
    updateVolume = (value) => {
        this.stream.volume(value)
        console.log(this.volume)
    }
    render() {
        return (
            <div className="Sound">
                {/*Open*/}
            </div>
        );
    }
}

export default Sound;