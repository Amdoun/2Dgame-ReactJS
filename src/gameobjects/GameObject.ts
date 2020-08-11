import { GameCanvasState } from "game/GameCanvas";
import { InputActions } from "managers/InputManager/InputManager";
import { GamePosition } from "types";
import InputComponent from "gamecomponents/InputComponent/InputComponent";
import GraphicsComponent from "gamecomponents/GraphicsComponent/GraphicsComponent";
import PhysicsComponent from "gamecomponents/PhysicsComponent/CharPhysicsComponent";
import { BoxCollisionComponent } from "gamecomponents";
import TileCollisionComponent from "gamecomponents/TileCollisionComponent";
import { PositionComponent } from "gamecomponents/PositionComponent";
import CameraComponent from "gamecomponents/CameraComponent";

type GameObjectProps = {
    inputComponent?: InputComponent,
    graphicsComponent?: GraphicsComponent,
    physicsComponent?: PhysicsComponent,
    tileCollisionComponent?: TileCollisionComponent,
    boxCollisionComponent?: BoxCollisionComponent,
    stateComponent?: null,
    positionComponent?: PositionComponent,
    cameraComponent?: CameraComponent,
    create?: Function;
}

class GameObject {

    static id: number;
    inputComponent?: InputComponent;
    graphicsComponent?: GraphicsComponent;
    physicsComponent?: PhysicsComponent;
    tileCollisionComponent?: TileCollisionComponent;
    boxCollisionComponent?: BoxCollisionComponent;
    positionComponent?: PositionComponent;
    cameraComponent?: CameraComponent;
    create?: Function;
    delete: boolean = false;

    constructor(props: GameObjectProps){
        this.inputComponent = props.inputComponent;
        this.graphicsComponent = props.graphicsComponent;
        this.physicsComponent = props.physicsComponent;
        this.tileCollisionComponent = props.tileCollisionComponent;
        this.boxCollisionComponent = props.boxCollisionComponent;
        this.positionComponent = props.positionComponent;
        this.cameraComponent = props.cameraComponent;
        this.create = props.create;
    }

    update = (state: GameCanvasState) => {
        this.physicsComponent?.update(this);
        this.graphicsComponent?.update(this, state);
        this.boxCollisionComponent?.update(this);
        this.positionComponent?.update(this);
        this.cameraComponent?.update(state, this);
    }

    destroy = () => {
        this.delete = true;
    }
    
}

export default GameObject;