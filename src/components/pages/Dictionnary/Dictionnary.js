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
               <div className="Dictionnary__header"></div>
            </div>
        )
    }

}

export default Dictionnary;