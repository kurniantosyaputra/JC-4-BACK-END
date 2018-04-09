var mysql = require ('mysql');
var express = require('express');
var app = express();
app.set('view engine','ejs');

var session = require('express-session');
app.use(session({secret:'rahasia'}));
var sess;

var uniqid = require('uniqid');
const  fileUpload = require('express-fileupload');
app.use(fileUpload())
app.use(express.static(__dirname + '/images'))

const crypto = require('crypto');
const secret = "abcdefg"

var bodyParser = require('body-parser')
var url = bodyParser.urlencoded({extended:false})

var conn = mysql.createConnection 
({
    host : "localhost",
    port : 3306,
    database : "shop",
    user : "root",
    password : "123"
})

//crypto
///////////
app.get('/encrypt',function (req, res) {
    const secret = "abcdefg" ;
    const hash = crypto.createHmac('sha256', secret)
    .update('test')
    .digest('hex')
    console.log(hash)
    res.end()
})

//Session//
//////////
// app.get('/*', (req, res, next) => {
//     if (req.session.username || req.url === '/' || req.url === '/register' || req.url==='/login' || req.url==='/home' || true)   next();
//     else res.redirect('/login')
// })


//destroy session
app.get('/logout', function (req,res) { 
    req.session.destroy(err => err ? console.log(err) : res.redirect('/login'))
})



//menampilkan form login
app.get('/login',function(req,res){
    res.render(__dirname+'/views/login')
})
app.post('/login',url , function (req,res){
conn.query("select id,username,pass,role from user where ?  ", {
    username : req.body.username 
}, (err,data) => {
    if (data.length > 0) {
        if (req.body.pass === data[0].pass) {
            req.session.username = req.body.username;
            req.session.userid = data[0].id;
            req.session.role = data[0].role;
            res.redirect('/homeadmin');    
        } else {
            res.redirect('/login');
        }
    }   else {
        res.render(__dirname+'/views/login', {
            notif: "Password dan Email yang anda masukkan salah"                        
        })
    } 
})

})    
//////////
/////////
//////////////////////////////////////////////  GLOBAL USER ////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/register',function (err,res){
    res.render(__dirname+'/views/register')
})

app.post('/registeruser',url, function(req,res){
    conn.query(" select * from user where username = ? " , [req.body.username] , function (err,rows) {
        if ( rows.length > 0 )
        {
            res.render(__dirname+'/views/register' , {
                notif : 'username Sudah Terdaftar !'
            })
        }
        else {
            conn.query(' insert into user set ? ' , {
                nama : req.body.nama,
                pass : req.body.pass,
                alamat : req.body.alamat,
                email : req.body.email,
                username : req.body.username,
                role : req.body.role
            })
            res.redirect('/login')
        }
    })
})





app.get('/home',function(req,res){
    conn.query('select * from kategori', function (err,rows,field){
        res.render(__dirname+'/views/global/home',{x:rows,dataheader: req.session.username , role : req.session.role , iduser : req.session.userid})
    })
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/subkategori/:id',function(req,res){
    conn.query('select sbk.id,kategori,jenis_kategori from kategori ktg join sub_kategori sbk on ktg.id = sbk.id_kategori where ktg.id = ?', [req.params.id], function (err,rows,field){
        res.render(__dirname+'/views/global/homesubkategori',{x:rows , dataheader: req.session.username, role : req.session.role,iduser : req.session.id})
    })
})

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/produk/:id', function(req,res){
    conn.query('select pr.id,tanggal_masuk_produk,kategori,jenis_kategori,nama_produk,deskripsi,harga,gambar from kategori ktg join sub_kategori sbk on ktg.id = sbk.id_kategori join produk pr on sbk.id = pr.id_sub_kategori where sbk.id = ?',[req.params.id], function(err,rows5,field){
        res.render(__dirname+'/views/global/produk',{data:rows5 , dataheader: req.session.username, role : req.session.role,iduser : req.session.id})
        console.log(rows5)
    })
})

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/detail/:id', function(req,res){
    conn.query('select pr.id,kategori,jenis_kategori,nama_produk,deskripsi,warna,ukuran,stok,harga from kategori ktg join sub_kategori sbk on ktg.id = sbk.id_kategori join produk pr on sbk.id = pr.id_sub_kategori join produk_warna pw on pr.id = pw.id_produk join produk_size ps on pw.id = ps.id_produk_warna where pr.id = ?' , [req.params.id] , function(err,rows6,field){        
        conn.query('select * from produk_warna where id_produk = ?', [req.params.id], (err, val2) => {
            // res.json(req.query)
            if (req.query.warnaid === undefined)
                res.render(__dirname+'/views/global/detailproduk',{detailproduk: rows6, warna: val2,dataheader: req.session.username, role : req.session.role, iduser : req.session.id})
            else
                conn.query('select * from produk_size where id_produk_warna = ?', [req.query.warnaid], (err, val3) => {
                    res.render(__dirname+'/views/global/detailproduk',{detailproduk: rows6, warna: val2, size: val3 ,dataheader: req.session.username , role : req.session.role , iduser : req.session.id})                    
                })
        })

    })
})



//Input Dasboar Admin
//Input Kategori(Season)
app.get('/homeadmin', function(req,res){
    if ( req.session.role !== 0 ) 
    {
        res.redirect('/home')
    }
    else
    {
    conn.query("select * from kategori",function(err,rows,field){
        conn.query(' select sub_kategori.id,kategori,jenis_kategori from kategori INNER JOIN sub_kategori ON sub_kategori.id_kategori = kategori.id', function(err,rows2,field){  
            conn.query('select pr.id,tanggal_masuk_produk,kategori,jenis_kategori,nama_produk,deskripsi,harga from kategori ktg join sub_kategori sbk on ktg.id = sbk.id_kategori join produk pr on sbk.id = pr.id_sub_kategori order by kategori', function(err,rows3,field){
                conn.query('select pw.id,nama_produk,warna,harga from produk pr join produk_warna pw on pr.id = pw.id_produk order by nama_produk', function(err,rows4,field){
                    conn.query('select kategori,ps.id,jenis_kategori,nama_produk,deskripsi,warna,ukuran,stok from kategori ktg join sub_kategori sbk on ktg.id = sbk.id_kategori join produk pr on sbk.id = pr.id_sub_kategori join produk_warna pw on pr.id = pw.id_produk join produk_size ps on pw.id = ps.id_produk_warna',function(err,rows5,field){
                        conn.query('select kode_invoice,nama_penerima from invoice_data', function (err,rows7){
                        res.render(__dirname+'/views/admindashboard',{data: rows2, x: rows, produk: rows3,warna: rows4, ukuran: rows5, dataheader: req.session.username, histori: rows7 ,   role : req.session.role , iduser : req.session.id})
                        })
                    })
                })    
            })
        })
    })
    }
})


//simpan kategori
app.post('/simpankategori', url ,function(req, res){
    conn.query("insert into kategori set ?", 
    {
        kategori : req.body.kategori,
    })
    res.redirect('/homeadmin')
})

//hapus kategori
app.get('/hapus/:id',url,function (req,res){
    conn.query('delete from kategori where ?', {
        id:req.params.id
    })
    res.redirect('/homeadmin')
})

// Edit Kategori

app.get('/editkategori/:id', function (req,res) {
    conn.query('select * from kategori where id = ?' , [req.params.id] , function (err,val1,) {
        res.render(__dirname+'/views/crud/edit/editkategori',{kategori :val1 , id : req.params.id,dataheader: req.session.username , role : req.session.role})
    })
})

app.post('/updatekategori/:id', url , function (req,res) {
    conn.query("update kategori set ? where ?" , 
    [
        {
            kategori : req.body.namakategori
        },
        {
            id : req.params.id
        }
    ])
    res.redirect('/homeadmin')
})
//=============================================================================//
//Input Sub Kategori
app.post('/simpansubkategori', url, function (req,res) {
    conn.query('insert into sub_kategori set ? ', 
    {
        jenis_kategori : req.body.jenis_kategori,
        id_kategori : req.body.kategori
    })
    res.redirect('/homeadmin')
})

//menghapus Sub Kategori
app.get('/hapussubproduk/:id',url,function (req,res) {
    conn.query('delete from sub_kategori where ?' , {
        id : req.params.id
    })
    res.redirect('/homeadmin')
})
////================= EDIT SUB KATEGORI ============================////////////////
app.get('/edit/:id', function (req,res) {
    conn.query('select * from sub_kategori where id = ?' , [req.params.id] , function (err,val1,) {
        res.render(__dirname+'/views/crud/edit/editsubkategori',{subkategori :val1 , id : req.params.id,dataheader: req.session.username , role : req.session.role})
    })
})

app.post('/updatesubkategori/:id', url , function (req,res) {
    conn.query("update sub_kategori set ? where ?" , 
    [
        {
            jenis_kategori : req.body.editsubkategori
        },
        {
            id : req.params.id
        }
    ])
    res.redirect('/homeadmin')
})

//================================================================================//
//Input Produk
app.post('/simpanproduk', url , function (req,res) {
    var file = req.files.uploaded_image;
    var namaFile = uniqid() + '.' +  req.files.uploaded_image.mimetype.split('/')[1];
    console.log(namaFile)

    file.mv(__dirname+'/images/' + namaFile, function (err) {
        conn.query('insert into produk set ? ' , {
            id_sub_kategori : req.body.sub_kategori,
            nama_produk : req.body.nama_produk,
            deskripsi : req.body.deskripsi,
            harga : req.body.harga,
            gambar : namaFile
        })
    }) 
    res.redirect('/homeadmin')
})

//===============================================================================//
//EDIT PRODUK
app.get('/updateproduk/:id',function (req,res) {
    conn.query('select * from produk where produk.id = ?', [req.params.id], function(err,rows,field) {
        res.render(__dirname+'/views/crud/edit/editproduk',{produk :rows , id : req.params.id,dataheader: req.session.username , role : req.session.role})
        console.log(rows)
    })
})
app.post('/updateproduk/:id', url, function (req,res){    
    var file = req.files.uploaded_image;
    var namaFile = uniqid() + '.' +  req.files.uploaded_image.mimetype.split('/')[1];
    console.log(namaFile)

    file.mv(__dirname+'/images/' + namaFile, function (err) {
    conn.query("update produk set ? where ?" ,
    [
        {
            nama_produk : req.body.namaproduk,
            deskripsi : req.body.deskripsiproduk,
            harga : req.body.hargaproduk,
            gambar : namaFile
        },
        {
            id : req.params.id
        }
    ])
    })
    res.redirect('/homeadmin')
})

//================================================================================//
//Input Warna
app.post('/simpanwarna',url,function (req,res) {
    conn.query('insert into produk_warna set ?' ,{
        id_produk : req.body.warnaid,
        warna : req.body.warna
    })
    res.redirect('/homeadmin')
})
//Edit Warna
app.get('/updatewarna/:id',function (req,res) {
    conn.query('select * from produk_warna where id = ? ', [req.params.id], function(err,rows,field) {
        res.render(__dirname+'/views/crud/edit/editwarna', {warna:rows , id : req.params.id, dataheader : req.session.username , role : req.session.role})    
    })
})
app.post('/editwarna/:id', url , function (req,res) {
    conn.query("update produk_warna set ? where ?" , 
    [
        {
            warna : req.body.namawarna
        },
        {
            id : req.params.id
        }
    ])
    res.redirect('/homeadmin')
})

//================================================================================//
//Input Ukuran dan Stok
app.post('/simpanukuran',url,function (req,res) {
    conn.query('insert into produk_size set ?' ,{
        id_produk_warna : req.body.warnaid,
        ukuran : req.body.ukuran,
        stok : req.body.jumlah_produk
    })
    res.redirect('/homeadmin')
})

//update stok dan size
app.get('/updatestok/:id', function (req,res) {
    conn.query('select * from produk_size where id = ? ' ,[req.params.id] ,function(err,rows,field) {
        res.render(__dirname +'/views/crud/edit/editstok' , {stok : rows , id : req.params.id, dataheader : req.session.username ,role : req.session.role})
    })
})
app.post('/editstok/:id', url,function (req,res) {
    conn.query("update produk_size set ? where ?" , 
    [
        {
            ukuran : req.body.ukuran ,
            stok : parseInt(req.body.stoksekarang) + parseInt(req.body.stoktambah)
        },
        {
            id : req.params.id
        }
    ])
    res.redirect('/homeadmin')
})
/////////////////////////////////////////////////////////////////////////////////////
///////////////////CART

app.post('/cart', url , function (req,res){
                conn.query('insert into cart set ?', {
                id_user : req.session.userid,
                id_produk_size : req.body.idproduk,
                price : req.body.harga,
                qty : req.body.jumlahbeli,
            })
        res.redirect('/cart')
    })
    
app.get('/cart', function (req,res) {
    if ( req.session.username == null)
    {
        res.redirect('/login')
    }
    else
    {
    conn.query('select cr.id,nama,nama_produk,ukuran,warna,stok,qty,harga,alamat,email, (harga * qty) as total_harga  from produk pr JOIN produk_warna pw ON pr.id = pw.id_produk join produk_size ps ON pw.id = ps.id_produk_warna join cart cr ON ps.id = cr.id_produk_size  join user us ON us.id = cr.id_user where ? ', {id_user : req.session.userid}  , function (err,rows){
        res.render(__dirname+'/views/cart' , {keranjang : rows , dataheader : req.session.username,role : req.session.role , iduser : req.session.id})
            console.log(rows)
    })
    }
})


////////////////////HAPUS
app.get('/carthapus/:id', url , function(req,res) {
    conn.query(' delete from cart where ?' , {
        id : req.params.id
    })
    res.redirect('/cart')
})
///edit
app.post('/editcart/:id' , url, function(req,res){
    conn.query(' update cart set ? where ? ' ,
    [
        {  
        qty  : req.body.kuantitas
        },
        {
        id : req.params.id
        }
    ])
    res.redirect('/cart')
})


/////// Tambah Invoice 
////////////////////////////////////////////////////////////////////////

app.post('/tambahinvoice' , url , function(req,res){

   const kode_invoice = "INV"+ req.session.userid + (new Date).getMonth() + (new Date).getHours() + (new Date).getSeconds();
        

    conn.query('select cr.id,nama,id_produk_size,nama_produk,ukuran,warna,stok,qty,harga,alamat,email, (harga * qty) as total_harga  from produk pr JOIN produk_warna pw ON pr.id = pw.id_produk join produk_size ps ON pw.id = ps.id_produk_warna join cart cr ON ps.id = cr.id_produk_size  join user us ON us.id = cr.id_user', function(err,cartval){
        conn.query('insert into invoice_data set ? ' , {
            id_user : req.session.userid,
            kode_invoice : kode_invoice,
            total_harga : req.body.grandtotal,
            nama_penerima : req.body.namapenerima,
            alamat_penerima : req.body.alamatpenerima,
            telp : req.body.nomorhp,
            tanggal : new Date
            })

        cartval.forEach(x => {
                conn.query('insert into invoice_detail set ? ' , {
                    kode_invoice : kode_invoice,
                    nama_produk : x.nama_produk,
                    harga : x.harga,
                    warna : x.warna,
                    ukuran : x.ukuran,
                    qty : x.qty
                })

            conn.query('select stok from produk_size where ? ' ,
             {
                 id : x.id_produk_size
             },
             function (err,detailinv) 
             {
            console.log(detailinv)
                 
                conn.query('update produk_size set ? where ? ' , 
            [
                {
                    stok : detailinv[0].stok - x.qty
                },
                {
                    id : x.id_produk_size
                }    
            ])

            })    

        });
            conn.query('delete from cart where ? ',
            {
                id_user : req.session.userid
            })

        })
    res.redirect('/invoicedetail/'+ kode_invoice)
})

app.get('/invoicedetail/:id' , function(req,res){
    conn.query(' select * from invoice_data where ? ' ,
    {
        kode_invoice : req.params.id
    },
    function(err,row1)
    {
        conn.query('select * from invoice_detail where ?',
        {
            kode_invoice : req.params.id
        },
        function(err,row2)
        {
            res.render(__dirname+'/views/invoicedetail', {data1 : row1 , data2 : row2 , dataheader : req.session.username,role : req.session.role})
        })
    
    })
})


app.get('/historyinvoice/:id' , function (req, res){
    conn.query(' select * from invoice_data where id_user  = ? ', [req.params.id] , function ( err, val4) {
        res.render(__dirname+'/views/history_user' , { historiinvoice : val4 , dataheader : req. session.username , role : req.session.userid})
    })
} )


//Connection Run
app.listen(3030, console.log('server run'));