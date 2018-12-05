import React, { Component } from 'react';
import { Howl, Howler } from 'howler';
class Sound extends React.Component {


    constructor(props) {
        super(props);
        this.sourceMp3Web = 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/party-ambience-1-no-copyright-sound-effect.mp3';
        this.source = this.props.source;
        this.stream = new Howl({
            src: [this.source],
            ext: ['mp3'],
            autoplay: true,
            html5: true
        });
        this.stream.play()
    }
    render() {
        return (
            <div className="Sound"></div>
        );
    }
}

export default Sound;