import React, { createContext, Component } from "react";
import { Howl } from 'howler';
import { UserContext } from "./UserProvider";
import Sound from "./../assets/sounds/final-voice2.mp3"
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
            this.setState({ episodeSoundtrack:sounds, interactions: interactions},
                console.log(this.state.episodeSoundtrack));
            // let tab = {};
            // setTimeout(()=>{
            //     for(let i = 0; i<interactions.length; i++){
            //         if(interactions[i].soundSequences.length !== 0){
            //             let sq = [ interactions[i].soundSequences[0].beginAt, interactions[i].soundSequences[0].duration]
            //             tab[interactions[i].name] = sq;
            //         }
            //     }
            // }, 0);
            // let sound = new Howl({
            //     src: [Sound],
                // sprite:{
                //     proposition_jeu: [11980, 7390], // ok
                //     question_regles: [19475, 3635], // ok
                //     explication_regles: [23220, 4830], //ok
                //     choix_boisson:[28110, 2480], //ok
                //     choix_boisson_a:[30590, 910], // ok
                //     je_n_ai_jamais1:[32000, 3000], // ok
                //     je_n_ai_jamais1_r:[35000, 4450], // ok
                //     je_n_ai_jamais1_a:[39450, 930], //ok
                //     reaction1:[41600, 3390], // ok
                //     anecdote1:[45090, 18005], // ok
                //     anecdote1bis:[63095, 24605], //ok
                //     je_n_ai_jamais_user:[87700, 2800], // ok
                //     reaction2:[94420, 2175], // ok
                //     heure2:[0, 0],
                //     je_n_ai_jamais3_r:[97900, 4500], // ok
                //     je_n_ai_jamais3:[102400, 1600], // ok
                //     je_n_ai_jamais3_p:[104000, 26400], //ok
                //     je_n_ai_jamais3_a:[0, 0],
                //     reaction3:[132105, 15695], // ok
                //     anecdote2:[147800, 46200], // ok
                //     je_n_ai_jamais4_r:[194000, 3730], //ok
                //     je_n_ai_jamais4:[197730, 2270], // ok
                //     reaction4:[200820, 53400], // ok
                //     recherche_google:[254220, 58290], // ok
                //     reaction4_c:[312510, 5120], // ok
                //     je_n_ai_jamais5:[317630, 14370], //ok
                //     reaction5:[333000, 2890],//ok
                //     fin:[335890, 20610] //ok
                // ----- udaapte value
                //     je_n_ai_jamais3_r:[97900, 4500], // ok
                //     je_n_ai_jamais3:[102400, 12600], // ok
                //     je_n_ai_jamais3_p: [115000, 10300], // ok for taking position
                //     je_n_ai_jamais3_a: [125300, 6805], // ok --> maybe drag and drop display later : maybe add another interaaction or setTimeOut or playing at the end
                //     reaction3:[132105, 15695],
                //     // je_n_ai_jamais3_a: [125300, 10000], // ok
                //     recherche_google:[254220, 58290], // ok
                //     fin:[335890, 20610] //ok,
                //     reaction4_c:[312510, 5120], // ok
                //     je_n_ai_jamais5:[317630, 14370], //ok
                // },
                // sprite: tab // TODO Uncomment
            // });
            // this.setState({ episodeSounds: sound }, ()=>{
            //     // this.state.episodeSounds.play('je_n_ai_jamais3_r')
            // });
            // return sound
        },
        // update: () => {
            // this.currentTime = this.state.episodeSounds.seek()
            // if (this.currentTime >)
            // console.log(this.currentTime)
            // requestAnimationFrame(this.update.bind(this))
        // },
        registerPlaceSound: (place) =>{ // load place selected
            let stream;
            stream = new Howl({
                src: [place.url],
                ext: ['mp3'],
                html5: true,
                volume:0.1,
                loop: true
            });
            // console.log(this.state.placeSoundtrack);
            if(this.state.placeSoundtrack){
                this.state.placeSoundtrack.pause();
            }
            this.setState({
                    placeSoundtrack:stream
                }, ()=>{
                    // console.log(this.state.placeSoundtrack);
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
                volume:0.4
            });
            streamOpendoor = new Howl({
                src: [opendoor],
                ext: ['mp3'],
                html5: true,
                volume:0.4
            });
            streamDoorbell.play();
            setTimeout( () => {
                streamOpendoor.play();
            }, 1500);
            setTimeout( () => {
                if(this.state.placeSoundtrack){
                    this.state.placeSoundtrack.volume(0.3)
                }
            }, 1800)
        },

        playInstructions:(step) => {
            let url = 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/instruction_' + step +'.mp3';
            let instruction;
            instruction = new Howl({
                src: [url],
                ext: ['mp3'],
                html5: true
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
                html5: true
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
                    volume:0.1
                });
                soundtab.push(sound)
            }
            this.setState({
                musics: soundtab
            },
                console.log(this.state.musics)
            );
        },
        // handle the play and pause of the music
        handleMusic:(url, mode) => {
            if(mode === "pause" && this.state.musicSelected){
                 this.state.musicSelected.pause(); // TODO Uncomment
                return
            }
            if(mode === "play"){
                this.setState({
                    musicSelected:this.state.musics.find(setting => setting._src === url)
                }, ()=>{
                     this.state.musicSelected.play(); // TODO Uncomment
                });
            }
        },
        // voices interaction
        // playInteractionSound:(value) => {
        //     this.state.episodeSounds.play(value);
        //     this.update();
        //     console.log(this.state.episodeSounds.seek())
        //     if(this.state.episodeSounds && this.state.episodeSounds._sprite[value]
        //         && this.state.episodeSounds._sprite[value][1]){
        //         return [this.state.episodeSounds, this.state.episodeSounds._sprite[value][1]]
        //     } // TODO Uncomment all
        //
        // }
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
