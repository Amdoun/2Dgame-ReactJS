import image from './assets/idle.png'

export default class NetPlayer {

    constructor(args){
        this.sprite = new Image();
        this.id = args.id;
        this.position = args.position;
        this.name = args.name;
        this.init();
    }

    init(){
        this.sprite.src = image;
    }

    update(name, position){
        this.name = name;
        this.position.x = position.x;
        this.position.y = position.y;
    }

    render(state){
        const context = state.context;
        context.save();
        context.translate(this.position.x, this.position.y);
        context.font = "20px Arial";
        context.lineWidth = "3";
        context.strokeStyle = "white";
        context.fillStyle = "red";
        context.fillText(this.name,-17, -45);
        context.strokeStyle = '#ffffff';
        context.fillStyle = '#ffffff';
        context.lineWidth = 2;
        context.drawImage(this.sprite,0,-43);
        context.fill();
        context.stroke();
        context.restore();
    }
}