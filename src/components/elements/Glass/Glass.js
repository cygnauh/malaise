import React, { Component } from 'react';
import "./Glass.scss";

class Glass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render:''
        };
    }

    render() {
        return (
            <div className="glass">
                <span className="glass_name">
                    Animatedname
                </span>
            </div>
        )
    }
}
export default Glass;