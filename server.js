const express = require("express");
const app = express();
app.use(express.json());
const dotenv = require('dotenv')
const router = require("./routes/attendanceRoute")
const connectDB = require('./config/config')

connectDB();

dotenv.config();
app.use('/api/attendance', router);

app.listen(3000,()=>{
    console.log("listening to port 3000");
    console.log(process.env.UNAME);
})