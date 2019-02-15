import React, { Component } from 'react';
import './style.scss';
import Draggable from 'react-draggable';
import $ from 'jquery';

class DragDrop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deltaPosition: {x: 0, y: 0},
            disabled: this.props.disableDrag
        }

    }
    componentWillReceiveProps(){
        this.setState({
            disabled: this.props.disableDrag
        })
    }

    handleStart = () => {
        $('.Drag-drop__draggable').addClass('Drag-drop__draggable--onDrag');
        $('.Drag-drop__exampleAnimation').remove();
    };

    handleDrag = (e, ui) => {
        const {x, y} = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        });

        if(this.state.deltaPosition.y === -150) {
            $('.Drag-drop__draggable').removeClass('Drag-drop__draggable--onDrag');
        } else {
            $('.Drag-drop__draggable').addClass('Drag-drop__draggable--onDrag');
        }
    };

    handleStop = () => {
        if(this.state.deltaPosition.y === -150) {
            $('.Drag-drop__dragEnd').addClass('Drag-drop__dragEnd--full');
            $('.Drag-drop__draggable').removeClass('Drag-drop__draggable--onDrag').addClass('Drag-drop__draggable--dragged');
            $('.Drag-drop__dragStart').addClass('Drag-drop__dragStart--dragged');
            this.props.onDrink()
        } else {
            $('.Drag-drop__draggable').removeClass('Drag-drop__draggable--onDrag');
            setTimeout(() => {
                $('.Drag-drop__dragElement').css('transform', 'translate(0, 0)');
            }, 200);
        }

    }

    render() {
        return (
            <div className={this.state.disabled ? 'Drag-drop disabled' : 'Drag-drop'} style={ this.state.disabled ? { opacity:0.3 } :null }>
            {/*<div className="Drag-drop" style={ this.state.disabled ? { opacity:0.3 } :null }>*/}
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
                        disabled={this.state.disabled}
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