import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setDisplayName } from './nameSlice';
import { setConnectStatus } from '../gameCanvas/managers/connectionManager/connectionSlice';
import { connectionStatus } from '../gameCanvas/managers/connectionManager/connectionConsts'
import './Menu.css';

const Menu = ({ connection, setDisplayName, setConnectStatus }) => {

    const [name, setName] = useState('player');

    return(
        <div>
            <span className="menu-connectionstatus">{connection}</span>
            {connection === connectionStatus.DISCONNECTED &&
            <div className="menu-main">
                Enter display name :
                <input className="menu-textinput" value={name} onChange={(e) => setName(e.target.value)} type="text"></input>
                <input className="menu-button" type="button" 
                onClick={() => {
                    setDisplayName(name);
                    setConnectStatus(connectionStatus.CONNECTING)
                }} value="Connect"></input>
            </div>}
        </div>
    )
}

const mapStateToProps = state => ({
    showMenu: state.showMenu,
    connection: state.connection
})

export default connect(mapStateToProps, { setDisplayName, setConnectStatus })(Menu);
