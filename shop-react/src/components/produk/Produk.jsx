import React from 'react';
import './Produk.css';

let Produk = props =>
    <div className="produk">
        <img src={props.imgUrl} alt={props.namaProduk}/>
        <h1>{props.namaProduk}</h1>
    </div>

export default Produk;