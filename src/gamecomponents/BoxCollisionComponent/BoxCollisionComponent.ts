import GameObject from "gameobjects";

interface BoxCollisionComponentProps {
    width: number;
    height: number;
}

class BoxCollisionComponent {

    width: number;
    height: number;
    collidedhor: boolean = false;
    collidedver: boolean = false;
    tiles: (GameObject | null)[] = [];

    constructor(props: BoxCollisionComponentProps){
        this.width = props.width;
        this.height = props.height;
    }

    collideWorld = (obj: GameObject) => {
        if (obj.position && obj.physicsComponent){
            this.collidedhor = false;
            this.collidedver = false;
            for (var i = Math.floor((obj.position.posX + obj.physicsComponent.velocity.hsp) / 16) - 1;
             i < Math.ceil((obj.position.posX + this.width + obj.physicsComponent.velocity.hsp) / 16) + 1; i++){
                for (var j = Math.floor((obj.position.posY + obj.physicsComponent.velocity.vsp) / 16) - 1;
                 j < Math.ceil((obj.position.posY + this.height + obj.physicsComponent.velocity.vsp) / 16) + 1; j++){
                    var tile = this.tiles[50*(j - 1) + i];
                    //Check horizontal collision
                    if (tile instanceof GameObject && tile.position && tile.tileCollisionComponent &&
                        obj.position.posY + this.height > tile.position.posY &&
                        obj.position.posY < tile.position.posY + tile.tileCollisionComponent.height){
                        if (obj.position.posX + this.width + obj.physicsComponent.velocity.hsp >= tile.position.posX &&
                            obj.position.posX < tile.position.posX + tile.tileCollisionComponent.width){
                                this.collidedhor = true;
                        }
                        if (obj.position.posX + obj.physicsComponent.velocity.hsp <= tile.position.posX + tile.tileCollisionComponent.width &&
                            obj.position.posX > tile.position.posX + tile.tileCollisionComponent.width){
                                this.collidedhor = true;
                        }
                    }

                    //Check vertical collision
                    if (tile instanceof GameObject && tile.position && tile.tileCollisionComponent &&
                        obj.position.posX + this.width > tile.position.posX &&
                        obj.position.posX < tile.position.posX + tile.tileCollisionComponent.width){
                        if (obj.position.posY + this.height + obj.physicsComponent.velocity.vsp  >= tile.position.posY &&
                            obj.position.posY < tile.position.posY + tile.tileCollisionComponent.height){
                            this.collidedver = true;
                        }
                        if (obj.position.posY + obj.physicsComponent.velocity.vsp <= tile.position.posY + tile.tileCollisionComponent.height &&
                            obj.position.posY > tile.position.posY + tile.tileCollisionComponent.height){
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
                    position.posY + height > solidtile.position.posY &&
                    position.posY < solidtile.position.posY + solidtile.height){
                    if (position.posX + width + hspeed >= solidtile.position.posX &&
                        position.posX < solidtile.position.posX + solidtile.width){
                        return false;
                    }
                    if (position.posX + hspeed <= solidtile.position.posX + solidtile.width &&
                        position.posX > solidtile.position.posX + solidtile.width){
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
                    position.posX + width > solidtile.position.posX &&
                    position.posX < solidtile.position.posX + solidtile.width){
                    if (position.posY + height + vspeed >= solidtile.position.posY &&
                        position.posY < solidtile.position.posY + solidtile.height){
                        return false;
                    }
                    if (position.posY + height < solidtile.position.posY &&
                        position.posY >= solidtile.position.posY + solidtile.height){
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