import PositionComponent from "./PositionComponent";
import { GamePosition } from "types";
import GameObject from "gameobjects";

class CharPositionComponent extends PositionComponent {

    constructor(position: GamePosition){
        super(position);
    }

    update = (obj: GameObject) => {
        if (obj.physicsComponent){
            this.position = {
                posX: this.position.posX + obj.physicsComponent.velocity.hsp,
                posY: this.position.posY + obj.physicsComponent.velocity.vsp
            }
        }
    }

}

export default CharPositionComponent;