import { useEffect, useState } from "react";

const useGetDayAndDate = ({ date }: { date: Date }) => {
  const [dayOfWeek, setDayOfWeek] = useState("Mon");
  const [dateNumber, setDateNumber] = useState(1);

  useEffect(() => {
    const _date = new Date(date);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const _dayOfWeek = daysOfWeek[_date.getDay()];
    setDayOfWeek(_dayOfWeek);

    const _dateNumber = _date.getDate();
    setDateNumber(_dateNumber);
  }, [date]);

  return { dayOfWeek, dateNumber };
};

export default useGetDayAndDate;
