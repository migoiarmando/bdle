import { useEffect, useState } from "react";

const useRealtimeClock = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12; // Convert to 12-hour format
      const _time = `${hours}:${minutes} ${ampm}`;
      setTime(_time);
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

  return { date, time };
};

export default useRealtimeClock;
