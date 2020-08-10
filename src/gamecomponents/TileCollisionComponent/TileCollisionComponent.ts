interface TileCollisionComponentProps {
    width: number;
    height: number;
}

class TileCollisionComponent {

    width: number;
    height: number;

    constructor(props: TileCollisionComponentProps){
        this.width = props.width;
        this.height = props.height;
    }

}

export default TileCollisionComponent