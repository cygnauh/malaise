import React, { Component } from 'react';
import $ from 'jquery';
import './style.scss';

class TakingPosition extends Component {

    constructor(props) {
        super(props);
        this.state = { x: 0 };

        this.part1 = React.createRef();
        this.part2 = React.createRef();
    }

    componentDidMount() {
    }

    handleMouseMove = (e) => {
        const p1 = this.part1.current;
        const p2 = this.part2.current;

        this.setState({ x: e.screenX });
        console.log('x:' + this.state.x);

        var p1Width = 100 - this.state.x/10;
        var p2Width = this.state.x/10;

        p2.style.width = p2Width + '%';
        p1.style.width = p1Width + '%';

        if ( p1Width > 50 && !p1.classList.contains("TakingPosition__winner") ) {
            console.log('si part 1 > 50');
            p1.className += " TakingPosition__winner";
            p2.classList.remove("TakingPosition__winner");
        } else if (p2Width > 50 && !p2.classList.contains("TakingPosition__winner")) {
            console.log('si part 2 > 50');
            p2.className += " TakingPosition__winner";
            p1.classList.remove("TakingPosition__winner");
        }

    }

    render() {
        return (
            <div className="TakingPosition">
                <div className="TakingPosition__container" onMouseMove={this.handleMouseMove}>
                    <div className="TakingPosition__leftPart" ref={this.part1}>
                        <p className="TakingPosition__name">Romane</p>
                    </div>
                    <div className="TakingPosition__rightPart" ref={this.part2}>
                        <p className="TakingPosition__name">Arthur</p>
                    </div>
                </div>
            </div>
        )
    }

}

export default TakingPosition;