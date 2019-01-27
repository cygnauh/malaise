import React, { Component } from 'react';
import './style.scss';

class MusicChoice extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.repeatNameMusic();
    }

    repeatNameMusic = () => {
        var musics = document.getElementsByClassName('Music__name')
        for (var i = 0; i < musics.length; i++) {
            var $this =  musics[i]
            var name = $this.dataset.name
            console.log(name)
            console.log($this)
            $this.innerHTML = '<span>' + name.repeat(10) + '</span>'
            $this.dataset.name = name.repeat(10)

        }
    }

    render() {
        return (
            <div className="Music">
                <ul className="Music__list">
                    <li className="Music__item">
                        <div className="Music__name" data-name="pop "></div>
                    </li>
                    <li className="Music__item">
                        <div className="Music__name" data-name="electro "></div>
                    </li>
                    <li className="Music__item">
                        <div className="Music__name" data-name="rap "></div>
                    </li>
                </ul>
            </div>
        )
    }

}

export default MusicChoice;