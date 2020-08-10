import StateComponent from "./StateComponent";

enum DirEnum {
    LEFT,
    RIGHT
}

class CharStateComponent extends StateComponent {

    walk: boolean = false;
    stand: boolean = false;
    air: boolean = false;
    ground: boolean = false; 
    direction: DirEnum = DirEnum.RIGHT 

}

export default CharStateComponent;