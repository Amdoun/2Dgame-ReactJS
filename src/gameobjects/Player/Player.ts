import _ from 'lodash';

import { CharacterComponent } from 'gamecomponents'
import GameObject from 'gameobjects/GameObject';
import { InputActions } from 'managers/InputManager/InputManager';
import { GameCanvasState } from 'game/GameCanvas';
import { GamePosition } from 'types';
import idle from "assets/Player/idle.png";
import { CharacterComponentAttributes, CharacterComponentVariables, CharacterState } from 'gamecomponents/CharacterComponent/CharacterComponent';

interface PlayerProps {
    position: GamePosition,
    create: Function,
}

class Player extends GameObject {

    position: GamePosition;
    create: Function;
    sprite: HTMLImageElement;
    characterComponent: CharacterComponent;
    previousinputstate: InputActions = {
        left: false,
        right: false,
        jump: false,
        enter: false,
        shoot: false
    };

    constructor(props: PlayerProps){
        super();
        this.sprite = new Image();
        this.position = props.position;
        this.create = props.create;
        this.characterComponent = new CharacterComponent({
            gravity: 0.4,
            maxhspeed: 0.5,
            maxfallspeed: 9,
            groundfriction: 0.1,
            airfriction: 0.2,
            width: 16,
            height: 16,
            jumpspeed: 10,
            position: props.position
        });
        this.init();
    }

    init = () => {
        this.sprite.src = idle;
    }

    update = (input: InputActions) => {
        this.position = this.characterComponent.update((comp: CharacterComponent) => {
            let vars = comp.vars;
            let attr = comp.attr;
            if (input.left && !input.right){
                vars.hspeed = -4;
            } else
            if (input.right && !input.left){
                vars.hspeed = 4
            } else {
                vars.hspeed = 0;
            }
            if (comp.position.posY < 400){
                if (vars.vspeed < attr.maxfallspeed)
                    vars.vspeed += attr.gravity
                else
                    vars.vspeed = attr.maxfallspeed
            } else {
                vars.vspeed = 0
            }
            if (input.jump && !this.previousinputstate.jump){
                vars.vspeed = -attr.jumpspeed
            }
            return vars;
        });
        this.previousinputstate = _.clone(input);
    }

    render = (state: GameCanvasState) => {
        const context = state.context;
        context.save();
        context.translate(this.position.posX, this.position.posY);
        context.font = "20px Arial";
        context.lineWidth = "3";
        context.strokeStyle = "white";
        context.fillStyle = "red";
        context.fillText("test",-17, -45);
        context.strokeStyle = '#ffffff';
        context.fillStyle = '#ffffff';
        context.lineWidth = 2;
        context.scale(1, 1);
        context.drawImage(this.sprite,-10,-43,);
        context.fill();
        context.stroke();
        context.restore();
    }
}

export default Player;