import React from 'react';
import './Menu.css';

function Menu(){
    return(
        <div className="menu-main">
            Enter display name :
            <input className="menu-textinput" type="text"></input>
            <input className="menu-button" type="button" value="Connect"></input>
        </div>
    )
}

export default Menu;
