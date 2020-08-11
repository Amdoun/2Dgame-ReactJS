import GameObject from "gameobjects";
import { GamePosition } from "types";

interface BoxCollisionComponentProps {
    width: number;
    height: number;
}

class BoxCollisionComponent {

    width: number;
    height: number;
    collidedhor: boolean = false;
    collidedver: boolean = false;
    impactoffset: GamePosition = {posX: 0, posY: 0};
    tiles: (GameObject | null)[] = [];

    constructor(props: BoxCollisionComponentProps){
        this.width = props.width;
        this.height = props.height;
    }

    collideWorld = (obj: GameObject) => {
        if (obj.positionComponent && obj.physicsComponent){
            var pos = obj.positionComponent.position
            this.collidedhor = false;
            this.collidedver = false;
            for (var i = Math.floor((pos.posX + obj.physicsComponent.velocity.hsp) / 16) - 1;
             i < Math.ceil((pos.posX + this.width + obj.physicsComponent.velocity.hsp) / 16) + 1; i++){
                for (var j = Math.floor((pos.posY + obj.physicsComponent.velocity.vsp) / 16) - 1;
                 j < Math.ceil((pos.posY + this.height + obj.physicsComponent.velocity.vsp) / 16) + 1; j++){
                    var tile = this.tiles[50*(j - 1) + i];
                    var tilepos = tile?.positionComponent?.position;
                    //Check horizontal collision
                    if (tile instanceof GameObject && tilepos && tile.tileCollisionComponent &&
                        pos.posY + this.height > tilepos.posY &&
                        pos.posY < tilepos.posY + tile.tileCollisionComponent.height){
                        if (pos.posX + this.width + obj.physicsComponent.velocity.hsp >= tilepos.posX &&
                            pos.posX < tilepos.posX + tile.tileCollisionComponent.width){
                                this.impactoffset.posX = tilepos.posX - pos.posX - this.width - 1;
                                this.collidedhor = true;
                        }
                        if (pos.posX + obj.physicsComponent.velocity.hsp <= tilepos.posX + tile.tileCollisionComponent.width &&
                            pos.posX > tilepos.posX + tile.tileCollisionComponent.width){
                                this.impactoffset.posX = tilepos.posX + tile.tileCollisionComponent.width - pos.posX + 1;
                                this.collidedhor = true;
                        }
                    }

                    //Check vertical collision
                    if (tile instanceof GameObject && tilepos && tile.tileCollisionComponent &&
                        pos.posX + this.width > tilepos.posX &&
                        pos.posX < tilepos.posX + tile.tileCollisionComponent.width){
                        if (pos.posY + this.height + obj.physicsComponent.velocity.vsp  >= tilepos.posY &&
                            pos.posY < tilepos.posY + tile.tileCollisionComponent.height){
                                this.impactoffset.posY = tilepos.posY - pos.posY - this.height - 1;
                                this.collidedver = true;
                        }
                        if (pos.posY + obj.physicsComponent.velocity.vsp <= tilepos.posY + tile.tileCollisionComponent.height &&
                            pos.posY > tilepos.posY + tile.tileCollisionComponent.height){
                                this.impactoffset.posY = tilepos.posY + tile.tileCollisionComponent.height - pos.posY + 1;
                                this.collidedver = true;
                        }
                    }
                }
            }

        }
    }

    /*
    collideSide = (width: number, height: number, position: GamePosition, hspeed: number) => {
        for (var i = Math.floor(position.posX / 16) - 1; i < Math.ceil((position.posX + width) / 16) + 1; i++){
            for (var j = Math.floor(position.posY / 16) - 1; j < Math.ceil((position.posY + height) / 16) + 1; j++){
                var solidtile = this.solidtiles[50*(j - 1) + i];
                if (solidtile instanceof SolidTile && 
                    position.posY + height > solidtilepos.posY &&
                    position.posY < solidtilepos.posY + solidtile.height){
                    if (position.posX + width + hspeed >= solidtilepos.posX &&
                        position.posX < solidtilepos.posX + solidtile.width){
                        return false;
                    }
                    if (position.posX + hspeed <= solidtilepos.posX + solidtile.width &&
                        position.posX > solidtilepos.posX + solidtile.width){
                        return false;
                    }
                }
            }
        }
        return true;
    }

    //Static tiles should only be drawn once
    //Get rid of hard coded values e.g. tile size and map width 
    collideTop = (width: number, height: number, position: GamePosition, vspeed: number) => {        
        for (var i = Math.floor(position.posX / 16) - 1; i < Math.ceil((position.posX + width) / 16) + 1; i++){
            for (var j = Math.floor(position.posY / 16) - 1; j < Math.ceil((position.posY + height) / 16) + 1; j++){
                var solidtile = this.solidtiles[50*(j - 1) + i];
                if (solidtile instanceof SolidTile && 
                    position.posX + width > solidtilepos.posX &&
                    position.posX < solidtilepos.posX + solidtile.width){
                    if (position.posY + height + vspeed >= solidtilepos.posY &&
                        position.posY < solidtilepos.posY + solidtile.height){
                        return false;
                    }
                    if (position.posY + height < solidtilepos.posY &&
                        position.posY >= solidtilepos.posY + solidtile.height){
                        return false;
                    }
                }
            }
        }
        return true;
    }
    */

    update = (obj: GameObject) => {
        this.collideWorld(obj);
    }

}

export default BoxCollisionComponent;