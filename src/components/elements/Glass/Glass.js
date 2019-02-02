import React, { Component } from 'react';
import "./Glass.scss";

class Glass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render:'',
            drink: false
        };
    }

    render() {
        return (
            <div className="glass">
                <span className={this.state.drink? 'glass_name drinking' : 'glass_name'}>
                    {this.props.name}
                </span>
            </div>
        )
    }
}
export default Glass;