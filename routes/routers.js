//  Routers

const express = require('express');
const router = express.Router();

query = {
	community: 'community-deals',
	limit: 100
}

router.get('/', (req, res) => {
    res.render('../views/index.ejs', {
    });
});

router.get('/@', (req, res) => {

    let nombre = req.query.u || '';
    let saludo = '';

    if (nombre != '')
        saludo = nombre;

    res.render('../views/@.ejs' , {
        test: saludo
    });
});

router.get('/witnesses', (req, res) => {
    res.render('../views/witnesses.ejs', {
    });
});

module.exports = router;
