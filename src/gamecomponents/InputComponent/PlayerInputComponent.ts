import _ from 'lodash';
import { InputManager } from "managers";
import InputComponent from "./InputComponent";

interface Inputs {
    left: boolean,
    right: boolean,
    jump: boolean,
    shoot: boolean
}

class PlayerInputComponent extends InputComponent {

    protected currentInputs: Inputs = {left: false, right: false, jump: false, shoot: false};
    protected previousInputs: Inputs = {left: false, right: false, jump: false, shoot: false};

    constructor(inputManager: InputManager){
        super(inputManager);
    }

    getInputs = (): Inputs => {
        this.previousInputs = _.clone(this.currentInputs);
        this.currentInputs = {
            left: this.inputManager.pressedKeys.left,
            right: this.inputManager.pressedKeys.right,
            jump: this.inputManager.pressedKeys.jump,
            shoot: this.inputManager.pressedKeys.shoot
        };
        return this.currentInputs;
    }

    //I don't think i need to redefine the previous inputs getter
}

export default PlayerInputComponent;