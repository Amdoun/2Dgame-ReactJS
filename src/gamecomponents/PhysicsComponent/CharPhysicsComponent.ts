import GameObject from "gameobjects";
import PhysicsComponent from "./PhysicsComponent";

interface CharPhysicsComponentProps {
    jumpspeed: number;
    gravity: number,
    maxfallspeed: number;
    airfriction: number;
    groundaccel: number;
    maxhorspeed: number;
    groundfriction: number;
}

class CharPhysicsComponent extends PhysicsComponent {

    //Attributes
    jumpspeed: number;
    gravity: number;
    maxfallspeed: number;
    airfriction: number;
    groundaccel: number;
    maxhorspeed: number;
    groundfriction: number;

    constructor(props: CharPhysicsComponentProps){
        super();
        this.jumpspeed = props.jumpspeed;
        this.gravity = props.gravity;
        this.maxfallspeed = props.maxfallspeed;
        this.airfriction = props.airfriction;
        this.groundaccel = props.groundaccel;
        this.maxhorspeed = props.maxhorspeed;
        this.groundfriction = props.groundfriction;
    }

    update = (obj: GameObject) => {
        
        if (obj.inputComponent !== undefined){
            var inputs = obj.inputComponent.getInputs();
            var previnputs = obj.inputComponent.getPreviousInputs();
            if (inputs.left && !inputs.right){
                this.velocity.hsp = -4;
            }
            else
            if (inputs.right && !inputs.left){
                this.velocity.hsp = 4
            } else {
                this.velocity.hsp = 0;
            }
            if (inputs.jump && !previnputs.jump){
                this.velocity.vsp = -this.jumpspeed;
            }
        }
        
        if (this.velocity.vsp < this.maxfallspeed) { this.velocity.vsp += this.gravity;
        } else { this.velocity.vsp = this.maxfallspeed; }

        if (obj.boxCollisionComponent){
            obj.boxCollisionComponent.update(obj);
            if (obj.boxCollisionComponent.collidedhor) this.velocity.hsp = 0;
            if (obj.boxCollisionComponent.collidedver) this.velocity.vsp = 0;
        }

        if (obj.position !== undefined){
            obj.position = {
                posX: obj.position.posX + this.velocity.hsp,
                posY: obj.position.posY + this.velocity.vsp
            }
        }
    }
}

export default CharPhysicsComponent;