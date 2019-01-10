import "./homepage.scss";
import React, { Component } from 'react';

class Homepage extends Component {

    constructor() {
        super();
        this.state = {
            next:false,
            nextPage: false
        }
    }

    next = () => {
        this.setState ({
            next:true
        });

        setTimeout(() =>{
            this.setState ({
                nextPage:true
            });
        }, 6000);
        setTimeout(() =>{
            this.props.onButtonPressed(true)
        }, 9000);
    }
    render() {
        return (
            <div className="Home">
                <div className="Home__container">
                    <div className="Home__center">
                        <div className={this.state.next ? 'Home__content Hide__content': 'Home__content'}>
                            <h1 className="Home__title">malaise.</h1>
                            <p className="Home__description">Une websérie immersive sonore qui vous plonge au coeur d'histoires et d'anecdotes du quotidien.</p>
                            <button className="Home__start" onClick={this.next}>démarrer l'expérience</button>
                        </div>
                        <div className={(!this.state.next || this.state.nextPage ) ? 'Home__content Hide__content' : 'Home__content'}>
                            <p className="Home__description Home__description--small">Malaise vous invite à vivre une expérience immersive à travers différents épisodes interactifs.</p>
                            <p className="Home__description Home__description--small">Laissez vous guider et suivez les indications en bas de l'écran tout au long de l'expérience.</p>
                        </div>
                    </div>
                    <div className={this.state.nextPage ? 'Home__sound Hide__content' : 'Home__sound'}>
                        <img src={require('../../assets/icons/headphones.svg')} />
                        <p>Activez le son et utilisez un casque ou des écouteurs pour une meilleure immersion.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;