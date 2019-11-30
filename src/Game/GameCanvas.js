import React, { Component } from 'react'
import InputManager from './InputManager';
import './gameCanvas.css'
import Player from './GameComponents/Player';
import socketIOClient from "socket.io-client";
import { environment as env } from "../environments/environment"
import NetPlayer from './GameComponents/NetPlayer';
import MainMenu from './GameComponents/MainMenu';
import MouseManager from './MouseManager';
import ConnectionManager from './ConnectionManager';

const width = 800;
const height = 400; //const height = window.innerHeight;
const ratio = window.devicePixelRatio || 1;

class GameCanvas extends Component {

    constructor(props){
        super(props)
        this.state = {
            input: new InputManager(),
            mouse: new MouseManager(),
            screen: {
                width: width,
                height: height,
                ratio: ratio,
            },
            context: null,
        }
        this.connectionManager = null
        this.mainMenu = null
        this.player = null
    }

    componentDidMount() {
        this.state.input.bindKeys(); 
        this.state.mouse.bindMouse(this.refs.canvas);
        const context = this.refs.canvas.getContext('2d');
        this.setState({ context: context });
        this.startGame()
        requestAnimationFrame(() => {this.update()})
    }
       
    componentWillUnmount() {
        this.state.input.unbindKeys();
        this.state.mouse.unBindMouse();
    }

    update(currentDelta){
        const keys = this.state.input.pressedKeys
        const mousePos = this.state.mouse.mousePosition
        this.clearBackground();
        if (this.mainMenu !== undefined && this.mainMenu !== null){
            this.mainMenu.update(mousePos)
            this.mainMenu.render(this.state)
            if (this.connectionManager !== undefined && this.connectionManager !== null) {
                this.mainMenu.setDisplayText(this.connectionManager.connectionStatus);
            }
        }
        if (this.player !== undefined && this.player !== null) {
            this.player.update(keys);
            this.player.render(this.state);
        }
        if (this.connectionManager !== undefined && this.connectionManager !== null) {
            this.connectionManager.update(this.state,this.player);
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
        let mainMenu = new MainMenu(this)
        let connectionManager = new ConnectionManager()
        let player = new Player({
            radius: 15,
            speed: 2.5,
            position: {
                x: this.state.screen.width/2,
                y: this.state.screen.height - 50
            }});
        this.player = player;
        this.mainMenu = mainMenu;
        this.connectionManager = connectionManager;
        this.connectionManager.initConnection();
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