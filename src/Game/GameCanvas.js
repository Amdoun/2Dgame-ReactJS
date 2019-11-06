import React, { Component } from 'react'
import InputManager from './InputManager';
import './gameCanvas.css'
import Player from './GameComponents/Player';
import socketIOClient from "socket.io-client";
import { environment as env } from "../environments/environment"
import NetPlayer from './GameComponents/NetPlayer';

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
        this.socket = null
        this.player = null
        this.netPlayers = []
    }

    componentDidMount() {
        this.state.input.bindKeys(); 
        const context = this.refs.canvas.getContext('2d');
        this.setState({ context: context });
        this.startGame()
        this.socket = socketIOClient(env.ServerUrl);
        this.socket.on("players", data => {
            this.handleNetPlayers(data)
        })
        requestAnimationFrame(() => {this.update()})
    }

    handleNetPlayers(data){
        let netPlayersData = data.filter( element => element.id !== this.socket.id)
        //Check if player disconnected
        if (this.netPlayers.length > netPlayersData.length){
            let newNetplayers = []
            this.netPlayers.forEach( element => {
                if (netPlayersData.filter( el => el.id === element.id).length > 0){
                    newNetplayers.push(element)
                }
            })
            this.netPlayers = newNetplayers;
        }
        netPlayersData.forEach( element => {
            // If player not in this.netPlayers
            if (this.netPlayers.filter( el => el.id === element.id).length === 0){
                //Add new player
                let netPlayer = new NetPlayer({id: element.id, position: element.position})
                this.netPlayers.push(netPlayer)
            } else {
                //Update existing player position
                this.netPlayers.filter( el => el.id === element.id)[0].update(element.position)
            }
        })
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
            this.netPlayers.forEach( element => element.render(this.state))
            this.socket.emit("position", this.player.position)
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