import React, {useState} from "react";
import "./Nav.scss"
import {NavLink} from "react-router-dom";
import Confirm from "../Confirm/Confirm";

const Nav = () => {
    const [confirm, setConfirm] = useState(false)
    return (
        <nav className="nav">
            <div className="nav-links-wrapper">
                <NavLink className="link" to="/">
                    <div className="icon-movie"></div>
                </NavLink>
                <NavLink className="link" to="/add">
                    <div className="icon-add_movie"></div>
                </NavLink>
                <div className="link" onClick={()=>{setConfirm(true)}}>
                    <div className="icon-user"></div>
                </div>
                <div className="link" onClick={()=>{setConfirm(true)}}>
                    <div className="icon-network"></div>
                </div>
            </div>
            {confirm && <Confirm message={"Cette fonctionnalité arrive bientôt !"} setConfirm={setConfirm}/>}
        </nav>
    )
}

export default Nav;