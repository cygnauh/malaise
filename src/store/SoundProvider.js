import React, { createContext, Component } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes
import { Howl } from 'howler';
import { UserContext } from "./UserProvider";
import Sound from "./../assets/sounds/soundtrack_episode1.mp3"
//state and functions declarations
export const SoundContext = createContext({
    placeSounds: [],
    episodeSounds:null,
    interactions:[],
    setPlaceSounds: () => {},
    setEpisodeSounds: () => {},
    loadSound:() => {},
    playDoorBell:() => {},
    playInstructions:() => {},
    playGreeting:() => {},
    handleMusicChoices:() => {},
    handleMusic:() => {},
    playInteractionSound:() =>{}

});
class SoundProvider extends Component {
    state = {
        placeSounds: [], // all places sound
        placeSelected:[], // place selected by the user
        episodeSounds:null, // episode soundtrack where extract will be extracted
        placeSoundtrack:null,
        episodeSoundtrack:null, // episode soundtrack obj
        musicSelected:null, // music selected by the user
        url : [{
            'pote': 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/salut-pote.mp3',
            'copain': 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/salut-copain.mp3',
            'reloue': 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/salut-reloue.mp3',
            'reserve': 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/salut-reserve.mp3',
        }],

        setPlaceSounds: sounds => {
            this.setState({ placeSounds: sounds });
            setTimeout(()=>{console.log(this.state.placeSounds)}, 0)
        },

        // episode soundtrack and set interactions
        setEpisodeSounds: (sounds, interactions) => {
            this.setState({ episodeSoundtrack:sounds, interactions: interactions});
            let tab = {};
            setTimeout(()=>{
                for(let i = 0; i<interactions.length; i++){
                    let sq = [ interactions[i].soundSequences[0].beginAt, interactions[i].soundSequences[0].endAt]
                    tab[interactions[i].name] = sq;
                }
            }, 0);
            let sound = new Howl({
                src: [Sound],
                sprite: tab
            });
            this.setState({ episodeSounds: sound });
        },
        registerPlaceSound: (place) =>{ // load place selected
            let stream;
            stream = new Howl({
                src: [place.url],
                ext: ['mp3'],
                html5: true,
                volume:0.2,
                loop: true
            });
            console.log(this.state.placeSoundtrack);
            if(this.state.placeSoundtrack){
                this.state.placeSoundtrack.pause();
            }
            this.setState({
                    placeSoundtrack:stream
                }, ()=>{
                    console.log(this.state.placeSoundtrack);
                    this.state.placeSoundtrack.play();
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
                volume:0.5
            });
            streamOpendoor = new Howl({
                src: [opendoor],
                ext: ['mp3'],
                html5: true,
                volume:0.5
            });
            streamDoorbell.play();
            setTimeout( () => {
                streamOpendoor.play();
            }, 1500);
            setTimeout( () => {
                if(this.state.placeSoundtrack){
                    this.state.placeSoundtrack.volume(0.7)
                }
            }, 1800)
        },
        // TODO to be improved
        playInstructions:(step) => {
            console.log(step);
            let url = 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/instruction_' + step +'.mp3';
            let stream;
            stream = new Howl({
                src: [url],
                ext: ['mp3'],
                html5: true
            });
            stream.play()
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
            stream.play()
        },
        // load the musics
        handleMusicChoices:(sounds) => {
            let soundtab = [];
            for(let i = 0; i< sounds .length; i++){
                let sound = new Howl({
                    src: [sounds[i].url],
                    ext: ['mp3'],
                    html5: true,
                    volume:0.2
                });
                soundtab.push(sound)
            }
            this.setState({
                musics: soundtab
            });
        },
        // handle the play and pause of the music
        handleMusic:(url, mode) => {
            if(mode === "pause" && this.state.musicSelected){
                this.state.musicSelected.pause();
                return
            }
            if(mode === "play"){
                this.setState({
                    musicSelected:this.state.musics.find(setting => setting._src === url)
                }, ()=>{
                    this.state.musicSelected.play();
                });
            }
        },
        // voices interaction
        playInteractionSound:(value) => {
            this.state.episodeSounds.play(value);
            return this.state.episodeSounds._sprite[value][1]
        }
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
