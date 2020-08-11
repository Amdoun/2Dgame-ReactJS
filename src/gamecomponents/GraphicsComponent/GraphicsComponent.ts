import { GameCanvasState } from "game/GameCanvas";
import GameObject from "gameobjects";

class GraphicsComponent {

    update = (obj: GameObject, state: GameCanvasState) => {
        const context = state.context;
        context.save();
        context.beginPath();
        context.fillStyle = '#ffffff';
        
        /*
        context.font = "20px Arial";
        context.lineWidth = "3";
        context.strokeStyle = "white";
        context.fillStyle = "red";
        context.fillText("test",-17, -45);
        
        context.fillStyle = '#ffffff';
        context.lineWidth = 2;
        context.scale(1, 1);
        */
       
        context.strokeStyle = '#ffffff';
        context.rect(obj.positionComponent?.position.posX, obj.positionComponent?.position.posY, 16, 16);
        context.stroke();
        context.restore();
    }

}

export default GraphicsComponent;