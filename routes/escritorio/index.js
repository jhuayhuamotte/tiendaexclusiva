var express = require('express');
var router  = express.Router();

/*GET Desktop Page. */
router.get('/', function(req, res, next) {
    res.render('escritorio',{ title: 'Mi Tienda Exclusiva'});
});

module.exports = router;
