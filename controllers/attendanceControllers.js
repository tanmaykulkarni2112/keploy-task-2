const { json } = require("express");
const attendanceModel = require("../model/attendance")

const getAttendance = async (_,res)=>{
    try {
        const attendance = await attendanceModel.find().lean();
        return res.status(200).json({
            msg : attendance
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "server error"
        })
    }
}

const addAttendance = async (req,res)=>{
    try {
        const{date,lectures}= req.body;
        if(!date || !lectures) {
            return res.status(400).json({
                msg: "date or lecture not specified"
            })
        }
        const newAttendance = new attendanceModel({
            date : date,
            lectures : lectures
        }) 

        const savedNote =  await newAttendance.save();
        res.status(201).json({
            msg: "success"
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "server error"
        })
    }
}

const updateAttendance = async (req,res)=>{
    try {
        const {date,lectures} = req.body;
        const updated = await attendanceModel.findByIdAndUpdate(req.params.id, {date, lectures},{
            new : true
        });
        if(!updated) {
            return res.status(404).json({
                msg: "Could'nt update"
            })
        }
        res.status(200).json({
            msg: "Success"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg : "Could'nt update :("
        })
    }
}

const deleteAttendance = async(req,res) => {
    try {
        const deleted = await attendanceModel.findByIdAndDelete(req.params.id);
        if(!deleted) {
            return res.status(404);
        }
        res.status(200).json({
            msg : "Deleteted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error buddy"
        })
    }
} 

module.exports = {
    getAttendance,
    addAttendance,
    updateAttendance,
    deleteAttendance
}