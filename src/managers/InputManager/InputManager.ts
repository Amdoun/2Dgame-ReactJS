const KEY = {
    LEFT:  37,
    RIGHT: 39,
    A: 65,
    D: 68,
    X: 88,
    SPACE: 32,
    ENTER: 13
 };

export interface InputActions {
    left: boolean,
    right: boolean,
    jump: boolean,
    enter: boolean,
    shoot: boolean,
}

export default class InputManager{

    pressedKeys: InputActions;

    constructor() {
        this.pressedKeys = { left: false, right: false, jump: false, enter: false, shoot: false};
    }

    bindKeys(){
        window.addEventListener('keyup', (e) => this.handleKeys(e,false))
        window.addEventListener('keydown',(e) => this.handleKeys(e,true))
    }

    unBindKeys(){
        window.removeEventListener('keyup',() => this.handleKeys)
        window.removeEventListener('keydown',() => this.handleKeys)
    }

    handleKeys(e: any, value: boolean){
        let keys = this.pressedKeys;
        switch (e.keyCode) {
            case KEY.LEFT:
            case KEY.A:
                keys.left  = value;
                break;
            case KEY.RIGHT:
            case KEY.D:
                keys.right  = value;
                break;
            case KEY.SPACE:
                keys.jump  = value;
                break;
            case KEY.ENTER:
                keys.enter = value;
                break;
            case KEY.X:
                keys.shoot = value;
                break;
            default:
            }
        this.pressedKeys = keys;
    }

}