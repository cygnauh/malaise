// store/UserProvider.js
import React, { createContext, Component } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes

/**
 * `createContext` contient 2 propriétés :
 * `Provider` et `Consumer`. Nous les rendons accessibles
 * via la constante `UserContext` et on initialise une
 * propriété par défaut "name" qui sera une chaîne vide.
 * On exporte ce contexte afin qu'il soit exploitable par
 * d'autres composants par la suite via le `Consumer`
 */
export const UserContext = createContext({
    userName: '',
    episode: '',
    personalizations:[],
    setEpisode: () => {},
    setPersonalization: () => {}

});

/**
 * la classe UserProvider fera office de... Provider (!)
 * en englobant son enfant direct
 * dans le composant éponyme. De cette façon, ses values
 * seront accessibles de manière globale via le `Consumer`
 */
class UserProvider extends Component {
    state = {
        userName: '',
        episode: '', // une valeur de départ
        personalizations:[
            {role: "hote", name: "ariane", glass: 0},
            {role: "pote", name: "leslie", glass: 0},
            {role: "copain", name: "paul", glass: 0},
            {role: "reloue", name: "corine", glass: 0},
            {role: "reserve", name: "maxime", glass: 0}
        ],
        setEpisode: episodeSelected => {
            this.setState({ episode: episodeSelected });
            setTimeout(()=>{console.log(this.state.episode)}, 0)

        }, // nouvelle propriété de mutation
        setPersonalization: personalizations => {
            this.setState({ personalizations: personalizations });
            // setTimeout(()=>{console.log(this.state.personalizations, 'hello')}, 0)
        },
        setUserName: userName => {
            this.setState({ userName: userName });
        }
    };

    render() {
        return (
            /**
             * la propriété value est très importante ici, elle rend
             * le contenu du state disponible aux `Consumers` de l'application
             */
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;

/**
 * A la suite de notre classe `UserProvider`, on créé notre HOC
 * qui se chargera d'injecter les propriétés de notre contexte
 * à n'importe quel composant qui l'appellera
 */
export const withUser = Component => props => (
    <UserContext.Consumer>
        {store => <Component {...props} {...store} />}
    </UserContext.Consumer>
)
