import AnimationComponent from "./AnimationComponent";
import GameObject from "gameobjects";
import idle_asset from "assets/Player/idle.png";

class PlayerAnimationComponent extends AnimationComponent {

    constructor(){
        super();
    }

    init = () => {
        this.sprite.src = idle_asset;
    }

    update = (obj: GameObject) => {

    }
}

export default PlayerAnimationComponent;