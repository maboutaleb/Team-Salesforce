const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

//Add menu item
router.post('/', async (req,res)=>{
    const item = new Item({
        item_name: req.body.item_name,
        item_price: req.body.item_price,
        item_category: req.body.item_category,
        item_details: req.body.item_details
    });
    try{
        const savedItem = await item.save();
        res.json(savedItem);
    }catch (err){
        res.json({message: err});
    }
});

//Update menu item
router.patch('/:itemId', async (req,res) =>{
    try{
        const updatedItem = await Item.updateOne(
            {_id: req.params.itemId},
            {$set: {item_name: req.body.item_name, item_price: req.body.item_price, item_category: req.body.item_category, item_details: req.body.item_details}}
        );
        res.json(updatedItem);
    }catch (err){
        res.json({message: err});
    }
});

//Delete a menu item
router.delete('/:itemId', async (req,res)=>{
    try{
        const removedItem = await Item.deleteOne({_id: req.params.itemId});
        res.json(removedItem);
    }catch (err){
        res.json({message: err});
    }
});

//Return all menu items
router.get('/', async (req, res)=>{
    try{
        const items = await Item.find(); 
    }catch (err){
        res.json({message: err});
    }
});
// no errors returned, runs on PostMan but request never actually goes through

//Find by id
router.get('/:itemId', async (req, res)=>{
    try{
        const item = await Item.findById(req.params.itemId);
        res.json(item); 
    }catch (err){
        res.json({message: err});
    }
});

//Find by category
router.get('/category/:type', async (req, res)=>{
    try{
        const item = await Item.find({item_category: req.params.type});
        res.json(item); 
    }catch (err){
        res.json({message: err});
    }
});
module.exports = router;