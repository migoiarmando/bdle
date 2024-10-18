function checkAttendance(submissionTime, classStartTime) {
  const diffInMinutes = (submissionTime - classStartTime) / (1000 * 60);
  if (diffInMinutes <= 15) {
    return 'Present';
  } else if (diffInMinutes <= 30) {
    return 'Late';
  } else {
    return 'Absent';
  }
}

module.exports = { checkAttendance };
