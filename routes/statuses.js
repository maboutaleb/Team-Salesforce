const express = require('express');
const router = express.Router();
const Status = require('../models/Status');

router.post('/', async (req,res)=>{
    const status = new Status({
        status: req.body.status
    });
    try{
        const savedStatus = await status.save();
        res.json(savedStatus);
    }catch (err){
        res.json({message: err});
    }
});


// get status
router.get('/', async (req, res)=>{
    try{
        const status = await Status.find();
        res.send(status)
    } catch (err){
        res.json({message: err});
    }
});

//Patch/change statuse

router.patch('/:statusId', async (req, res)=>{
    try{
        const updatedStatus = await Status.findOneAndUpdate(
            {_id: req.params.statusId},
            {$set: {status: req.body.status}},
            {new: true}
        );
        res.send(updatedStatus)
    } catch (err){
        res.json({mseeage: err});
    }
});// stuck on sending request on PostMan, noththing returned but actually changed the status of the document
module.exports = router;