// store/SoundProvider.js
import React, { createContext, Component } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes
import { Howl, Howler } from 'howler';
//state and functions declarations
export const SoundContext = createContext({
    locationSounds: [],
    episodeSounds:null,
    setLocationSounds: () => {},
    loadSound:() => {}
});
class SoundProvider extends Component {
    state = {
        locationSounds: [], // all locations sound
        locationSelected:[], // location selected by the user
        episodeSounds:null, // episode soundtrack where extract will be extracted
        locationSoundtrack:{},
        episodeSoundtrack:{}, // episode soundtrack obj
        setLocationSounds: sounds => {
            this.setState({ locationSounds: sounds });
            setTimeout(()=>{console.log(this.state.locationSounds)}, 0)
        },
        loadSound: (location) =>{ // load location selected
            this.setState({
                locationSoundtrack:new Howl({
                    src: [location.url],
                    ext: ['mp3'],
                    volume: 0.2,
                    html5: true,
                    loop:this.loop
                })
            });
            // this.state.locationSoundtrack.play();
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
