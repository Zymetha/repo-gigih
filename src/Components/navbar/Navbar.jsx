import React  from "react";
import './Navbar.css';

function Navbar({title}){

    return(
        <div className="title">
            <h1>{title}</h1>
        </div>
    );
}


export default Navbar;