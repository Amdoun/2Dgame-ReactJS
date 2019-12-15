import { Component } from 'react';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import { setConnectStatus } from './connectionSlice'
import { setShowMenu } from '../../../menu/showMenuSlice';
import { connectionStatus as conStat } from "./connectionConsts";
import { serverUrl as servUrl } from './connectionConsts';
import NetPlayer from './netPlayer';

class ConnectionManager extends Component {

    constructor(props){
        super(props)
        this.state = {
            connectionStatus: this.props.connection
        }
        this.timeout = null;
        this.netPlayers = [];
        this.socket = null;
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.connection !== prevState.connectionStatus){
          return {connectionStatus : nextProps.connection};
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.connectionStatus !== this.state.connectionStatus 
            && prevState.connectionStatus === conStat.DISCONNECTED) {
            this.props.setShowMenu(false);
            console.log("connection attempt");
            this.connect();
        }
    }
      
    //Handle netPlayers after receiving socket update
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
    
    //Every frame
    update(state,player){
        this.netPlayers.forEach( element => element.render(state))
        if (this.state.connectionStatus === conStat.CONNECTED){
            this.socket.emit("position", player.position);
        }
    }

    //Attempt connection
    connect(){
        this.socket.connect();
        this.triggerTimeout();
    }

    triggerTimeout(){
        this.timeout = setTimeout(() => {
            this.socket.disconnect();
            this.props.setConnectStatus(conStat.DISCONNECTED);
            this.netPlayers = [];
        }, 10000);
    }

    //On creation
    initConnection(){
        this.socket = socketIOClient(servUrl.SERVER_URL_DEV);
        this.triggerTimeout();
        this.socket.on("players", data => {
            this.handleNetPlayers(data);
        })
        this.socket.on("connect",() => {
            this.props.setConnectStatus(conStat.CONNECTED);
            clearTimeout(this.timeout)
        })
        this.socket.on("disconnect",() => {
            this.props.setConnectStatus(conStat.CONNECTING);
            this.triggerTimeout();
        })
    }

    //null returning component
    render(){
        return null;
    }
}

const mapStateToProps = state => ({
    connection: state.connection
})

export default connect(mapStateToProps, { setConnectStatus, setShowMenu }, null, { forwardRef: true })(ConnectionManager)