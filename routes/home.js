const express = require('express');
const router = express.Router();
const Pegawai = require('../models/pegawai');

//router.get('/', (req, res, next)=>{
    //res.send('Express router is working')
//});

router.get('/', (req, res, next) => {
    Pegawai.find()
        .then(docs => {
            res.render('home', { pegawais: docs });
        })
        .catch(err => {
            console.log("Something went wrong:", err);
        });
});

router.post('/add', (req, res, next)=>{
    //const namaPegawai = req.body.namaPegawai;
    //const nip = req.body.nip;
    //const divisi = req.body.divisi;
    //const alamat = req.body.alamat;
    //const status = req.body.status;
    //const durasiKerja = req.body.durasiKerja;
    //const gaji = req.body.gaji;

    const {namaPegawai, nip, divisi, alamat, status, durasiKerja, gaji} = req.body;
    console.log(namaPegawai, nip, divisi, alamat, status, durasiKerja, gaji);

    const uclPegawai = new Pegawai({
        namaPegawai,
        nip,
        divisi,
        alamat,
        status,
        durasiKerja,
        gaji
    });
    uclPegawai.save()
    .then(() => {
        console.log("Data saved successfully");
        res.redirect('/');
    })
    .catch(err => {
        console.log("Something went wrong:", err);
    });
});


//update
router.get('/edit/:id', async (req, res, next) => {
    try {
        const pegawai = await Pegawai.findById(req.params.id);
        res.render('edit', { Pegawai: pegawai }); // Menggunakan 'Pegawai' sebagai key saat melewatkan objek pegawai
    } catch (err) {
        console.log("Can't Retrieve data and edit:", err);
    }
});

router.post('/edit/:id', async (req, res, next) => {
    try {
        const updatedPegawai = await Pegawai.findByIdAndUpdate(req.params.id, req.body);
        if (!updatedPegawai) {
            console.log("Data not found or can't be updated");
            return res.redirect('/');
        }
        console.log("Data updated successfully");
        res.redirect('/');
    } catch (err) {
        console.log("Something went wrong:", err);
        next(err); // Forward error to the next middleware or error handler
    }
});

//delete
router.get('/delete/:id', async (req, res, next) => {
    try {
        const deletedPegawai = await Pegawai.findByIdAndDelete(req.params.id);
        if (!deletedPegawai) {
            console.log("Data not found or can't be deleted");
            return res.redirect('/');
        }
        console.log("Deleted Successfully");
        res.redirect('/');
    } catch (err) {
        console.log("Something went wrong:", err);
        next(err); // Forward error to the next middleware or error handler
    }
});



module.exports = router;