const express = require('express');
const router = express.Router();
const ProductService = require('../../services/product');

const productService = new ProductService();


router.get('/', async (req, res, next) => {
    const { tags } = req.query;
    try {
        const products = await productService.getProducts({
            tags
        });
        res.status(200).json({
            data: products,
            message: 'products listed'
        })
    } catch (err) {
        next(err)
    }
});

router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await productService.getProduct({
            productId
        });
        res.status(200).json({
            data: product,
            message: 'product retrived'
        })
    } catch (err) {
        next(err)
    }
   
});

router.post('/', async (req, res, next) => {
    const { body: product } = req;
    
    try {
        const createdProduct = await productService.createProduct({
            product
        });
        res.status(201).json({
            data: createdProduct,
            message: 'product created'
        });
    } catch (err) {
        next(err)
    }
    
});

router.put('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const {body : product} = req;
    try {
        const updatedProduct = await productService.updateProduct({productId, product});

        res.status(200).json({
            data: updatedProduct,
            message: 'product updated'
        })
    } catch (err) {
        next(err)
    }
   
});

router.delete('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await productService.deleteProduct({productId});
    res.status(200).json({
        data: product,
        message: 'product deleted'
    })
    } catch (err) {
        next(err)
    }
    
});

module.exports = router;