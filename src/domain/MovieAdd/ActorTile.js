import React from 'react';
import './ActorTile.scss'

const ActorTile = ({name,image,role, setActors, actors}) => {
    const handleRemove = ()=>{
        if(window.confirm("Êtes-vous sûr de vouloir faire ça ?")){
            setActors(actors.filter(actor => actor.name !== name))
        }
    }
    return (
        <li className="actor-tile">
            <div className="delete-btn" onClick={handleRemove}>x</div>
            <div className="bg-img">
                {image && <img src={image}/>}
            </div>
            <div className="actor-tile-body">
                <h3 className="title">{name}</h3>
                <p className="role">{role}</p>
            </div>
        </li>
    )
}
export default ActorTile;