import GameObject from "gameobjects";

abstract class AnimationComponent {

    sprite: HTMLImageElement;

    constructor(){
        this.sprite = new Image();
        this.init();
    }

    init = () => {

    }

    update = (obj: GameObject) => {

    }

}

export default AnimationComponent;