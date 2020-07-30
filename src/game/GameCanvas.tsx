import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';
import { InputManager, MouseManager} from 'managers'
import { ConnectionStatus } from 'types';
import { Player } from 'gameobjects';
import GameObject from 'gameobjects';
import { RootState } from 'reducers';
import { InputActions } from 'managers/InputManager/InputManager';
import { room1map } from 'game/rooms'

interface ScreenInterface {
    width: number,
    height: number,
    ratio: number
}

export interface GameCanvasState {
    input: InputManager,
    mouse: MouseManager,
    screen: ScreenInterface,
    context: any,
}

const width = 800;
const height = 400; //const height = window.innerHeight;
const ratio = 1;

class GameCanvas extends Component<any,GameCanvasState> {

    gameobjects: GameObject[];
    canvasRef = React.createRef<HTMLCanvasElement>();

    constructor(props: any){
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
        this.gameobjects = [];
    }

    componentDidMount() {
        this.state.input.bindKeys();
        if (this.canvasRef.current){
            this.state.mouse.bindMouse(this.canvasRef.current);
        }
        const context = this.canvasRef.current?.getContext('2d');
        this.setState({ context: context });
        this.startGame();
        requestAnimationFrame(() => {this.update()});
    }
       
    componentWillUnmount() {
        this.state.input.unBindKeys();
        this.state.mouse.unBindMouse();
    }

    update(){
        const keys = this.state.input.pressedKeys
        const mousePos = this.state.mouse.mousePosition
        this.clearBackground();
        this.updateObjects(keys);
        requestAnimationFrame(() => {this.update()})
    }

    createObject(object: GameObject){
        this.gameobjects.push(object);
    }

    updateObjects(keys: InputActions){
        //Maybe have it not mutate directly the gameobjects array
        let index = 0;
        for (let object of this.gameobjects){
            if (object.delete){
                this.gameobjects.splice(index, 1);
            } else {
                this.gameobjects[index].update(keys);
                this.gameobjects[index].render(this.state);
            }
            index++;
        }
    }

    clearBackground() {
        const context = this.state.context;
        context.save();
        context.scale(this.state.screen.ratio, this.state.screen.ratio);
        context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
        context.globalAlpha = 1;
    }

    startGame() {
        room1map(this.state,this.createObject.bind(this))
        .then((result) => {
            this.gameobjects = result
        }).catch((error) => {
            console.log(error.response)
            this.startGame();
        })
     }

    stopGame() {
        this.gameobjects = [];
    }

    render(){
        return(
            <div>
                <canvas ref={this.canvasRef} className="canvas-main"
                    width={ this.state.screen.width * this.state.screen.ratio }
                    height={ this.state.screen.height * this.state.screen.ratio }
                    >
                </canvas>
            </div>
        )
    }
    
}

const mapStateToProps = (state: RootState) => ({
    connection: ConnectionStatus
})

export default connect(mapStateToProps, null)(GameCanvas);