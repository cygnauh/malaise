import React, { Component } from 'react';
import $ from 'jquery';
import './style.scss';
import Timer from "../../elements/Timer/Timer";
import Glass from '../../elements/Glass/Glass'
import { UserContext } from './../../../store/UserProvider'

class TakingPosition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            defaultWidth: 0,
            started: false,
            timeIsOver: false,
            arguers: '',
            persons: '',
            hide: false
        };

        this.part1 = React.createRef();
        this.part2 = React.createRef();
        this.container = React.createRef();
    }
    componentDidMount() {
        let arguers  = [];
        this.setState({
            started: true,
            persons : this.context.personalizations
        }, ()=>{
            if(this.props.arguers){
                for(let i = 0 ; i < this.props.arguers.length ; i++){
                    let argument = this.props.arguers[i].split(':');
                    let person = this.state.persons.find(setting=>setting.role === argument[0]);
                    arguers.push([person.name, argument[1], person.glass]);
                }
                this.setState({
                    arguers:arguers,
                });
            }
            });
        setTimeout(() => {
            this.setState({
                timeIsOver: true
            });
        }, 6600);
        setTimeout(() => {
            this.setState({
                hide: true
            });
        }, 8600);
        setTimeout(() => {
            if (this.props.onEnd) {
                this.props.onEnd('position taking');

            }// TODO Temporary
        }, 10600);

    }

    handleMouseMove = (e) => {
        const p1 = this.part1.current;
        const p2 = this.part2.current;

        let $currentTarget = $(e.currentTarget);

        this.setState({
            x: e.pageX - $currentTarget.offset().left
        });

        let x = this.state.x;

        let p1Pourcent = 100 - x / 10;
        let p2Pourcent = x / 10;
        // console.log(p1Pourcent);
        // console.log(p2Pourcent);
        p1.style.width = p1Pourcent + '%';
        p2.style.width = p2Pourcent + '%';

        var inverseX = (e.currentTarget.offsetWidth / 2) - x;
        p1.querySelector('.TakingPosition__name').style.transform = `scale(${1 + inverseX/500})`;
        p2.querySelector('.TakingPosition__name').style.transform = `scale(${1 - inverseX/500})`;

        if(p1Pourcent > 80) {
            console.log("max width");
        } else {
            p1.querySelector('.TakingPosition__name').style.transform = `scale(${1 + inverseX/500})`;
            p2.querySelector('.TakingPosition__name').style.transform = `scale(${1 - inverseX/500})`;
        }

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
    };

    render() {

        return (
            <div className={this.state.timeIsOver ? 'TakingPosition TakingPosition__done' : 'TakingPosition'}
                style={this.state.hide ? {opacity:1}:null}>
                <div className="TakingPosition__timer">
                    <Timer activeTimer={this.state.started} />
                </div>
                <div className="TakingPosition__container" onMouseMove={!this.state.timeIsOver ? this.handleMouseMove : null} ref={this.container}>
                    <div className="TakingPosition__leftPart" ref={this.part1}>
                        {
                            this.state.arguers[0]?
                                <div className="TakingPosition__name">
                                    <Glass
                                        name={this.state.arguers[0][0]}
                                        glassFilled={2}
                                        onDrink={false}
                                        mode="position"
                                    />
                                    <p className="TakingPosition__label">{this.state.arguers[0][1]}</p>
                                </div>
                                :
                                <p className="TakingPosition__name">Romane</p>
                        }

                    </div>
                    <div className="TakingPosition__rightPart" ref={this.part2}>
                        {
                            this.state.arguers[1] ?
                                <div className="TakingPosition__name">
                                    <Glass
                                        name={this.state.arguers[1][0]}
                                        glassFilled={2}
                                        onDrink={false}
                                        mode="position"
                                    />
                                    <p className="TakingPosition__label">{this.state.arguers[1][1]}</p>
                                </div>
                                :
                                <p className="TakingPosition__name">Arthur</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
TakingPosition.contextType = UserContext;
export default TakingPosition;