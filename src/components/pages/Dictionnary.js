import React, { Component } from 'react';
import '../../assets/styles/dictionnary.css';

class Dictionnary extends Component {

    constructor(props) {
        super(props);
    }

    handleClick(e) {
        e.preventDefault();
        console.log('Btn clicked');
    }

    render() {
        return (
            <div className="Dictionnary">
                Dictionnaire
                <div className="test">
                    <div className="bell">
                        <label>ce soir tu es invité(e) chez ta pote qui fait une soirée posée</label>
                        <div className="bell__box">
                            <input className="bell__input" type="text" placeholder="son prénom" />
                            <button className="btn btn__input" onClick={this.handleClick}>OK</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default Dictionnary;