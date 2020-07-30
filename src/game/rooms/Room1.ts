import GameObject, { Player } from "gameobjects";
import { GameCanvasState } from "game/GameCanvas";
import { SolidGroup } from "gameobjects/Tiles/Group";
import room1 from 'assets/Room/room1.png';

export const room1map = (state: GameCanvasState, create: Function) => ( new Promise<GameObject[]>((resolve,reject) => {
    var roombitmap: HTMLImageElement = new Image();
    roombitmap.src = room1;
    var solidgroup: SolidGroup = new SolidGroup({
        tilesize: 16,
        roombitmap: roombitmap
    })
    if (roombitmap.complete){
        resolve([
            new Player({
                position: {
                    posX: state.screen.width/2,
                    posY: state.screen.height/2
                },
                create: create
            }),
            ...solidgroup.tiles
        ])
    } else {
        reject(new Error("Not loaded"))
    }
}))
