const KEY = {
    LEFT:  37,
    RIGHT: 39,
    A: 65,
    D: 68,
    X: 88,
    SPACE: 32,
    ENTER: 13
 };

export default class InputManager{

    constructor() {
        this.pressedKeys = { left: 0, right: 0, space: 0, enter: 0, shoot: 0 };
    }

    bindKeys(){
        window.addEventListener('keyup', (e) => this.handleKeys(e,false))
        window.addEventListener('keydown',(e) => this.handleKeys(e,true))
    }

    unbindKeys(){
        window.removeEventListener('keyup',() => this.handleKeys())
        window.removeEventListener('keydown',() => this.handleKeys)
    }

    handleKeys(e, value){
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
                keys.space  = value;
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