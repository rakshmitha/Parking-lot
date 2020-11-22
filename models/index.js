const mongoose = require("mongoose");

const slot_schema = new mongoose.Schema({
    car_no: Number,
    slot_no: Number 
});

const Slot = mongoose.model("Slot", slot_schema);

Slot.bulkWrite([
    {
        deleteMany: {
            filter: {}
        }
    }
]).then(res => console.log(`${res.deletedCount} previous Slots are removed`))

var writeOpsArray = []

for (let i=0; i < process.env.SLOTS; i++)
{
    writeOpsArray[i] =  {
                            insertOne: {
                                document: {
                                    car_no: -1,
                                    slot_no: (i+1)
                                }
                            }
                        }
}

Slot.bulkWrite(writeOpsArray).then(res => console.log(`${res.insertedCount} Slots are created`));

module.exports = Slot;