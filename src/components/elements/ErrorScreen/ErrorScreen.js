import React, { Component } from 'react';
class ErrorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notice : ''
        }
    }

    render() {
        return (
            <div className='ErrorScreen'>
                <span className='ErrorScreen__text'>ERROR</span>
            </div>
        )
    }
}

export default ErrorScreen;