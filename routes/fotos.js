const express = require('express');
const router = express.Router();
const pool = require('../database')

/* GET home page. */
router.get('/', async function(req, res, next) {
    const resultado = await pool.query('SELECT 1+1')
    console.log(resultado)
    res.send('fotos')
});

router.get('/masvotadas', async function(req, res, next) {
    res.send('mas votos')
});

router.get('/menosvotadas', async function(req, res, next) {
    res.send('menos votos')
});

module.exports = router;
