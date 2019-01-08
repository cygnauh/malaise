import React, { Component } from 'react';
import { Howl, Howler } from 'howler';

//this is going to handle the project sounds

class Sound extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     soundVolume: 0
        // }

        this.sourceMp3Web = 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/party-ambience-1-no-copyright-sound-effect.mp3';
        this.source = this.props.source;
        this.volume = this.props.volume;
        this.loop = this.props.loop;

        this.stream = new Howl({
            src: [this.source],
            ext: ['mp3'],
            volume: 0.2,
            html5: true,
            loop:this.loop
        });

        this.stream.play()
    }
    updateVolume = (value) => {
        this.stream.volume(value);
        console.log(this.volume)
    };

    test = () =>{
        console.log("the test")
    };

    componentWillReceiveProps(nextProps){
        console.log("éddddty", nextProps);
        // this.setState({soundVolume: nextProps.soundVolume});
        this.updateVolume(nextProps.soundVolume);
    }
    // static getDerivedStateFromProps(nextProps, prevState){
    //     if(nextProps.soundVolume!==prevState.soundVolume){
    //         return { soundVolume: nextProps.soundVolume};
    //     }
    //     else return null;
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     if(prevProps.soundVolume!==this.props.soundVolume){
    //         //Perform some operation here
    //         this.setState({soundVolume: prevProps.soundVolume});
    //         this.updateVolume(prevProps.soundVolume);
    //     }
    // }

    render() {

        return (
            <div>
                {/*Open*/}
            </div>
        );
    }
}

export default Sound;