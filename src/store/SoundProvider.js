// store/SoundProvider.js
import React, { createContext, Component } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes
import { Howl, Howler } from 'howler';
//state and functions declarations
export const SoundContext = createContext({
    placeSounds: [],
    episodeSounds:null,
    setPlaceSounds: () => {},
    loadSound:() => {},
    playDoorBell:() => {}
});
class SoundProvider extends Component {
    state = {
        placeSounds: [], // all places sound
        placeSelected:[], // place selected by the user
        episodeSounds:null, // episode soundtrack where extract will be extracted
        placeSoundtrack:null,
        episodeSoundtrack:null, // episode soundtrack obj
        setPlaceSounds: sounds => {
            this.setState({ placeSounds: sounds });
            setTimeout(()=>{console.log(this.state.placeSounds)}, 0)
        },
        registerPlaceSound: (place) =>{ // load place selected
            let stream;
            stream = new Howl({
                src: [place.url],
                ext: ['mp3'],
                html5: true
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
            let url = 'https://circegrand.fr/etude/gobelins/malaise/media/sounds/doorbell.mp3';
            let stream;
            stream = new Howl({
                src: [url],
                ext: ['mp3'],
                html5: true
            });
            stream.play()
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
