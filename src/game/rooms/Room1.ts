import GameObject from "gameobjects";
import { GameCanvasState } from "game/GameCanvas";
import TileGroup from './components/TileGroup';
import room1 from 'assets/Room/room1.png';
import GraphicsComponent from "gamecomponents/GraphicsComponent";
import CharPhysicsComponent from "gamecomponents/PhysicsComponent/CharPhysicsComponent";
import { PlayerInputComponent } from "gamecomponents/InputComponent";
import { BoxCollisionComponent } from "gamecomponents";
import { CharPositionComponent } from "gamecomponents/PositionComponent";
import CameraComponent from "gamecomponents/CameraComponent";

type Room1Promise = {
    gameobjects: GameObject[],
    tiles: (GameObject | null)[]
}

export const room1map = (state: GameCanvasState, create: Function) => ( new Promise<Room1Promise>((resolve,reject) => {
    var roombitmap: HTMLImageElement = new Image();
    roombitmap.src = room1;
    var tilegroup: TileGroup = new TileGroup({
        tilesize: 16,
        roombitmap: roombitmap
    });
    var player = new GameObject({
        positionComponent: new CharPositionComponent(
            {
                posX: state.screen.width/2,
                posY: state.screen.height/2
            }
        ),
        graphicsComponent: new GraphicsComponent(),
        inputComponent: new PlayerInputComponent(state.input),
        boxCollisionComponent: new BoxCollisionComponent({
            width: 16,
            height: 16
        }),
        physicsComponent: new CharPhysicsComponent({
            jumpspeed: 10,
            gravity: 0.4,
            maxfallspeed: 10,
            airfriction: 0,
            groundaccel: 0,
            maxhorspeed: 0,
            groundfriction: 0
        }),
        create: create
    })
    if (roombitmap.complete){
        var nonnulltilegroup: GameObject[] = [];
        tilegroup.tiles.forEach((element) => {
            if (element instanceof GameObject)
                nonnulltilegroup.push(element);
        })
        resolve({
            gameobjects: [
                new GameObject({
                    cameraComponent: new CameraComponent({
                        watch: player,
                        swidth: 800,
                        sheight: 400,
                        vpwidth: 400,
                        vpheight: 200,
                        scaleratio: 2
                    })
                }),
                player,
                ...nonnulltilegroup,
            ],
            tiles: tilegroup.tiles
        })
    } else {
        reject(new Error("Not loaded"))
    }
}))
