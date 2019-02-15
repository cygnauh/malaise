import React, { createContext, Component } from "react";
import { Howl } from 'howler';
import { UserContext } from "./UserProvider";
import Sound from "./../assets/sounds/final-voice2.mp3"
//state and functions declarations
export const SoundContext = createContext({
    placeSounds: [],
    episodeSounds:null,
    interactions:[],
    beginingMusic:null,
    musicSelected:null,
    setPlaceSounds: () => {},
    setEpisodeSounds: () => {},
    loadSound:() => {},
    playDoorBell:() => {},
    playInstructions:() => {},
    playGreeting:() => {},
    handleMusicChoices:() => {},
    handleMusic:() => {},
    playInteractionSound:() =>{},
    playJingle:() =>{},
    update:() =>{}

});
class SoundProvider extends Component {
    state = {
        placeSounds: [], // all places sound
        placeSelected:[], // place selected by the user
        episodeSounds:null, // episode soundtrack where extract will be extracted
        placeSoundtrack:null,
        episodeSoundtrack:null, // episode soundtrack obj
        musicSelected:null, // music selected by the user
        beginingMusic:null,
        url : [{
            'pote': 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/salut-pote.mp3',
            'copain': 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/salut-copain.mp3',
            'reloue': 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/salut-reloue.mp3',
            'reserve': 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/salut-reserve.mp3',
            'offHote': 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/voix_2_hote.mp3',
            'offPote': 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/voix_2_pote.mp3',
            'offReloue': 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/voix_2_reloue.mp3',
            'offReserve': 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/voix_2_reseve.mp3',
        }],

        setPlaceSounds: sounds => {
            this.setState({ placeSounds: sounds });
            setTimeout(()=>{console.log(this.state.placeSounds)}, 0)
        },

        // episode soundtrack and set interactions
        setEpisodeSounds: (sounds, interactions) => {
            this.setState({ episodeSoundtrack:sounds, interactions: interactions})
        },
        registerPlaceSound: (place) =>{ // load place selected
            let firstSound, secondSound;
            firstSound = new Howl({
                src: [place.url],
                ext: ['mp3'],
                html5: true,
                volume:0.05,
                loop: true
            });
            secondSound = new Howl({
                src: [' https://circegrand.fr/etude/gobelins/malaise/media/sounds/musique_2.1_debut'],
                ext: ['mp3'],
                html5: true,
                volume:0.01,
                loop: true
            });
            this.setState({
                    placeSoundtrack:firstSound,
                    beginingMusic:secondSound

                }, ()=>{
                    // console.log(this.state.placeSoundtrack);
                    this.state.placeSoundtrack.play();
                    this.state.beginingMusic.play();
                }
            );
        },
        // TODO to be improved
        playDoorBell:() => {
            let doorbell = 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/doorbell.mp3';
            let opendoor = 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/open_door.mp3';
            let streamDoorbell;
            let streamOpendoor;
            streamDoorbell = new Howl({
                src: [doorbell],
                ext: ['mp3'],
                html5: true,
                volume:0.3
            });
            streamOpendoor = new Howl({
                src: [opendoor],
                ext: ['mp3'],
                html5: true,
                volume:0.3
            });
            streamDoorbell.play();
            setTimeout( () => {
                streamOpendoor.play();
            }, 1500);
            setTimeout( () => {
                if(this.state.placeSoundtrack){
                    this.state.placeSoundtrack.volume(0.3)
                    this.state.beginingMusic.volume(0.1)
                }
            }, 1800)
        },

        playInstructions:(step) => {
            let url = 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/instruction_' + step +'.mp3';
            let instruction;
            instruction = new Howl({
                src: [url],
                ext: ['mp3'],
                html5: true,
                volume:0.7
            });
            instruction.play();

            return instruction;
        },

        playJingle:() => {
            let url = 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/jingle.mp3';
            let jingle;

            jingle = new Howl({
                src: [url],
                ext: ['mp3'],
                html5: true,
                volume:0.2
            });

            return jingle;
        },

        // TODO to be improved
        playGreeting:(value) => {
            let stream;
            stream = new Howl({
                src: [this.state.url[0][value]],
                ext: ['mp3'],
                html5: true,
                volume:1
            });
            if(value === 'offHote' || value === 'offPote' || value === 'offReloue' || value === 'offReserve'){
                stream.volume(0.7)
            }
            stream.play()

        },

        // load the musics
        handleMusicChoices:(sounds) => {
            let soundtab = [];
            for(let i = 0; i< sounds.length; i++){
                let sound = new Howl({
                    src: [sounds[i].url],
                    ext: ['mp3'],
                    html5: true,
                    volume:0.5
                });
                soundtab.push(sound)
            }
            this.setState({
                musics: soundtab
            }, () => {
                console.log(this.state.musics)
            });
        },

        // handle the play and pause of the music
        handleMusic:(url, mode) => {
            this.state.beginingMusic.pause();
            if(mode === "pause" && this.state.musicSelected){
                 this.state.musicSelected.pause(); // TODO Uncomment
                return
            }
            if(mode === "play"){
                console.log('state musics', this.state.musics.find(setting => setting._src === url));
                this.setState({
                    musicSelected:this.state.musics.find(setting => setting._src === url)
                }, () => {
                     this.state.musicSelected.play(); // TODO Uncomment
                });
            }
        },
    };

    render() {
        return (
            <SoundContext.Provider value={this.state}>
                {this.props.children}
            </SoundContext.Provider>
        );
    }
}
SoundProvider.contextType = UserContext;
export default SoundProvider;
