export const convertTo12HourFormat = (time: string | null) => {
  if (!time) return "00:00 AM";
  const [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const adjustedHour = hour % 12 || 12;
  return `${adjustedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};
