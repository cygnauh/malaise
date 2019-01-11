import "./interactions.scss";
import {Character} from '../../objects/Character';
import React from 'react';


class Started extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
        //this.nameEntered = this.props.nameEntered;
    }
    updateInputValue = (evt) => {
        this.setState({
            inputValue: evt.target.value
        });
    }
    setHostName = () => {
        var inputs = document.querySelectorAll('.Form__input');
        var charName, charRole = '';
        inputs.forEach((input) => {
            charName = input.value;
            charRole = input.getAttribute('data-role');
            var char1 = new Character(charRole, charName);
            window.sessionStorage.setItem('characters', JSON.stringify(char1.toJson()));
            this.props.nameEntered(charName);
        });
    }

    onKeyPress = (evt) => {
        if (evt.which === 13) {
            evt.preventDefault();
            this.setHostName();
        }
    }
    onSubmit = (evt) => {
        evt.preventDefault();
        this.setHostName();
    }
    render() {
        return (
            <form className="Form" onKeyPress={this.onKeyPress}>
                <div className="Form__container">
                    <div className="Form__row">
                        <label className="Form__label">Ce soir tu es invité(e) chez ta pote qui fait une soirée posée.</label>
                        <input className="Form__input" type="text" placeholder="son prénom" value={this.state.inputValue} data-role="host" onChange={evt => this.updateInputValue(evt)}></input>
                    </div>
                    <div className="Form__row">
                        <button className="Form__submit" type="submit" onClick={this.onSubmit}>valider</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Started;