const router = require('express').Router();

const con = require('../app/database');

router.get( '/:id' , function ( req , res ) {

    con.query(`select cr.id,nama,nama_produk,ukuran,warna,stok,qty,harga,alamat,email, (harga * qty) as total_harga  
    from produk pr JOIN produk_warna pw 
    ON pr.id = pw.id_produk join produk_size ps 
    ON pw.id = ps.id_produk_warna join cart cr 
    ON ps.id = cr.id_produk_size  join user us 
    ON us.id = cr.id_user where id_user = ${req.params.id}` , function ( err , rows ) {

        res.json ( rows )

    })  

})


router.post( '/update/:id? ' , function (req, res ){

    con.query( ' update cart set ? where ? ' , 

        [
            {
                qty : req.body.qty 
            },
            {
                id : req.params.id
            }
        ])

        res.json(req.body)    

    })


router.get( '/delete/:id ' , function ( req, res ) {

    con.query( ' delete from cart where ? ' , 
    { id : req.params.id })

})    

module.exports = router