var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cors = require('cors');
app.use (cors());

// USER HOME

var season = require('../routes/season');
app.use('/season', season);

// USER SUB KATEGORI

var subkategori = require('../routes/subkategori');
app.use('/subkategori',subkategori);

// USER PRODUk

var produk = require('../routes/produk');
app.use ( '/produk' , produk);

// USER PRODUK DETAIL

var detailproduk = require('../routes/detailproduk');
app.use( '/detailproduk' , detailproduk);

// CART 
var cart = require('../routes/cart');
app.use('/cart' , cart )

var addcart = require('../routes/addtocart');
app.use('/addcart' , addcart);

// INVOICE DETAIL 

var invoice_detail = require('../routes/invoicedetail')
app.use('/invoicedetail' ,invoice_detail)


// ADD INVOICE 

var addinvoice = require('../routes/addtoinvoice');
app.use ('/addinvoice' , addinvoice );



app.listen(3020);