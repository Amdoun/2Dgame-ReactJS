import { CollidableComponent, CollisionBoxComponent } from "gamecomponents";
import GameObject from "gameobjects/GameObject";
import { GamePosition } from "types";
import { CollidableSurfaceAttributes } from "gamecomponents/CollidableComponent/CollidableComponent";

interface SolidTileProps {
    position: GamePosition,
    width: number,
    height: number,
    collidableComponent: CollidableComponent
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

}

export default SolidTile;