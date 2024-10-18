const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const Student = require('../models/Student');

// Route for students to join a class
router.post('/join-class', async (req, res) => {
  const { studentId, classCode } = req.body;

  try {
    // Find the class by class code
    const classToJoin = await Class.findOne({ classCode });
    if (!classToJoin) {
      return res.status(404).json({ error: 'Class not found' });
    }

    // Find the student by ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if the student is already enrolled in the class
    if (student.classes.includes(classToJoin._id)) {
      return res.status(400).json({ error: 'Student already enrolled in this class' });
    }

    // Add the class to the student's list of classes
    student.classes.push(classToJoin._id);
    await student.save();

    res.status(200).json({ message: 'Successfully joined the class' });
  } catch (error) {
    res.status(500).json({ error: 'Error joining class' });
  }
});

module.exports = router;
