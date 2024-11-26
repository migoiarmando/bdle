import useGetDayAndDate from "../hooks/useGetDayAndDate";

const DateCard = ({ date }: { date: Date }) => {
  const { dayOfWeek, dateNumber } = useGetDayAndDate({ date });
  return (
    <div className="specific-date-container">
      <div className="date-week">{dayOfWeek}</div>
      <div className="date-day">{dateNumber}</div>
    </div>
  );
};

export default DateCard;
