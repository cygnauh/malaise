import "./interactions.css";
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
            var value, role = '';
            inputs.forEach(function(input) {
                value = input.value;
                role = input.getAttribute('data-role');
                window.sessionStorage.setItem(role, value);
            });
            console.log(sessionStorage)
        }
    }
    render() {
        return (
            <form className="Form" onKeyPress={this.onKeyPress}>
                <div className="Form__row">
                    <label className="Form__label">Tu es à la porte de</label>
                    <input className="Form__input" type="text" placeholder="son prénom" value={this.state.inputValue} data-role="host" onChange={evt => this.updateInputValue(evt)}></input>
                </div>
            </form>
        );
    }
}

export default Started;