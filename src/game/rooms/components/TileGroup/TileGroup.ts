import GameObject from "gameobjects";
import TileCollisionComponent from "gamecomponents/TileCollisionComponent";
import GraphicsComponent from "gamecomponents/GraphicsComponent";
import { PositionComponent } from "gamecomponents/PositionComponent";

interface TileGroupProps {
    tilesize: number,
    roombitmap: HTMLImageElement
}

class TileGroup {

    tilesize: number;
    roombitmap: HTMLImageElement;
    roomcanvas: HTMLCanvasElement;
    tiles: (GameObject | null)[] = [];

    constructor(props: TileGroupProps){
        this.tilesize = props.tilesize;
        this.roombitmap = props.roombitmap;
        this.roomcanvas = document.createElement("canvas");
        this.roomcanvas.width = this.roombitmap.width;
        this.roomcanvas.height = this.roombitmap.height;
        this.init();
    }

    init = () => {
        var context = this.roomcanvas.getContext("2d");
        if (context){
            context.drawImage(this.roombitmap,0,0);
            var data = context.getImageData(0,0,this.roombitmap.width,this.roombitmap.height).data;
            if (data){
                for (var i = 0; i < data.length; i+=4){
                    if (data[i] == 0){
                        var tile: GameObject = new GameObject({
                            positionComponent: new PositionComponent(
                                {
                                    posX: (i/4 % this.roombitmap.width ) * this.tilesize,
                                    posY: Math.floor(i/4 / this.roombitmap.width) * this.tilesize
                                }
                            ),
                            graphicsComponent: new GraphicsComponent(),
                            tileCollisionComponent: new TileCollisionComponent({width: 16, height: 16})
                        });
                        this.tiles.push(tile);
                    } else {
                        this.tiles.push(null);
                    }
                }
            }
        }
    }

}

export default TileGroup;