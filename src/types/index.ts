//Game related
export interface GamePosition {
    posX : number,
    posY: number
}

export interface GameVelocity {
    hsp: number,
    vsp: number,
}

//Connection related
export enum ConnectionStatus {
    CONNECTED,
    CONNECTING,
    DISCONNECTED
}
