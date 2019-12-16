import image from './assets/pellet.png';

export default class Pellet {

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