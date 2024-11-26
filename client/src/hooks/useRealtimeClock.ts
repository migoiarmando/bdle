import { useEffect, useState } from "react";

const useRealtimeClock = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [militaryTime, setMilitaryTime] = useState("");

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const hours24 = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours24 >= 12 ? "PM" : "AM";

      const hours12 = hours24 % 12 || 12; // Convert to 12-hour format
      const _time = `${hours12}:${minutes} ${ampm}`;
      setTime(_time);
      setMilitaryTime(`${hours24}:${minutes}`);
    }

    setInterval(updateTime, 1000);
    updateTime(); // Initial call to display the time immediately

    const now = new Date();
    const _date = now.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDate(_date);
  }, []);

  return { date, time, militaryTime };
};

export default useRealtimeClock;
