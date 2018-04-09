import React from 'react';
import './ListProduk.css';

import { listSubKategori, listProdukSubKategori, listProduk } from '../../function';
import Produk from '../../components/produk/Produk';

class ListProduk extends React.Component {
    state = {
        listSubKategori: [],
        listProduk: [],
        selected: null
    }

    listProduk(idSubKategori) {
        if (idSubKategori) {
            listProdukSubKategori(idSubKategori).then(produk => {
                let listProduk = produk.data.map((el, index) =>
                    <Produk
                        key={el.id}
                        imgUrl={el.gambar}
                        namaProduk={el.nama_produk}
                    />
                )
                this.setState({ listProduk })
            })
        } else {
            listProduk().then(produk => {
                let listProduk = produk.data.map((el, index) =>
                    <Produk
                        key={el.id}
                        imgUrl={el.gambar}
                        namaProduk={el.nama_produk}
                    />
                )
                this.setState({ listProduk })
            })
        }
    }

    componentWillMount() {
        listSubKategori(this.props.idSeason).then(subKategori => {
            let listSubKategori = subKategori.data.map(el =>
                // <li key={el.id}><Link to={`${this.props.url}/subkategori/${el.id}`}>{el.jenis_kategori}</Link></li>
                <li key={el.id}><button onClick={() => this.setState({selected: el.id})}>{el.jenis_kategori}</button></li>
            )
            this.setState({ listSubKategori })
        })
        // this.listProduk(this.state.selected)        
    }

    shouldComponentUpdate(prevProps, prevState) {
        this.listProduk(this.state.selected)
        return prevState.listProduk !== this.state.listProduk;
    }

    render() {
        return (
            <div id="list-produk">
            <li>
                <ul>{this.state.listSubKategori}</ul>
            </li>    
                <div>
                    {this.state.listProduk}
                </div>
            </div>
        )
    }
}

export default ListProduk;