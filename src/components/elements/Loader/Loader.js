import React, { Component } from 'react';
class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notice : ''
        }
    }

    render() {
        return (
            <div className='Loader'>
                <span className='Notice__text'>LOADER</span>
            </div>
        )
    }
}

export default Loader;