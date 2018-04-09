import React, {Component} from 'react'  ;
import './Headers.css' ;
import {Link, Route} from 'react-router-dom';


class Headers extends Component {
    render() {
        return (
        <div className="tinggi">
          <nav className="navbar navbar-default navbar-fixed-top warna">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Menus</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                  <a className="navbar-brand" href="#">ShopieMana.co.id</a>
              </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li><Link to= "/Home">Home</Link></li>
                    <li><Link to = "/TentangKami">Tentang Kami</Link></li>
                    <li><Link to = "/labor"><i class="fa fa-flask"></i>&nbsp;Aksesoris</Link></li>
                    <li><Link to = "/kalibrasi"><i class="fa fa-thermometer-three-quarters"></i>&nbsp;Season</Link></li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Season<span className="caret"></span></a>
                        <ul className="dropdown-menu">
                          <li><Link to="/#">Winter</Link></li>
                          <li><Link to="/#">Fall</Link></li>
                          <li><Link to="/#">Summer</Link></li>
                        </ul>
                    </li>
                  </ul>
                    <ul className="nav navbar-nav navbar-right">
                      <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown"><b><i class="fa fa-sign-in">&nbsp;</i>MASUK</b> <span className="caret"></span></a>
                        <ul id="login-dp" className="dropdown-menu">
                          <li>
                            <div className="row">
                              <div className="col-md-12">
                                Login via
                                <div className="social-buttons">
                                  <a href="#" className="btn btn-fb"><i className="fa fa-facebook"></i> Facebook</a>
                                  <a href="#" className="btn btn-danger"><i className="fa fa-envelope "></i> Email</a>
                                </div>
                                Or
                              <form className="form" role="form" method="post" action="login" accept-charset="UTF-8" id="login-nav">
                                <div className="form-group">
                                  <label className="sr-only" for="exampleInputEmail2">Email address</label>
                                  <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Email address" required/>
                                </div>
                                <div className="form-group">
                                  <label className="sr-only" for="exampleInputPassword2">Password</label>
                                  <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" required/>
                                    <div className="help-block text-right"><a href="">Lupa Password ?</a></div>
                                </div>
                                  <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block">Masuk</button>
                                  </div>
                                    <div className="checkbox">
                                      <label>
                                        <input type="checkbox"/> Jangan tanyakan lagi
                                      </label>
                                    </div>
                              </form>
                              </div>
                                <div className="bottom text-center">
                                  Belum Punya Akun ? <Link to='/daftar'><b>Daftar Sekarang</b></Link>
                                </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>


        )
    }

}

export default Headers
