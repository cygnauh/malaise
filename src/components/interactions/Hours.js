import './Hours.css';
import React, { Component } from 'react';

class Hours extends React.Component {
    constructor(props) {
        super(props);
        let currentDateTime = new Date();
        this.state = {
            day: currentDateTime.getDay(),
            month: currentDateTime.getMonth(),
            date: currentDateTime.getDate(),
            hours : currentDateTime.getHours(),
            minutes : currentDateTime.getMinutes()
        }
        this.getHoursTen = this.getHoursTen.bind(this);
    }
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        let currentDateTime = new Date();
        this.setState({
            day: currentDateTime.getDay(),
            month: currentDateTime.getMonth(),
            date: currentDateTime.getDate(),
            hours : currentDateTime.getHours(),
            minutes : currentDateTime.getMinutes(),
            hoursTen : this.getHoursTen(this.state.hours),
            hoursUnit : this.getHoursUnit(this.state.hours),
            minutesTen : this.getMinutesTen(this.state.minutes),
            minutesUnit : this.getMinutesUnit(this.state.minutes)
        });
    }

    getHoursTen(hours) {
        var hoursSplit = hours.toString().split('');
        var hoursTen = hoursSplit[0];
        console.log('heures - dizaine: ', hoursTen);
        return hoursTen;
    }

    getHoursUnit(hours) {
        var hoursSplit = hours.toString().split('');
        var hoursUnit = hoursSplit[1];
        console.log('heures - unité: ', hoursUnit);
        return hoursUnit;
    }

    getMinutesTen(minutes) {
        var minutesSplit = minutes.toString().split('');
        var minutesTen = minutesSplit[0];
        console.log('minutes - dizaine: ', minutesTen);
        return minutesTen;
    }

    getMinutesUnit(minutes) {
        var minutesSplit = minutes.toString().split('');
        var minutesUnit = minutesSplit[1];
        console.log('minutes - unité: ', minutesUnit);
        return minutesUnit;
    }

    render() {
        const months = ["Janvier", "Février", "Mars", "Avril", "Mars", "Juin", "Juillet", "Aout", "Septembre", "Novembre", "Décembre"]
        const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
        return (
            <div className="eclipse">
                <div className="eclipse__container">
                    <div className="eclipse__date">
                        <span>{days[this.state.day]}</span><span>{this.state.date}</span><span>{months[this.state.month]}</span>
                    </div>
                    <div className="eclipse__clock">
                        <p><span>{this.state.hoursTen}</span><span>{this.state.hoursUnit}</span></p>h<p><span>{this.state.minutesTen}</span><span>{this.state.minutesUnit}</span></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Hours;