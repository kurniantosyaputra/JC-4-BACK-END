const router = require('express').Router();

const con = require('../app/database');

router.get('/:id?', function ( req , res ) {

    if ( req.params.id === undefined ) {
        con.query ( `select pr.id,tanggal_masuk_produk,
        kategori, jenis_kategori, 
        nama_produk, deskripsi, 
        harga, gambar from kategori ktg 
        join sub_kategori sbk on ktg.id = sbk.id_kategori 
        join produk pr on sbk.id = pr.id_sub_kategori` , function ( err, rows1 ) {

            res.json ( rows1 )

        })
    }
    else {
        var sql = `select pr.id,tanggal_masuk_produk,
        kategori, jenis_kategori, 
        nama_produk, deskripsi, 
        harga, gambar from kategori ktg 
        join sub_kategori sbk on ktg.id = sbk.id_kategori 
        join produk pr on sbk.id = pr.id_sub_kategori where sbk.id = ${req.params.id}` ;

        con.query( sql , function ( err, rows){

            res.json( rows ) ;

        });

    }    

});

module.exports = router;