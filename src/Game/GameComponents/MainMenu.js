export default class MainMenu {

    constructor(){
        this.displayText = "Connecting..."
        this.connectButtonHovered = false;
        this.buttonAttributes = { width: 120, height: 50, posX: 340, posY: 175}
        this.bindMouseClickEvent();
    }

    bindMouseClickEvent(){
        window.addEventListener("click", () => this.handleMenuClick())
    }

    handleMenuClick(){
        if (this.connectButtonHovered){
            //works
        }
    }

    update(mousePos){
        let w = this.buttonAttributes.width
        let h = this.buttonAttributes.height
        let px = this.buttonAttributes.posX
        let py = this.buttonAttributes.posY
        if (mousePos.x > px && mousePos.x < px+w && mousePos.y > py && mousePos.y < py+h){
            this.connectButtonHovered = true
        } else {
            this.connectButtonHovered = false
        }
    }

    setDisplayText(text){
        this.displayText = text
    }
    
    render(state){
        const context = state.context;
        context.save();
        context.font = "20px Arial";
        context.beginPath();
        context.lineWidth = "3";
        context.strokeStyle = "white";
        context.rect(340,175,120,50);
        if (this.connectButtonHovered){
            context.fillStyle = "gray";
            context.fill();
        }
        context.fillStyle = "white";
        context.fillText("Connect",360,205);
        context.stroke();
        context.fillText(this.displayText,0,15);
        context.restore();
    }
}