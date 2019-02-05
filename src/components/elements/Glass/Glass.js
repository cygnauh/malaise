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

    componentWillReceiveProps(){
        this.setState({
            drink: this.props.onDrink
        })
    }
    render() {
        return (
            <div className="glass">
                <span className={this.state.drink? 'glass_name drinking' : 'glass_name'}>
                    {this.props.name}
                </span>
                {!this.props.name?
                    <span className='glass_name drinking'>
                        Marjolaine
                    </span>
                :null}
            </div>
        )
    }
}
export default Glass;