const router = require('express').Router();

const con = require('../app/database');

router.get ('/:id' , function ( req, res ) {

    con.query(' select * from invoice_data where ? ' ,
        { kode_invoice : req.params.id }, function( err, datainvoice ) {

            con.query('select * from invoice_detail where ? ',
            { kode_invoice : req.params.id } , function( err, invoicedetail ) {

                res.json( invoicedetail )
        })
    })
})

module.exports = router