import { GameVelocity } from "types";
import GameObject from "gameobjects";

abstract class PhysicsComponent {

    //Variables
    velocity: GameVelocity = {hsp: 0, vsp: 0};

    update = (obj: GameObject) => {
        
    }
}

export default PhysicsComponent;