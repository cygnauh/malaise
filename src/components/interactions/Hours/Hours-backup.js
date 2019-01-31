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
            hoursTen : this.getHoursTen(currentDateTime.getHours()),
            hoursUnit : this.getHoursUnit(currentDateTime.getHours()),
            minutesTen : this.getMinutesTen(currentDateTime.getMinutes()),
            minutesUnit : this.getMinutesUnit(currentDateTime.getMinutes())
        }

        this.replaceUndefined()

    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                hoursTen: 2,
                hoursUnit: 0,
                minutesTen: 4,
                minutesUnit: 5
            });
        }, 2000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    replaceUndefined = () => {
        if(this.state.hoursTen = 'undefined') {
            this.state.hoursTen = 0;
            return this.state.hoursTen;
        }
        if(this.state.hoursUnit = 'undefined') {
            this.state.hoursUnit = 0;
            return this.state.hoursUnit;
        }
        if(this.state.minutesTen = 'undefined') {
            this.state.minutesTen = 0;
            return this.state.minutesTen;
        }
        if(this.state.minutesUnit = 'undefined') {
            this.state.minutesUnit = 0;
            return this.state.minutesUnit;
        }
    }

    getHoursTen = (hours) => {
        var hoursSplit = hours.toString().split('');
        var hoursTen = hoursSplit[0];
        return hoursTen;
    }
    getHoursUnit = (hours) => {
        var hoursSplit = hours.toString().split('');
        var hoursUnit = hoursSplit[1];
        return hoursUnit;
    }
    getMinutesTen = (minutes) => {
        var minutesSplit = minutes.toString().split('');
        var minutesTen = minutesSplit[0];
        return minutesTen;
    }
    getMinutesUnit = (minutes) => {
        var minutesSplit = minutes.toString().split('');
        var minutesUnit = minutesSplit[1];
        return minutesUnit;
    }

    render() {
        const months = ["Janvier", "Février", "Mars", "Avril", "Mars", "Juin", "Juillet", "Aout", "Septembre", "Novembre", "Décembre"];
        const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        const { hoursTen, hoursUnit, minutesTen, minutesUnit } = this.state;
        return (
            <div className="eclipse">
                <div className="eclipse__container">
                    <div className="eclipse__date">
                        <span>{days[this.state.day]}</span><span>{this.state.date}</span><span>{months[this.state.month]}</span>
                    </div>
                    <div className="eclipse__clock">
                        <div className="clock__hours">
                            <Odometer
                                format="d"
                                duration={ 1000 }
                                value={ hoursTen }
                            />
                            <Odometer
                                format="d"
                                duration={ 1000 }
                                value={ hoursUnit }
                            />
                        </div>
                        h
                        <div className="clock__minutes">
                            <Odometer
                                format="d"
                                duration={ 1000 }
                                value={ minutesTen }
                            />
                            <Odometer
                                format="d"
                                duration={ 1000 }
                                value={ minutesUnit }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Hours;
