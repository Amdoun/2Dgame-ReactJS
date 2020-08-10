import { GamePosition } from "types";
import GameObject from "gameobjects";

class PositionComponent {

    position: GamePosition;

    constructor(position: GamePosition){
        this.position = position;
    }

    update = (obj: GameObject) => {

    }

}

export default PositionComponent;