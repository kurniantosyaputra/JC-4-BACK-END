const router = require('express').Router();

const con = require('../app/database');

router.get('/:id?', function ( req , res ) {

    con.query( ` select * from produk_warna where id_produk = ${req.params.id}` , function ( err, warnaproduk ) {
            
        con.query( `select * from  produk where id  = ${req.params.id}`  , function ( err, produk ) {
            
            con.query( `select * from produk_size ` , function (err, ukuranproduk ) {
                let warna = new Object;
                for (let i in warnaproduk) {
                    warna[warnaproduk[i].warna] = ukuranproduk.filter(el => el.id_produk_warna === warnaproduk[i].id)
                    
                }
                res.json({...produk[0], warna})
            })
        })
 

    })

})    

                                  
   

module.exports = router;