const express = require('express');
const router = express.Router();
const Seat = require('../models/Seat');

router.post('/', async (req,res)=>{
    const seat = new Seat({
        seat_number : req.body.seat_number,
        capacity : req.body.capacity,
        section : req.body.section
    });
    try{
        const savedSeat = await seat.save();
        res.json(savedSeat);
    }catch (err){
        res.json({message: err});
    }
});
module.exports = router;