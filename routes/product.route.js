const express = require('express');
const router = express.Router();


// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);
module.exports = router;

// create 
router.post('/create', product_controller.product_create);
// check login
router.post('/login', product_controller.product_login);
//read ALL product
router.get('/read', product_controller.product_all);
//read by id
router.get('/:id/read', product_controller.product_details);
//update by id
router.put('/:id/update', product_controller.product_update);
//supprimer toute la table
router.delete('/delete', product_controller.product_delete);


