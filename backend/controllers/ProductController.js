const ProductModel = require("../models/productModel")

//Get Product api - /api/v1/product
exports.getProducts =async (req, res, next)=>{
    const query = req.query.keyword?{ name : {
        $regex: req.query.keyword,
        $options: 'i'
    } }:{}
    const products = await ProductModel.find(query)
    res.json({
        success : true,
        products 
    })
}

//get Single Product api - /api/v1/product/:id
exports.getSingleProducts = async (req, res, next)=>{
    try {
        const products = await ProductModel.findById(req.params.id)
    res.json({
        success : true,
        products
    })
    } catch (error) {
        res.status(404).json({
        success : false,
        message : "Unable to get Product with that ID"
    })
    }
    
}