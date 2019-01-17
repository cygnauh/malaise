import React, { Component } from 'react';
import './style.scss';

class WordBox extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <svg className="WordBox" viewBox="0 0 42 34">
                <g transform="translate(-1374.000000, -28.000000)" stroke="#FFFFFF">
                    <g transform="translate(1370.000000, 20.000000)">
                        <g transform="translate(5.000000, 9.000000)">
                            <polyline transform="translate(28.750000, 6.786391) scale(-1, -1) translate(-28.750000, -6.786391) " points="35.8333333 0 35.8333333 13.5727811 21.6666667 6.07278106"></polyline>
                            <polyline transform="translate(12.916667, 6.648641) scale(1, -1) translate(-12.916667, -6.648641) " points="21.6666667 3.55271368e-15 21.6666667 13.297283 4.68839145 6.02087929 4.16666667 5.79728295"></polyline>
                            <polyline points="18.3333333 15 18.3333333 31.6666667 4.16666667 24.1666667 4.16666667 17.018757"></polyline>
                            <polyline transform="translate(27.083333, 19.583333) scale(-1, 1) translate(-27.083333, -19.583333) " points="18.3333333 7.5 35.8333333 15 35.8333333 31.6666667 18.3333333 24.1666667 18.3333333 16.9396273"></polyline>
                            <polygon transform="translate(29.166667, 15.000000) scale(-1, 1) translate(-29.166667, -15.000000) " points="22.5 7.5 40 15 35.8333333 22.5 18.3333333 15"></polygon>
                            <polygon  points="4.16666667 7.5 18.3333333 15 14.1666667 22.5 -1.54543045e-13 15"></polygon>
                        </g>
                    </g>
                </g>
            </svg>
        )
    }
}

export default WordBox;
