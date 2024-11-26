import get from "lodash/get.js";
import Attendance from "../models/attendance.model.js";
import StudentAttendance from "../models/student-attendance.model.js";

export const addStudentAttendance = async (req, res, next) => {
  try {
    const userId = get(req, "user._id");
    const { classId } = req.params;
    const { attendanceCode, studentIGN, answerOfTheDay } = req.body;

    if (!attendanceCode || !answerOfTheDay)
      return res.status(400).json({ message: "Fill all required fields." });

    const existingAttendanceCode = await Attendance.findOne({ attendanceCode });
    if (!existingAttendanceCode)
      return res
        .status(404)
        .json({ message: "Given attendance code does not exist." });

    const existingAttendanceOnUser = await StudentAttendance.findOne({
      userId,
      attendanceId: existingAttendanceCode._id,
    });
    if (existingAttendanceOnUser)
      return res.status(404).json({ message: "You're already in attendance." });

    const newStudentAttendance = await StudentAttendance({
      userId,
      classId,
      attendanceId: existingAttendanceCode._id,
      attendanceCode,
      studentIGN,
      answerOfTheDay,
    });

    if (!newStudentAttendance)
      return res
        .status(400)
        .json({ message: "Creating new attendance failed." });

    const savedStudentAttendance = await newStudentAttendance.save();

    const studentAttendance = await StudentAttendance.findById(
      savedStudentAttendance._id
    ).populate("userId");

    res.status(200).json({
      message: "Student attendance is successfully added.",
      studentAttendance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Add student attendance error occured." });
  }
};

export const fetchStudentAttendancesByAttendanceId = async (req, res, next) => {
  try {
    const { attendanceId } = req.params;

    const studentAttendances = await StudentAttendance.find({
      attendanceId,
    }).populate("userId");

    res.status(200).json(studentAttendances);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Fetch student attendances error occured." });
  }
};

export const fetchStudentAttendanceByAttendanceId = async (req, res, next) => {
  try {
    const userId = get(req, "user._id");
    const { attendanceId } = req.params;
    const existingStudentAttendance = await StudentAttendance.findOne({
      userId,
      attendanceId,
    });
    res.status(200).json(existingStudentAttendance);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Fetch student attendance by AttendanceId and StudentId error occured.",
    });
  }
};

export const fetchStudentAttendancesByClassId = async (req, res, next) => {
  try {
    const userId = get(req, "user._id");
    const { classId } = req.params;
    const studentAttendances = await StudentAttendance.find({
      userId,
      classId,
    }).populate("attendanceId");

    let attendances = [];
    studentAttendances.forEach((element) => {
      attendances.push(element.attendanceId);
    });

    res.status(200).json(attendances);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Fetch student attendance by AttendanceId and StudentId error occured.",
    });
  }
};
