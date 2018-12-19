import "./Timeline.css"
import React from 'react';

class Timeline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Timeline">
                <div className="Timeline__progress-bar">
                    <div className="Timeline__progress-bar--default"/>
                    <div className="Timeline__progress-bar--progression"/>
                </div>
            </div>
        )
    }
}

export default Timeline;