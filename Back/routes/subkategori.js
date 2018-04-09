const router = require('express').Router();

const con = require('../app/database');

router.get('/:id?' , function ( req , res) {

    if ( req.params.id === undefined ) {

        con.query( 'select * from sub_kategori' , function (err,rows1) {

            res.json(rows1)

        })

    }

    else {

        con.query(` select sbk.id, kategori, jenis_kategori from kategori ktg 
        join sub_kategori sbk on ktg.id = sbk.id_kategori 
        where ktg.id = ${req.params.id}` , function ( err, rows ) {

            res.json ( rows )

        })

    }   
     
})

module.exports = router;