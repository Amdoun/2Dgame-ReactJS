import { CollisionBoxComponent } from "gamecomponents";
import { GamePosition } from "types";

export interface CollidableSurfaceAttributes {
    position: GamePosition,
    width: number,
    height: number,
}

interface CollidableComponentProps {
    position: GamePosition,
    width: number,
    height: number,
    onCollideSide: (surface: CollidableSurfaceAttributes, collisionBox: CollisionBoxComponent) => boolean,
    onCollideTop: (surface: CollidableSurfaceAttributes, collisionBox: CollisionBoxComponent) => boolean,
    onCollideBottom: (surface: CollidableSurfaceAttributes, collisionBox: CollisionBoxComponent) => boolean
}

class CollidableComponent {

    position: GamePosition;
    width: number;
    height: number;
    onCollideSide: (surface: CollidableSurfaceAttributes, collisionBox: CollisionBoxComponent) => boolean;
    onCollideTop: (surface: CollidableSurfaceAttributes, collisionBox: CollisionBoxComponent) => boolean;
    onCollideBottom: (surface: CollidableSurfaceAttributes, collisionBox: CollisionBoxComponent) => boolean;

    constructor(props: CollidableComponentProps){
        this.position = props.position;
        this.width = props.width;
        this.height = props.height;
        this.onCollideSide = props.onCollideSide;
        this.onCollideTop = props.onCollideTop;
        this.onCollideBottom = props.onCollideBottom;
    }

    collidSide = (collisionBox: CollisionBoxComponent): boolean => {
        return this.onCollideSide({
            position: this.position,
            width: this.width,
            height: this.height
        }, collisionBox);
    }

    collideTop = (collisionBox: CollisionBoxComponent) => {
        return this.onCollideTop({
            position: this.position,
            width: this.width,
            height: this.height
        }, collisionBox);
    }

    collideBottom = (collisionBox: CollisionBoxComponent) => {
        return this.onCollideBottom({
            position: this.position,
            width: this.width,
            height: this.height
        }, collisionBox);
    }

}

export default CollidableComponent;