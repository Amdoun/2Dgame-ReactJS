import image from './assets/pellet.png';

export default class Pellet {

    constructor(args){
        this.sprite = new Image();
        this.position = args.position;
        this.init();
    }

    init(){
        this.sprite.src = image
    }

    update(){
        this.position.x += 4;
        if (this.position.x > 700)
            this.destroy();
    }

    destroy(){
        this.delete = true
    }

    render(state){
        const context = state.context;
        context.save();
        context.translate(this.position.x, this.position.y);
        context.strokeStyle = '#ffffff';
        context.fillStyle = '#ffffff';
        context.lineWidth = 2;
        context.drawImage(this.sprite,0,-43);
        context.fill();
        context.stroke();
        context.restore();
    }
}