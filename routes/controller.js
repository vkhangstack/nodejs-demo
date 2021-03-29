const e = require('express');
let express = require('express');
let router = express.Router();
let Product = require('./../db/model/product');

//home page
router.get('/', (req, res) => {
    Product.find({})
        .then(products => {
            res.render('home', { products: products })
        })
        .catch(err => {
            console.log('Error', err);
            throw err;
        })
});
// Add new product
router.get('/add-product', (req, res) => {
        res.render('add-product');
    })
    //Add new product
router.post('/', (req, res) => {
    let newProduct = new Product({
        name: req.body.productName,
        type: req.body.productType
    });
    newProduct.save()
        .then(doc => {
            res.redirect('/');
        })
        .catch(err => {
            console.log('Error', err);
            throw err;
        })
});

//go to update product pager
router.get('/update-product/:productId', (req, res) => {
    Product.findById(req.params.productId, (err, product) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.render('update-product', { product: product });
    })
});

//delete product
router.delete('/:productId', (req, res) => {
    let productId = req.params.productId;
    Product.findByIdAndDelete(productId, (err, doc) => {
        if (err) throw err;
        res.send(doc)
    })
});

//Update product
router.post('/:productId', (req, res) => {
    let productId = req.params.productId;
    Product.findByIdAndUpdate({ _id: productId }, { $set: { name: req.body.productName, type: req.body.productType } }, { useFindAndModify: false })
        .then(doc => {
            res.redirect('/')
        })
});


module.exports = router;