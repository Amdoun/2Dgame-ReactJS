import PositionComponent from "./PositionComponent";
import { GamePosition } from "types";
import GameObject from "gameobjects";

class CharPositionComponent extends PositionComponent {

    constructor(position: GamePosition){
        super(position);
    }

    update = (obj: GameObject) => {
        if (obj.boxCollisionComponent && obj.physicsComponent){
            if (obj.boxCollisionComponent.collidedhor) {
                obj.physicsComponent.velocity.hsp = 0;
                this.position.posX += obj.boxCollisionComponent.impactoffset.posX;
            }
            if (obj.boxCollisionComponent.collidedver) {
                obj.physicsComponent.velocity.vsp = 0;
                this.position.posY += obj.boxCollisionComponent.impactoffset.posY;
            }
            this.position = {
                posX: this.position.posX + obj.physicsComponent.velocity.hsp,
                posY: this.position.posY + obj.physicsComponent.velocity.vsp
            }
        }
    }

}

export default CharPositionComponent;