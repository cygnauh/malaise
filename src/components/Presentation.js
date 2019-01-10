import React, { Component } from 'react';
import styled from 'styled-components'
import '../assets/styles/presentation.css';
// characters introduction to users

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
`;
class Presentation extends Component {
    constructor() {
        super();
        this.state = {
            render:'',
            guestsNb:15,
            greetingNb:4,
            positions:null,
            color:'blue',
            intervalExtremeties:[]
        };
    }
    componentDidMount(){
        this.calculateIntervalPositions(120,200, 2, 2)
    }
    calculateIntervalPositions=(margeW, margeH, dispersionX, dispersionY)=>{
        let height = window.innerHeight;
        let width = window.innerWidth;
        // random value interval, random dispersion --> top: random(min, max); left:random(min, max);
        let extremeties = []; // top, left extremities
        for(let i=0;i<dispersionX;i++){
            for(let j=0;j<dispersionY;j++){
                console.log(Math.floor(margeW + (((width-(2*margeW)) / dispersionX) * i)));
                console.log(Math.floor(margeW + (((width-(2*margeW)) / dispersionX) * (i+1))));
                extremeties.push({
                        minX:Math.floor(margeW + (((width-(2*margeW)) / dispersionX) * i)),
                        maxX:Math.floor(margeW + (((width-(2*margeW)) / dispersionX) * (i+1))),
                        minY:Math.floor(margeH + (((height-(2*margeH)) / dispersionY) * j)),
                        maxY:Math.floor(margeH + (((height-(2*margeH)) / dispersionY) * (j+1)))
                    },
                );
            }
        }
        this.setState({
            intervalExtremeties:extremeties
        },()=>{
            console.log(this.state.intervalExtremeties);
            this.calculatePositions()
        })

    };

    calculatePositions(){
        let pos = [];
        for(let i=0;i<this.state.guestsNb;i++){
            // let random = 1; // interval extremities
            let random = Math.floor((Math.random() * this.state.intervalExtremeties.length)); // interval extremities

            // console.log(random);
            let minY = this.state.intervalExtremeties[random].minY;
            let maxY = this.state.intervalExtremeties[random].maxY;
            let minX = this.state.intervalExtremeties[random].minX;
            let maxX = this.state.intervalExtremeties[random].maxX;

            console.log(minY, maxY, minX, maxX);
            // if(random){
                let positionTop = Math.floor(Math.random() * maxY) + minY;
                let positionLeft = Math.floor(Math.random() * maxX) + minX;
                if(positionTop>window.innerHeight-80){
                    positionTop = positionTop/2
                }
                if(positionLeft>window.innerHeight-80){
                    positionLeft = positionLeft/2
                }
                console.log(positionTop, positionLeft);
                pos.push({top:positionTop+'px', left:positionLeft+'px'})
            // }
        }
        this.setState({
            positions:pos
        })
    }


    divStyle = () => {
        let colored = 'red';
        let style={color:colored};
        return style
    };

    displayGuest(){
        let guest=[];
        for(let i=0;i<this.state.guestsNb;i++){
            let topPos = this.state.positions[i].top;
            let leftPos = this.state.positions[i].left;
            guest.push(
                <Button
                        key={i.toString()}
                        className="Presentation_person"
                        style={{ color: this.state.color,
                            top:topPos,
                            left:leftPos
                        }}
                />)
        }
        return guest
    }

    render () {
        return(
            <div className="Presentation">
                {this.state.positions ? this.displayGuest() : null}
            </div>
        )
    }
}
export default Presentation;

