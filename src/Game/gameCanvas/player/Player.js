import image from './assets/idle.png'
import Pellet from './projectiles/Pellet';

export default class Player {

    constructor(args){
        this.sprite = new Image();
        this.position = args.position;
        this.speed = args.speed;
        this.radius = args.radius;
        this.gravity = 0.5;
        this.jumpspeed = 13;
        this.verticalspeed = 0;
        this.previousState = { left: 0, right: 0, space: 0, enter: 0, shoot: 0 };
        this.create = args.create;
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
        if (keys.shoot && !this.previousState.shoot){
            let pellet = new Pellet({
                position: JSON.parse(JSON.stringify(this.position))
            })
            this.create(pellet,'pellets');
        }
        if ( this.position.y > 400) this.position.y = 400;
        this.previousState = {...keys};
    }

    render(state,name){
        const context = state.context;
        context.save();
        context.translate(this.position.x, this.position.y);
        context.font = "20px Arial";
        context.lineWidth = "3";
        context.strokeStyle = "white";
        context.fillStyle = "red";
        context.fillText(name,-17, -45);
        context.strokeStyle = '#ffffff';
        context.fillStyle = '#ffffff';
        context.lineWidth = 2;
        context.drawImage(this.sprite,0,-43);
        context.fill();
        context.stroke();
        context.restore();
    }
}