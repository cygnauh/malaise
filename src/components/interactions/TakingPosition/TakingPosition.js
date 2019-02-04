import React, { Component } from 'react';
import $ from 'jquery';
import './style.scss';
import Timer from "../../elements/Timer/Timer";

class TakingPosition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            defaultWidth: 0,
            started: false,
            timeIsOver: false
        };

        this.part1 = React.createRef();
        this.part2 = React.createRef();
        this.container = React.createRef();
    }

    componentDidMount() {
        this.setState({
            started: true
        });
        setTimeout(() => {
            this.setState({
                timeIsOver: true
            });
        }, 5000);
    }

    handleMouseMove = (e) => {
        const p1 = this.part1.current;
        const p2 = this.part2.current;


        let $currentTarget = $(e.currentTarget);

        this.setState({
            x: e.pageX - $currentTarget.offset().left
        });

        let x = this.state.x;

        p1.style.width = 100 - x / 10 + '%';
        p2.style.width = x / 10 + '%';

        var inverseX = (e.currentTarget.offsetWidth / 2) - x;
        p1.querySelector('.TakingPosition__name').style.transform = `scale(${1 + inverseX/500})`;
        p2.querySelector('.TakingPosition__name').style.transform = `scale(${1 - inverseX/500})`;

        if (x < e.currentTarget.offsetWidth / 2) {
            if(!p1.classList.contains("TakingPosition__winner")) {
                p1.className += " TakingPosition__winner";
                p2.classList.remove("TakingPosition__winner");
            }
        } else if(x > e.currentTarget.offsetWidth / 2) {
            if(!p2.classList.contains("TakingPosition__winner")) {
                p2.className += " TakingPosition__winner";
                p1.classList.remove("TakingPosition__winner");
            }
        }

    }

    render() {

        return (
            <div className={this.state.timeIsOver ? 'TakingPosition TakingPosition__done' : 'TakingPosition'}>
                <div className="TakingPosition__timer">
                    <Timer activeTimer={this.state.started} />
                </div>
                <div className="TakingPosition__container" onMouseMove={!this.state.timeIsOver ? this.handleMouseMove : null} ref={this.container}>
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