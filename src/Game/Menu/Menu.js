import React from 'react';
import { connect } from 'react-redux';
import { setDisplayName } from './nameSlice';
import { setConnectStatus } from '../gameCanvas/managers/connectionManager/connectionSlice';
import { triggerStatus } from '../gameCanvas/managers/connectionManager/connectionConsts'
import './Menu.css';

const Menu = ({ setDisplayName, setConnectStatus }) => {
    return(
        <div className="menu-main">
            Enter display name :
            <input className="menu-textinput" onChange={(e) => setDisplayName(e.target.value)} type="text"></input>
            <input className="menu-button" type="button" onClick={() => setConnectStatus(triggerStatus.TRIGGERED)} value="Connect"></input>
        </div>
    )
}

export default connect(null, { setDisplayName, setConnectStatus })(Menu);
