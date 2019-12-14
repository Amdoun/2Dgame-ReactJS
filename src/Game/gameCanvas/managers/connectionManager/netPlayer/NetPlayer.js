export default class NetPlayer {

    constructor(args){
        this.id = args.id;
        this.position = args.position;
    }

    update(position){
        this.position.x = position.x
        this.position.y = position.y
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