import Axios from 'axios';

const url = 'http://localhost:3020'

export function listProduk() {
    return Axios.get(`${url}/produk`);
}

export function listProdukSubKategori(idSubKategori) {
    return Axios.get(`${url}/produk/${idSubKategori}`);
}

export function detailProduk(idProduk) {
    return Axios.get(`${url}/detailproduk/${idProduk}`);
}

export function listSubKategori(idSeason) {
    return Axios.get(`${url}/subkategori/${idSeason}`);
}

export function listSeason() {
    return Axios.get(`${url}/season`);
}