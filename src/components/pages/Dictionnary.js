import React, { Component } from 'react';
import '../../assets/styles/dictionnary.css';

class Dictionnary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render:'',
            activeBell: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log('Btn clicked');
        console.log(this);
        this.setState({
            activeBell:true
        });
    }

    render() {
        return (
            <div className="Dictionnary">
                Dictionnaire
                <div className="test">
                    <div className={this.state.activeBell ? 'bell animate-bell': 'bell'}>
                        <label>ce soir tu es invité(e) chez ta pote qui fait une soirée posée</label>
                        <div className="bell__box">
                            <div className="bell__input-border">
                                <input className="bell__input" type="text" placeholder="son prénom" />
                            </div>
                            <button className="btn btn__input" onClick={this.handleClick}><span>OK</span></button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default Dictionnary;