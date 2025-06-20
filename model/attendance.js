const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    date:{
        type: String,
        required: true
    },
    lectures:{
        type:String,
        required: true
    }
},{timestamps:true})
const attendanceModel = mongoose.model("Attendance", attendanceSchema);

module.exports = attendanceModel;