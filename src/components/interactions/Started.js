import "./interactions.css";
import {Character} from '../../objects/Character';
import React from 'react';

class Started extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }
    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }
    onKeyPress(evt) {
        if (evt.which === 13) {
            evt.preventDefault();
            var inputs = document.querySelectorAll('.Form__input');
            var charName, charRole = '';
            inputs.forEach(function(input) {
                charName = input.value;
                charRole = input.getAttribute('data-role');
                var char1 = new Character(charRole, charName);
                window.sessionStorage.setItem('characters', JSON.stringify(char1.toJson()));
                var obj = JSON.parse(sessionStorage.getItem('characters'));
                console.log(obj.name);
                // this.props.nameEntered(obj.name); TODO Fix the issue
            });
        }
    }
    render() {
        return (
            <form className="Form" onKeyPress={this.onKeyPress}>
                <div className="Form__row">
                    <label className="Form__label">Tu es à la porte de</label>
                    <input className="Form__input" type="text" placeholder="son prénom" value={this.state.inputValue} data-role="host" onChange={evt => this.updateInputValue(evt)}/>
                </div>
            </form>
        );
    }
}

export default Started;