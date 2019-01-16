import React, { Component } from 'react';

class PresentationInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render:''
        };
    }

    render () {
        return(
            // this.state.displayInput, form, dotPositions, this.state.currentInput, this.handleKeyPress, this.handleChange, this.validateInput(e)
            <div
                 className='questionInput__container'
                 style={{top:this.props.dotPositions.top+'px', left:this.props.dotPositions.left+'px'}}>
                <span className='questionInput__label'>{this.props.form.question}</span>
                <div className={this.props.displayInput ? 'input__container animate-input': 'input__container'}>
                    <div className="input__box">
                        <div className="input-border">
                            <input type="text"
                                   className="nameInput"
                                   value={this.props.currentInput}
                                   placeholder={this.props.form.answerLabel}
                                   onKeyPress={this.props.handleKeyPress}
                                   onChange={this.props.handleChange}/>
                        </div>
                        <button className={this.props.currentInput ? 'btn btn__input border-white': 'btn btn__input border-white empty'}
                                onClick={this.props.currentInput ? (e)=>this.props.validateInput(e):null}>
                            <span>OK</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PresentationInput;

