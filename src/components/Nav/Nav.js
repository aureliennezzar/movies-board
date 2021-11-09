import React from "react";
import "./Nav.scss"
import {NavLink} from "react-router-dom";

const Nav = ()=>{
    return (
        <nav className="nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/add">Ajouter un film</NavLink>
        </nav>
    )
}

export default Nav;