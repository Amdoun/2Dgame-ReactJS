export default class MouseManager {
    
    constructor(){
        this.mousePosition = { x: 0, y: 0} 
    }

    bindMouse(canvas){
        window.addEventListener("mousemove",(e) => this.trackPosition(e,canvas))
    }

    unBindMouse(){
        window.addEventListener("mousemove",() => this.trackPosition())
    }

    trackPosition(e,canvas){
        let rect = canvas.getBoundingClientRect()
        if (e){
            this.mousePosition = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        } else {
            this.mousePosition = { x: 0, y: 0 }
        }
    }
}