import React, { Component } from 'react';
import './style.scss';
import Draggable from 'react-draggable';
import $ from 'jquery';

class DragDrop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deltaPosition: {
                x: 0, y: 0
            }
        }

        console.log(this.state.deltaPosition);
    }

    handleStart = () => {
        $('.Drag-drop__draggable').addClass('Drag-drop__draggable--onDrag');
        $('.Drag-drop__exampleAnimation').remove();
    }

    handleDrag = (e, ui) => {
        const {x, y} = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        });
        console.log('x:'+ x, 'y:'+y);
    }

    handleStop = () => {
        console.log('stop handle');

        const {x, y} = this.state.deltaPosition;

        if(this.state.deltaPosition.y === -150) {
            $('.Drag-drop__dragEnd').addClass('Drag-drop__dragEnd--full');
            $('.Drag-drop__draggable').removeClass('Drag-drop__draggable--onDrag').addClass('Drag-drop__draggable--dragged');
            $('.Drag-drop__dragStart').addClass('Drag-drop__dragStart--dragged');
        } else {
            $('.Drag-drop__draggable').removeClass('Drag-drop__draggable--onDrag');
            setTimeout(function() {
                $('.Drag-drop__dragElement').css('transform', 'translate(0, 0)');
            }, 200);
        }
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
                            <div className="Drag-drop__draggable handle">
                                <div className="Drag-drop__wave"></div>
                            </div>
                        </div>
                    </Draggable>
                    <div className="Drag-drop__exampleAnimation"></div>
                </div>
            </div>
        );
    }
}
export default DragDrop;