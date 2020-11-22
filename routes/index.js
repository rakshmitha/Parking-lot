const router = require('express').Router();

const Slot = require("../models");

router.get('/',(req,res) => {
    res.send('api');
});

//To park a car
router.get("/park", (req, res) => 
{
    const car_no = req.query.car_no;
    Slot.findOneAndUpdate({car_no: -1}, {car_no}, (err, freeSlot) => {
        if (err)
            res.send("Sorry for the incovenience. Please reload after some time!!");
        else if (freeSlot)
            res.send(`Car with Number ${car_no} is parked in Slot ${freeSlot.slot_no}`);
        else
            res.send("All slots are parked. Sorry")
    })
});

//To unpark a car
router.get("/unpark", (req, res) => 
{
    const slot_no = req.query.slot_no;
    Slot.findOne({slot_no}, (err, slotToUnpark) => {
        if (err)
            res.send("Sorry for the incovenience. Please reload after some time!!");
        else if (slotToUnpark)
        {
            if (slotToUnpark.car_no == -1)
                res.send(`There is no Car in Slot ${slotToUnpark.slot_no} to unpark`);
            else
            {
                Slot.updateOne({slot_no}, {car_no: -1}, (err, unparkedSlot) => {
                    if (err)
                        res.send("Sorry for the incovenience. Please reload after some time!!");
                    else
                        res.send(`Car with Number ${slotToUnpark.car_no} is unparked from Slot ${slotToUnpark.slot_no}`);
                })
            }
        }
        else
            res.send("Sorry slot is not found.");
    });
});

//To know in which slot the car is parked or vice versa
router.get("/info", (req, res) => 
{
    if (req.query.car_no && req.query.slot_no)
    {
        res.status(400).send('Bad Request');
    }
    else if (req.query.car_no)
    {
        const car_no = req.query.car_no;
        Slot.findOne({car_no}, (err, slot) => {
            if (slot == null)
                res.send("Car is not found");
            else if (err)
                res.send(err);
            else
            {
                res.send(`Car with No: ${car_no} is parked in ${slot.slot_no}`);
            }
        });
    }
    else if (req.query.slot_no)
    {
        const slot_no = req.query.slot_no;
        Slot.findOne({slot_no}, (err, slot) => {
            if (slot == null)
                res.send(`No slot is found with Slot No: ${slot_no}`);
            else if (err)
                res.send("Sorry for the incovenience. Please reload after some time!!");
            else
            {
                res.send(`Car with  No: ${slot.car_no} is parked in ${slot_no}`);
            }
        });
    }
});

module.exports = router;