const express = require("express"),
    mongoose = require("mongoose"),
    dotenv = require("dotenv"),
    //rateLimit = require("express-rate-limit");

const app = express();

//const limiter = rateLimit({
    //windowMs: 10 * 1000, // 10 s
    //max: 10 // limit each IP to 10 requests per windowMs
});
//app.use(limiter);

dotenv.config();

const PORT = process.env.PORT || 5000;
const DBURI = process.env.DBURI;

mongoose.connect(DBURI,  
{ useUnifiedTopology: true, useNewUrlParser: true},
() => console.log("MongoDB connected"));

app.use("/api", require("./routes"));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));