const router = require('express').Router();

const con = require('../app/database');

router.get('/', function ( req , res ) {

    var sql = `select * from kategori` ;

    con.query( sql , function ( err, rows){

        res.json( rows )

    });
        
});

module.exports = router;