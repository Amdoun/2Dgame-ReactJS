import _ from 'lodash';
import { InputManager } from "managers";

type Inputs = {
    left?: boolean,
    right?: boolean,
    jump?: boolean,
    enter?: boolean,
    shoot?: boolean,
}

abstract class InputComponent {

    protected inputManager: InputManager;
    protected currentInputs: Inputs = {};
    protected previousInputs: Inputs = {};

    constructor(inputManager: InputManager){
        this.inputManager = inputManager;
    }

    getInputs = (): Inputs => {
        this.previousInputs = _.clone(this.currentInputs);
        this.currentInputs = {};
        return this.currentInputs;
    }

    getPreviousInputs = (): Inputs => {
        return this.previousInputs;
    }
}

export default InputComponent;