import "./homepage.css";
import React from 'react';

class Homepage extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="Home">
                <div className="Home__container">
                    <div className="Home__center">
                        <h1 className="Home__title">malaise.</h1>
                        <p className="Home__description">Une websérie immersive sonore qui vous plonge au coeur d'histoires et d'anecdotes du quotidien.</p>
                        <button className="Home__start">démarrer l'expérience</button>
                    </div>
                    <div className="Home__sound">
                        <img src={require('../../assets/icons/headphones.svg')} />
                        <p>Activez le son et utilisez un casque ou des écouteurs pour une meilleure immersion.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;