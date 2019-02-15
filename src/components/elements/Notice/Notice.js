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
            })
        }
    }
    componentWillReceiveProps(){
        if(this.props.notice){
            this.setState({
                notice : this.props.notice
            })
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