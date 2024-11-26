import get from "lodash/get.js";
import Attendance from "../models/attendance.model.js";

export const addAttendance = async (req, res, next) => {
  try {
    const professor = get(req, "user");
    const { classId } = req.params;
    const { attendanceCode, questionOfTheDay } = req.body;

    if (!attendanceCode || !questionOfTheDay)
      return res.status(400).json({ message: "Fill all required fields." });

    const existingAttendanceCode = await Attendance.findOne({ attendanceCode });
    if (existingAttendanceCode)
      return res
        .status(400)
        .json({ message: "Given attendance code already exist." });

    const newAttendance = await Attendance({
      classId,
      professorId: professor._id,
      professor: professor.username,
      attendanceCode,
      questionOfTheDay,
    });

    if (!newAttendance)
      return res
        .status(400)
        .json({ message: "Creating new attendance failed." });

    await newAttendance.save();

    res.status(200).json({
      message: "Attendance is successfully added.",
      attendance: newAttendance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Add attendance error occured." });
  }
};

export const fetchLatestAttendance = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const latestAttendance = await Attendance.findOne({ classId }).sort("-_id");
    if (!latestAttendance)
      return res.status(404).json({ message: "No attendance found" });

    res.status(200).json(latestAttendance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Fetch latest attendance error occured." });
  }
};

export const fetchAttendancesById = async (req, res, next) => {
  try {
    const { attendanceId } = req.params;
    const attendance = await Attendance.findById(attendanceId).populate(
      "classId"
    );
    if (!attendance)
      return res.status(404).json({ message: "Attendance not found." });

    res.status(200).json(attendance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Fetch latest attendance error occured." });
  }
};

export const fetchAttendancesByClassId = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const attendances = await Attendance.find({ classId }).sort("-_id");

    res.status(200).json(attendances);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Fetch attendances by class id error occured." });
  }
};
