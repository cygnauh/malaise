import React, { Component } from 'react';
import './style.scss';

class Dictionnary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render:'',
            activeBell: false,
            clickedBell: false
        };
        this.btnBell = 'btn__bell';
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({
            activeBell:true
        });
        if(e.target.classList.contains(this.btnBell)) {
            e.preventDefault();
            this.setState({
                clickedBell:true,
            });
            setTimeout(function(){
                this.setState({
                    clickedBell:false,
                });
            }.bind(this), 200);
        }
    }

    render() {
        return (
            <div className="Dictionnary">
                Dictionnaire
                <div className="test">
                    <div className={this.state.activeBell ? 'bell animate-bell': 'bell'}>
                        <label>ce soir tu es invité(e) chez ta pote qui fait une soirée posée</label>
                        <div className="bell__box">
                            <div className="bell__container">
                                <div className="bell__input-border">
                                    <input className="bell__input" type="text" placeholder="son prénom" />
                                </div>
                                <div className={this.state.clickedBell ? 'bell__btn bell__btn--clicked': 'bell__btn'}>
                                    <button className={this.state.activeBell ? 'btn btn__input btn__bell': 'btn btn__input'} onClick={this.handleClick}>
                                        <span>OK</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default Dictionnary;