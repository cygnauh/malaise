import './style.scss';
import React, { Component } from 'react';
import Odometer from 'react-odometerjs'
import 'odometer/themes/odometer-theme-default.css';

class Hours extends Component {
    constructor(props) {
        super(props);
        let currentDateTime = new Date();
        var currentHours = currentDateTime.getHours();
        var hours = ("0" + currentHours).slice(-2);
        var currentMinutes = currentDateTime.getMinutes();
        var minutes = ("0" + currentMinutes).slice(-2);

        this.state = {
            day: currentDateTime.getDay(),
            month: currentDateTime.getMonth(),
            date: currentDateTime.getDate(),
            hours : currentDateTime.getHours(),
            minutes : currentDateTime.getMinutes(),
            dateDisplay : true
        }

    }

    componentDidMount() {
        if(this.props.hours && this.props.minutes){
            this.setState({
                hours: this.props.hours,
                minutes: this.props.minutes,
                dateDisplay: false
            });
        }else{
            this.setState({
                hours: 21,
                minutes: 52
            });
        }

        setTimeout(()=>{
            if(this.props.onEnd){
                this.props.onEnd('hours')
            }
        }, this.props.duration ? this.props.duration : 3000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        const months = ["Janvier", "Février", "Mars", "Avril", "Mars", "Juin", "Juillet", "Aout", "Septembre", "Novembre", "Décembre"];
        const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        const { hours, minutes } = this.state;
        return (
            <div className="eclipse">
                <div className="eclipse__container">
                    <div className={this.state.dateDisplay ? 'eclipse__date' : 'eclipse__date eclipse__date--hide'}>
                        <span>{days[this.state.day]}</span><span>{this.state.date}</span><span>{months[this.state.month]}</span>
                    </div>
                    <div className="eclipse__clock">
                        <div className="clock__hours">
                            <Odometer
                                format="d"
                                duration={ 1000 }
                                value={ hours }
                            />
                        </div>
                        h
                        <div className="clock__minutes">
                            <Odometer
                                format="d"
                                duration={ 1000 }
                                value={ minutes }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Hours;