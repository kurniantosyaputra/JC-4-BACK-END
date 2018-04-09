const router = require('express').Router();

const con = require('../app/database');

router.post ( '/' , function ( req, res ) {

    con.query ( ' insert into cart set ? ' , {
        id_user : req.body.id_user,
        id_produk_size : req.body.id_produk_size,
        qty : req.body.qty,
        price : req.body.price , 

    })
    res.json()

})

module.exports = router