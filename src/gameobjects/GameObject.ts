import { GameCanvasState } from "game/GameCanvas";
import { InputActions } from "managers/InputManager/InputManager";
import { GamePosition } from "types";
import InputComponent from "gamecomponents/InputComponent/InputComponent";
import GraphicsComponent from "gamecomponents/GraphicsComponent/GraphicsComponent";
import PhysicsComponent from "gamecomponents/PhysicsComponent/CharPhysicsComponent";
import { BoxCollisionComponent } from "gamecomponents";
import TileCollisionComponent from "gamecomponents/TileCollisionComponent";

type GameObjectProps = {
    position?: GamePosition,
    inputComponent?: InputComponent,
    graphicsComponent?: GraphicsComponent,
    physicsComponent?: PhysicsComponent,
    tileCollisionComponent?: TileCollisionComponent,
    boxCollisionComponent?: BoxCollisionComponent,
    stateComponent?: null,
    create?: Function;
}

class GameObject {

    static id: number;
    position?: GamePosition;
    inputComponent?: InputComponent;
    graphicsComponent?: GraphicsComponent;
    physicsComponent?: PhysicsComponent;
    tileCollisionComponent?: TileCollisionComponent;
    boxCollisionComponent?: BoxCollisionComponent;
    create?: Function;
    createComponent?: null;
    positionComponent?: null;
    delete: boolean = false;

    constructor(props: GameObjectProps){
        this.position = props.position;
        this.inputComponent = props.inputComponent;
        this.graphicsComponent = props.graphicsComponent;
        this.physicsComponent = props.physicsComponent;
        this.tileCollisionComponent = props.tileCollisionComponent;
        this.boxCollisionComponent = props.boxCollisionComponent;
        this.create = props.create;
    }

    update = (state: GameCanvasState) => {
        this.physicsComponent?.update(this);
        this.graphicsComponent?.update(this, state);
    }

    destroy = () => {
        this.delete = true;
    }
    
}

export default GameObject;