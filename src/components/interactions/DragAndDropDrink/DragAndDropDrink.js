import React, { Component } from 'react';

class DragAndDropDrink extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render:''
        };
    }

    render() {
        return (
            <div className="drag_and_drop_drink">
                <div className="name_drinks">
                    drag and drop
                </div>
                <div className="drink_action">
                    drag and drop
                </div>
            </div>
        )
    }
}
export default DragAndDropDrink;