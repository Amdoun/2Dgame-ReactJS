import GameObject from "gameobjects";
import { GameCanvasState } from "game/GameCanvas";

interface CameraComponentProps {
    watch: GameObject;
    scaleratio: number,
    vpwidth: number,
    vpheight: number,
    swidth: number,
    sheight: number,
}

class CameraComponent {

    watch: GameObject;
    scaleratio: number;
    vpwidth: number;
    vpheight: number;
    swidth: number;
    sheight: number;

    constructor(props: CameraComponentProps){
        this.watch = props.watch;
        this.scaleratio = props.scaleratio;
        this.vpwidth = props.vpwidth;
        this.vpheight = props.vpheight;
        this.swidth = props.swidth;
        this.sheight = props.sheight;
    }

    update = (state: GameCanvasState, obj: GameObject) => {
        const context = state.context;
        context.save();
        context.setTransform(1,0,0,1,0,0);
        context.scale(this.scaleratio, this.scaleratio);
        context.fillRect(0, 0, this.swidth, this.sheight);
        if (this.watch.positionComponent){
            var pos = this.watch.positionComponent.position;
            var camX = this.clamp(-pos.posX + this.vpwidth/2, -this.vpwidth, 0);
            var camY = this.clamp(-pos.posY + this.vpheight/2, -this.vpheight, 0);
            context.translate(camX, camY);
        }
        context.globalAlpha = 1;
    }

    clamp = (value:number, min: number, max: number) => {
        if(value < min) return min;
        else if(value > max) return max;
        return value;
    }

}

export default CameraComponent;