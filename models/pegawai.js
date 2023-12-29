const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PegawaiSchema = new Schema({
    namaPegawai: {
        type: String,
        required: true
    },
    nip: {
        type: String,
        required: true
    },
    divisi: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    durasiKerja: {
        type: String,
        required: true
    },
    gaji: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('pegawai', PegawaiSchema);