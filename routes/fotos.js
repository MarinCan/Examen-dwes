const express = require('express');
const router = express.Router();
const pool = require('../database')

/* GET home page. */
router.get('/', async function(req, res, next) {

    const [resultado_fotos] = await pool.query('SELECT * FROM fotos')
    res.render('fotos', { resultado_fotos })

});

router.get('/add', function(req, res, next) {
    res.render('add-fotos')
});

router.post('/add', async function(req, res, next) {
    // console.log(req.body)
    // res.send('ok')

    const { titulo, descripcion, url} = req.body
    const votos = 0

    await pool.query("INSERT INTO fotos SET ?", {
        titulo,
        descripcion,
        url,
        votos
    })

    res.redirect('/fotos')
    
});

router.get('/delete/:id', async function(req, res, next){
    // console.log(req.params.id)

    await pool.query("DELETE FROM fotos WHERE id = ?", req.params.id)
  
    res.redirect('/fotos')
})

router.get('/edit/:id', async function(req, res, next) {
    const id = req.params.id
    
    const [fotos] = await pool.query('SELECT * FROM fotos WHERE id = ?', [id])
    // console.log(fotos[0])
    // res.send('ok')

    res.render('edit-fotos', { resultado_fotos: fotos[0] })
});


router.post('/edit/:id', async function(req, res, next) {
    const id = req.params.id

    const { titulo, descripcion, url} = req.body
    // console.log(id)
    // console.log(titulo, descripcion, url)

    const foto_edit = {
        titulo, 
        descripcion,
        url
    }
    
    await pool.query('UPDATE fotos SET ? WHERE id = ?', [foto_edit, id])
    
    res.redirect('/fotos')
});


router.get('/like/:id', async function(req, res, next) {
    const id = req.params.id

    await pool.query('UPDATE fotos SET votos=votos+1 WHERE id = ?', [id])    

    res.redirect('/fotos')
});

router.get('/dislike/:id', async function(req, res, next) {
    const id = req.params.id
    const { titulo, descripcion, url} = req.body

    res.redirect('/fotos')
});


router.get('/comment/:id', async function(req, res, next) {
    const id = req.params.id
    res.render('comentar', {id})
});


router.post('/comment/:id', async function(req, res, next) {
    console.log(req.body)
    console.log(req.params.id)

    const { usuario, comentario} = req.body
    const foto_id = parseInt(req.params.id)

    console.log(foto_id)

    await pool.query("INSERT INTO comentarios SET ?", {
        usuario,
        comentario,
        foto_id
    })

    res.redirect('/fotos')
    
});

router.get('/show-comment/:id', async function(req, res, next) {
    const id = req.params.id
    const [comentarios] = await pool.query('SELECT * FROM comentarios WHERE foto_id = ?', [id])

    res.render('comentarios', {comentarios})
});



router.get('/masvotadas', async function(req, res, next) {
    const [resultado_fotos] = await pool.query('SELECT * FROM fotos ORDER BY votos DESC')
    res.render('fotos', { resultado_fotos })
});

router.get('/menosvotadas', async function(req, res, next) {
    const [resultado_fotos] = await pool.query('SELECT * FROM fotos ORDER BY votos')
    res.render('fotos', { resultado_fotos })
});

module.exports = router;
