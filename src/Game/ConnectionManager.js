import socketIOClient from "socket.io-client";
import { environment as env } from "../environments/environment"
import NetPlayer from './GameComponents/NetPlayer';

export default class ConnectionManager {

    constructor(){
        this.timeout = null
        this.netPlayers = []
        this.socket = null
        this.connectionStatus = env.connectingStatus
    }

    handleNetPlayers(data){
        let netPlayersData = data.filter( element => element.id !== this.socket.id)
        //Check if player disconnected
        if (this.netPlayers.length > netPlayersData.length){
            let newNetplayers = []
            this.netPlayers.forEach( element => {
                if (netPlayersData.filter( el => el.id === element.id).length > 0){
                    newNetplayers.push(element)
                }
            })
            this.netPlayers = newNetplayers;
        }
        netPlayersData.forEach( element => {
            // If player not in this.netPlayers
            if (this.netPlayers.filter( el => el.id === element.id).length === 0){
                //Add new player
                let netPlayer = new NetPlayer({id: element.id, position: element.position})
                this.netPlayers.push(netPlayer)
            } else {
                //Update existing player position
                this.netPlayers.filter( el => el.id === element.id)[0].update(element.position)
            }
        })
    }
    
    update(state,player){
        this.netPlayers.forEach( element => element.render(state))
        if (this.connectionStatus === env.connectedStatus){
            this.socket.emit("position", player.position);
        }
    }

    connect(){
        this.socket.connect()
        this.connectionStatus = env.connectingStatus;
        this.timeout = setTimeout(() => {
            this.socket.disconnect()
            this.connectionStatus = env.disconnectedStatus;
        }, 10000)
    }

    initConnection(){
        this.socket = socketIOClient(env.ServerUrl);
        this.timeout = setTimeout(() => {
            this.socket.disconnect()
            this.connectionStatus = env.disconnectedStatus;
        }, 10000)
        this.socket.on("players", data => {
            this.handleNetPlayers(data);
        })
        this.socket.on("connect",() => {
            this.connectionStatus = env.connectedStatus;
            clearTimeout(this.timeout)
        })
        this.socket.on("disconnect",() => {
            this.connectionStatus = env.connectingStatus;
            this.timeout = setTimeout(() => {
                this.socket.disconnect()
                this.connectionStatus = env.disconnectedStatus;
            }, 10000)
        })
    }
}