import React, { Component } from 'react';
import './style.scss';
import { SoundContext } from "../../../store/SoundProvider";

class Dictionnary extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Dictionnary">
                Dictionnaire
            </div>
        )
    }

}

export default Dictionnary;