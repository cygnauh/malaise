// store/SoundProvider.js
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
    playChoiceMusic:() => {},
    playInteractionSound:() =>{}

});
class SoundProvider extends Component {
    state = {
        placeSounds: [], // all places sound
        placeSelected:[], // place selected by the user
        episodeSounds:null, // episode soundtrack where extract will be extracted
        placeSoundtrack:null,
        episodeSoundtrack:null, // episode soundtrack obj
        musicSelected:[], // music selected by the user
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
                // sprite:{
                //     regles: [35250, 5930],
                //     lancement_jeu: [13040, 19840],
                //     rep: [32980, 2200],
                //     choix_boisson:[41080, 5150],
                //     je_nai_jamais1:[46260, 9880],
                //     anecdote1:[56140, 52930],
                //     je_nai_jamais_user:[110870, 4570],
                //     je_nai_jamais3:[114240, 7960],
                //     anecdote2:[122000, 18820],
                //     anecdote2_part2:[140020, 79960],
                //     tour:[220280, 13060],
                //     tour2:[253340, 10770]
                // },
                sprite: tab
            });
            this.setState({ episodeSounds: sound });
            setTimeout(()=>{console.log(this.state.episodeSounds)}, 0);
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
        playChoiceMusic:(type) => {
            console.log('play music choice');
            let url = 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/' + type +'.mp3';
            let stream;
            stream = new Howl({
                src: [url],
                ext: ['mp3'],
                html5: true
            });
            stream.play()
        },
        registerChoiceMusic:(choice) => {
            let stream;
            stream = new Howl({
                src: [choice.url],
                ext: ['mp3'],
                html5: true,
                volume: 0.2,
                loop: true
            });
        },
        playInteractionSound:(value) => {
            // this.state.episodeSounds
            this.state.episodeSounds.play(value);
            return this.state.episodeSounds._sprite[value][1]
            // this.state.episodeSounds.on('end', () => {
            //     console.log("this is over");
            //     return true
            // });
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
/**
 * A la suite de notre classe `UserProvider`, on créé notre HOC
 * qui se chargera d'injecter les propriétés de notre contexte
 * à n'importe quel composant qui l'appellera
 */
export const withUser = Component => props => (
    <SoundContext.Consumer>
        {store => <Component {...props} {...store} />}
    </SoundContext.Consumer>
)
