import image from '../../assets/idle.png'

export default class Player {

    constructor(args){
        this.sprite = new Image();
        this.position = args.position;
        this.speed = args.speed;
        this.radius = args.radius;
        this.gravity = 0.5;
        this.jumpspeed = 20;
        this.verticalspeed = 0;
        this.previousState = { left: 0, right: 0, space: 0, enter: 0 };
        this.init();
    }

    init(){
        this.sprite.src = image
    }

    update(keys){
        if (keys.right && this.position.x <= 800){
            this.position.x += this.speed
        } else
        if (keys.left && this.position.x >= 0){
            this.position.x -= this.speed
        }
        if ( this.verticalspeed < 20) this.verticalspeed+= this.gravity;
        this.position.y += this.verticalspeed;
        if (keys.space && !this.previousState.space){
            this.verticalspeed = 0;
            this.verticalspeed -= this.jumpspeed
        }
        if ( this.position.y > 400) this.position.y = 400;
        this.previousState = {...keys};
    }

    render(state){
        const context = state.context;
        context.save();
        context.translate(this.position.x, this.position.y);
        context.font = "20px Arial";
        context.beginPath();
        context.lineWidth = "3";
        context.strokeStyle = "white";
        context.fillStyle = "red";
        context.fillText("test",-17, -30);
        context.strokeStyle = '#ffffff';
        context.fillStyle = '#ffffff';
        context.lineWidth = 2;
        context.drawImage(this.sprite,0,-53);
        context.fill();
        context.stroke();
        context.restore();
    }
}