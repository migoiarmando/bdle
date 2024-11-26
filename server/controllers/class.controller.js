import get from "lodash/get.js";
import Class from "../models/class.model.js";

export const addClass = async (req, res, next) => {
  try {
    const professorId = get(req, "user._id");
    const {
      classCode,
      className,
      section,
      scheduleDay,
      scheduleStart,
      scheduleEnd,
      theme,
    } = req.body;

    if (
      !classCode ||
      !className ||
      !section ||
      !scheduleDay ||
      !scheduleStart ||
      !scheduleEnd ||
      !theme
    )
      return res.status(400).json({ message: "Fill all required fields." });

    const existingClassCode = await Class.findOne({ classCode });
    if (existingClassCode)
      return res
        .status(400)
        .json({ message: "Given class code already exist." });

    const newClass = await Class({
      classCode,
      className,
      section,
      professorId,
      scheduleDay,
      scheduleStart,
      scheduleEnd,
      theme,
    });

    if (!newClass)
      return res.status(400).json({ message: "Creating new class failed." });

    await newClass.save();

    res
      .status(200)
      .json({ message: "Class is successfully added.", class: newClass });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Add class error occured." });
  }
};

export const fetchClasses = async (req, res, next) => {
  try {
    const { professorId } = req.params;
    const classes = await Class.find({ professorId });
    res.status(200).json(classes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Fetch classes error occured." });
  }
};

export const fetchClassById = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const existingClass = await Class.findById(classId);
    if (!existingClass)
      return res.status(404).json({ message: "Class not found." });

    res.status(200).json(existingClass);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Fetch classes error occured." });
  }
};
