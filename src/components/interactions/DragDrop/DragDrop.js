import React, { Component } from 'react';
import './style.scss';
import Draggable from 'react-draggable';

class DragDrop extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Drag-drop">
                <div className="Drag-drop__dragEnd"></div>
                <div className="Drag-drop__dragStart">
                    <Draggable
                        axis="y"
                        handle=".handle"
                        bounds={{top: -150, bottom: 0}}
                        defaultPosition={{x: 0, y: 0}}
                        position={null}
                        scale={1}
                        onStart={this.handleStart}
                        onDrag={this.handleDrag}
                        onStop={this.handleStop}>
                        <div>
                            <div className="Drag-drop__draggable handle"></div>
                        </div>
                    </Draggable>
                </div>
            </div>
        );
    }
}
export default DragDrop;