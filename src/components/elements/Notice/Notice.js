import React, { Component } from 'react';
import './style.scss';

class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notice : ''
        }
    }
    componentDidMount(){
        if(this.props.notice){
            this.setState({
                notice : this.props.notice
            }, console.log(this.state.notice, 'componentDidMount'))
        }
    }
    componentWillReceiveProps(){
        if(this.props.notice){
            this.setState({
                notice : this.props.notice
            }, console.log(this.state.notice, 'componentWillReceiveProps'))
        }
    }
    render() {
        return (
            <div className='Notice'>
                <span className='Notice__text'>{this.state.notice ? this.state.notice : null}</span>
            </div>
        )
    }
}

export default Notice;