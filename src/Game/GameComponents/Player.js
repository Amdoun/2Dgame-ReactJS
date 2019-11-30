export default class Player {

    constructor(args){
        this.position = args.position;
        this.speed = args.speed;
        this.radius = args.radius;
        this.gravity = 0.5;
        this.jumpspeed = 20;
        this.verticalspeed = 0;
        this.previousState = { left: 0, right: 0, space: 0, enter: 0 };
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
        context.strokeStyle = '#ffffff';
        context.fillStyle = '#ffffff';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(0, -25);
        context.lineTo(15, 15);
        context.lineTo(5, 15);
        context.lineTo(-5, 15);
        context.lineTo(-15, 15);
        context.closePath();
        context.fill();
        context.stroke();
        context.restore();
    }
}