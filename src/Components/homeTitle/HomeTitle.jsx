import React  from "react";
import './HomeTitle.css';

function HomeTitle({title}){
    return(
        <div className="title">
            <h1>{title}</h1>
        </div>
    );
}


export default HomeTitle;