import React, { Component } from 'react';
import "./style.scss";
import WordBox from "../../SVG/WordBox/WordBox";

class DictionnaryAlert extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="DictionnaryAlert">
                <div className="DictionnaryAlert__rotation">
                    <div className="DictionnaryAlert__letters">
                        <div className="char1">b</div>
                        <div className="char2">o</div>
                        <div className="char3">î</div>
                        <div className="char4">t</div>
                        <div className="char5">e</div>
                        <div className="char6"></div>
                        <div className="char7">à</div>
                        <div className="char8"></div>
                        <div className="char9">m</div>
                        <div className="char10">o</div>
                        <div className="char11">t</div>
                        <div className="char12">s</div>
                        <div className="char13"></div>
                        <div className="char14">b</div>
                        <div className="char15">o</div>
                        <div className="char16">î</div>
                        <div className="char17">t</div>
                        <div className="char18">e</div>
                        <div className="char19"></div>
                        <div className="char20">à</div>
                        <div className="char21"></div>
                        <div className="char22">m</div>
                        <div className="char23">o</div>
                        <div className="char24">t</div>
                        <div className="char25">s</div>
                        <div className="char26"></div>
                        <div className="char27">b</div>
                        <div className="char28">o</div>
                        <div className="char29">î</div>
                        <div className="char30">t</div>
                        <div className="char31">e</div>
                        <div className="char32"></div>
                        <div className="char33">à</div>
                        <div className="char34"></div>
                        <div className="char35">m</div>
                        <div className="char36">o</div>
                        <div className="char37">t</div>
                        <div className="char38">s</div>
                        <div className="char39"></div>
                        <div className="char40">b</div>
                        <div className="char41">o</div>
                        <div className="char42">î</div>
                        <div className="char43">t</div>
                        <div className="char44">e</div>
                        <div className="char45"></div>
                        <div className="char46">à</div>
                        <div className="char47"></div>
                        <div className="char48">m</div>
                        <div className="char49">o</div>
                        <div className="char50">t</div>
                        <div className="char51">s</div>
                        <div className="char52"></div>
                    </div>
                </div>
                <div className="DictionnaryAlert__icon"><WordBox /></div>
            </div>
        );
    }
}

export default DictionnaryAlert;