import { CollidableComponent, CollisionBoxComponent } from "gamecomponents";
import GameObject from "gameobjects/GameObject";
import { GamePosition } from "types";
import { CollidableSurfaceAttributes } from "gamecomponents/CollidableComponent/CollidableComponent";
import { GameCanvasState } from "game/GameCanvas";

interface SolidTileProps {
    position: GamePosition,
    width: number,
    height: number,
}

class SolidTile extends GameObject {

    position: GamePosition;
    width: number;
    height: number;
    collidableComponent: CollidableComponent;

    constructor(props: SolidTileProps){
        super();
        this.position = props.position;
        this.width = props.width;
        this.height = props.height;
        this.collidableComponent = new CollidableComponent({
            position: this.position,
            width: this.width,
            height: this.height,
            onCollideSide: (surface: CollidableSurfaceAttributes, collisionBox: CollisionBoxComponent) => {
                //Collision logic goes in here
                return false;
            },
            onCollideTop: (surface: CollidableSurfaceAttributes, collisionBox: CollisionBoxComponent) => {
                //Collision logic goes in here
                return false;
            },
            onCollideBottom: (surface: CollidableSurfaceAttributes, collisionBox: CollisionBoxComponent) => {
                //Collision logic goes in here
                return false;
            }
        });
    }

    render = (state: GameCanvasState) => {
        const context = state.context;
        context.save();
        context.beginPath();
        context.fillStyle = '#ffffff';
        context.rect(this.position.posX, this.position.posY, this.width, this.height);
        context.stroke();
    }

}

export default SolidTile;