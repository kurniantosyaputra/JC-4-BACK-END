import React from 'react';
import { Link } from 'react-router-dom';
import './Featured.css'

let Featured = (props) =>
    <div className="featured">
        <Link to={`/kategori/${props.idFeatured}`}>
            <div>
                <img src={props.imgFeatured} alt={props.featuredName}/>
                <h1>{props.featuredName}</h1>
            </div>
        </Link>
        <p>{props.testimoniFeatured}</p>
    </div>

export default Featured;