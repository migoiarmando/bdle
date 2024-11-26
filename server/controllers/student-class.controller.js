import get from "lodash/get.js";
import Class from "../models/class.model.js";
import StudentClass from "../models/student-class.model.js";

export const addStudentClass = async (req, res, next) => {
  try {
    const userId = get(req, "user._id");
    const { classCode } = req.body;

    if (!classCode)
      return res.status(400).json({ message: "Fill all required fields." });

    const existingClassCode = await Class.findOne({ classCode });
    if (!existingClassCode)
      return res.status(404).json({ message: "Given class code not found." });

    const classId = existingClassCode._id;
    const existingStudent = await StudentClass.findOne({ userId });
    if (existingStudent) {
      if (!existingStudent.classes.includes(classId)) {
        existingStudent.classes.push(classId);
        const savedStudent = await existingStudent.save();
        const studentClass = await StudentClass.findById(
          savedStudent._id
        ).populate("classes");

        return res.status(200).json({
          message: "Class added successfully.",
          studentClass,
        });
      } else {
        return res.status(400).json({
          message: "Class already exists for this student.",
        });
      }
    }

    const newStudent = new StudentClass({
      userId,
      classes: [classId],
    });
    const savedStudent = await newStudent.save();

    const studentClass = await StudentClass.findById(savedStudent._id).populate(
      "classes"
    );

    return res.status(201).json({
      message: "Student created and class added successfully.",
      studentClass,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Student class error occured." });
  }
};

export const fetchStudentClass = async (req, res, next) => {
  try {
    const userId = get(req, "user._id");

    const studentClass = await StudentClass.findOne({ userId }).populate(
      "classes"
    );
    if (!studentClass)
      return res.status(404).json({ message: "No classes at the moment." });

    res.status(200).json(studentClass);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Fetch Student class error occured." });
  }
};
