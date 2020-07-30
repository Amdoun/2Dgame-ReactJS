import { GamePosition } from "types";

class CollisionBoxComponent {

    collideSide = (width: number, height: number, position: GamePosition) => {
        return true;
    }

    collideTop = (width: number, height: number, position: GamePosition) => {
        return true;
    }

    collideBottom = (width: number, height: number, position: GamePosition) => {
        return true;
    }
}

export default CollisionBoxComponent;