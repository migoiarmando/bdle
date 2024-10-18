const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

// Ma generate ning class code
function generateClassCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Then iroroute para maka add new class
router.post('/add-class', async (req, res) => {
  const { name, day, startTime, endTime, teacherId } = req.body;

  try {
    const classCode = generateClassCode();
    const newClass = new Class({
      name,
      day,
      startTime,
      endTime,
      classCode,
      teacherId
    });

    await newClass.save();
    res.status(201).json({ message: 'Class added successfully', classCode });
  } catch (error) {
    res.status(500).json({ error: 'Error adding class' });
  }
});

module.exports = router;
