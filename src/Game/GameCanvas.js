import React, { Component } from 'react'
import InputManager from './InputManager';
import './gameCanvas.css'
import Player from './GameComponents/Player';

const width = 800;
const height = window.innerHeight;
const ratio = window.devicePixelRatio || 1;

class GameCanvas extends Component {

    constructor(props){
        super(props)
        this.state = {
            input: new InputManager(),
            screen: {
                width: width,
                height: height,
                ratio: ratio,
            },
            context: null,
        }
        this.player = null
    }

    componentDidMount() {
        this.state.input.bindKeys(); 
        const context = this.refs.canvas.getContext('2d');
        this.setState({ context: context });
        this.startGame()
        requestAnimationFrame(() => {this.update()})
    }
       
    componentWillUnmount() {
        this.state.input.unbindKeys();
    }

    update(currentDelta){
        const keys = this.state.input.pressedKeys

        this.clearBackground();
        if (this.player !== undefined && this.player !== null) {
            this.player.update(keys);
            this.player.render(this.state);       
        }

        requestAnimationFrame(() => {this.update()})
    }

    clearBackground() {
        const context = this.state.context;
        context.save();
        context.scale(this.state.screen.ratio, this.state.screen.ratio);
        context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
        context.globalAlpha = 1;
    }

    startGame() {
        let player = new Player({
            radius: 15,
            speed: 2.5,
            position: {
                x: this.state.screen.width/2,
                y: this.state.screen.height - 50
            }});
        this.player = player;
     }

    render(){
        return(
            <canvas ref="canvas" className="canvas-main"
                width={ this.state.screen.width * this.state.screen.ratio }
                height={ this.state.screen.height * this.state.screen.ratio }
            >
            </canvas>
        )
    }
}

export default GameCanvas;