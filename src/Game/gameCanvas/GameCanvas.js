import React, { Component } from 'react'
import { connect } from 'react-redux';
import './gameCanvas.css'
import Player from './player';
import InputManager from './managers/inputManager';
import MouseManager from './managers/mouseManager';
import ConnectionManager from './managers/connectionManager';
import { connectionStatus as conStat } from './managers/connectionManager/connectionConsts';

const width = 800;
const height = 400; //const height = window.innerHeight;
const ratio = 1;

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
            connectionStatus: this.props.connection
        }
        this.connectionManager = React.createRef();
        this.player = null
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.connection !== prevState.connectionStatus){
          return {connectionStatus : nextProps.connection};
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.connectionStatus !== this.state.connectionStatus 
            && this.state.connectionStatus === conStat.CONNECTED) {
            this.startGame();
        }
        if (prevState.connectionStatus !== this.state.connectionStatus 
            && this.state.connectionStatus === conStat.DISCONNECTED) {
            this.stopGame();
        }
    }

    componentDidMount() {
        this.state.input.bindKeys(); 
        this.state.mouse.bindMouse(this.refs.canvas);
        const context = this.refs.canvas.getContext('2d');
        this.setState({ context: context });
        requestAnimationFrame(() => {this.update()});
    }
       
    componentWillUnmount() {
        this.state.input.unbindKeys();
        this.state.mouse.unBindMouse();
    }

    update(currentDelta){
        const keys = this.state.input.pressedKeys
        const mousePos = this.state.mouse.mousePosition
        this.clearBackground();
        if (this.player !== undefined && this.player !== null) {
            this.player.update(keys);
            this.player.render(this.state,this.props.name);
            if (this.connectionManager.current !== undefined && this.connectionManager.current !== null) {
                this.connectionManager.current.update(this.state,this.player);
            }
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

    stopGame() {
        this.player = null;
    }

    render(){
        return(
            <div>
                <ConnectionManager ref={this.connectionManager}/>
                <canvas ref="canvas" className="canvas-main"
                    width={ this.state.screen.width * this.state.screen.ratio }
                    height={ this.state.screen.height * this.state.screen.ratio }
                    >
                </canvas>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    name: state.name,
    connection: state.connection
})

export default connect(mapStateToProps, null)(GameCanvas);