import SolidTile from "../SolidTile";

interface SolidGroupProps {
    tilesize: number,
    roombitmap: HTMLImageElement
}

class SolidGroup {

    tilesize: number;
    roombitmap: HTMLImageElement;
    roomcanvas: HTMLCanvasElement;
    tiles: SolidTile[] = [];

    constructor(props: SolidGroupProps){
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
                        var solidtile: SolidTile = new SolidTile({
                            position:{
                                posX: (i/4 % this.roombitmap.width ) * this.tilesize,
                                posY: Math.floor(i/4 / this.roombitmap.width) * this.tilesize
                            },
                            width: this.tilesize,
                            height: this.tilesize
                        });
                        this.tiles.push(solidtile);
                    }
                }
            }
        }
    }

}

export default SolidGroup;