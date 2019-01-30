import React, { Component } from 'react';
import './style.scss';
import Draggable from 'react-draggable';
import $ from 'jquery';

class DragDrop extends Component {

    constructor(props) {
        super(props);
    }

    handleStop = () => {
        console.log('stop handle');
        $('.Drag-drop__dragEnd').addClass('Drag-drop__dragEnd--full');
        $('.Drag-drop__draggable').addClass('Drag-drop__draggable--dragged');
    }

    render() {
        return (
            <div className="Drag-drop">
                <div className="Drag-drop__dragEnd"></div>
                <div className="Drag-drop__dragBottom">
                    <div className="Drag-drop__dragStart"></div>
                    <Draggable
                        axis="y"
                        handle=".handle"
                        bounds={{top: -150, bottom: 0}}
                        defaultPosition={{x: 0, y: 0}}
                        defaultClassName="Drag-drop__dragElement"
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