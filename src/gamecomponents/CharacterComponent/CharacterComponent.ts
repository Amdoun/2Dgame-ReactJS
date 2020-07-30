import { GamePosition } from 'types';
import CollisionBoxComponent from 'gamecomponents/CollisionBoxComponent';

export enum CharacterState {
    WALKING,
    STOPPED,
    JUMPED,
    FALLING,
    LANDED
}

interface CharacterComponentArgs {
    gravity: number,
    maxhspeed: number,
    maxfallspeed: number,
    jumpspeed: number,
    groundfriction: number,
    airfriction: number,
    width: number,
    height: number,
    position: GamePosition,
}

export type CharacterComponentAttributes = {
    gravity: number,
    maxhspeed: number,
    maxfallspeed: number,
    jumpspeed: number,
    groundfriction: number,
    airfriction: number,
    width: number,
    height: number,
}

export type CharacterComponentVariables = {
    hspeed: number,
    vspeed: number,
    charstate: CharacterState
}

class CharacterComponent {

    //Attributes
    attr: CharacterComponentAttributes;

    //Components
    collisionBox: CollisionBoxComponent;

    //Variables
    vars: CharacterComponentVariables = {
        hspeed: 0,
        vspeed: 0,
        charstate: CharacterState.STOPPED
    }
    position: GamePosition = {posX: 0, posY: 0};

    constructor(args: CharacterComponentArgs) {
        this.attr = {
            gravity: args.gravity,
            maxhspeed: args.maxhspeed,
            maxfallspeed: args.maxfallspeed,
            jumpspeed: args.jumpspeed,
            groundfriction: args.groundfriction,
            airfriction: args.airfriction,
            width: args.width,
            height: args.height,
        }
        this.position = args.position
        this.collisionBox = new CollisionBoxComponent;
        this.vars.charstate = CharacterState.STOPPED;
    }

    update = (movementlogic: (attr: CharacterComponent) => CharacterComponentVariables) => {

        this.vars = movementlogic(this)
        this.position = {
            posX: this.position.posX + this.vars.hspeed,
            posY: this.position.posY + this.vars.vspeed
        }

        if (!this.collisionBox.collideSide(this.attr.width, this.attr.height, this.position)){

        }

        if (!this.collisionBox.collideTop(this.attr.width, this.attr.height, this.position)){

        }

        if (!this.collisionBox.collideBottom(this.attr.width, this.attr.height, this.position)){

        }

        return this.position;
    }

}

export default CharacterComponent;