import React, { Component } from 'react';
import "./Glass.scss";

class Glass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render:'',
            drink: false,
            level : 50 - this.props.glassFilled * 5 +'px',
            mode: this.props.mode
        };
    }

    componentWillReceiveProps(){
        this.setState({
            drink: this.props.onDrink,
            level : 50 - this.props.glassFilled * 8 +'px'
        })
    }
    render() {
        return (
            <div className="glass">
                <span className={this.state.drink? 'glass_name drinking' : 'glass_name'}
                      style={this.state.mode === 'position' ? {backgroundPositionY:this.state.level,opacity: 1}:{backgroundPositionY:this.state.level}}>
                    {this.props.name}
                </span>
                {!this.props.name?
                    <span className='glass_name drinking' style={{backgroundPositionY:'50px'}}>
                        Marjolaine
                    </span>
                :null}
            </div>
        )
    }
}
export default Glass;