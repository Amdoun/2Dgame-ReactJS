import { GameCanvasState } from "game/GameCanvas";
import { InputActions } from "managers/InputManager/InputManager";

abstract class GameObject {

    delete: boolean = false;

    update = (input: InputActions) => {

    }

    render = (state: GameCanvasState) => {

    }

    destroy = () => {
        this.delete = true;
    }
    
}

export default GameObject;