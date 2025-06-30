import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import { fr } from "date-fns/locale";

const ReadOnlyInput = React.forwardRef(({ value, onClick }, ref) => (
  <input
    value={value}
    onClick={onClick}
    ref={ref}
    readOnly // ✅ EMPÊCHE clavier, mais PAS le click
    className="time-input" // 👈 tu peux styliser ici
  />
));


export default function TimeOnlyPicker({ updateAvailability, day, id, field, hour = 12, minute = 0, slot }) {
  const initialDate = new Date();
  initialDate.setHours(hour);
  initialDate.setMinutes(minute);
  initialDate.setSeconds(0);
  initialDate.setMilliseconds(0);

  const [selectedTime, setSelectedTime] = useState(initialDate);

  const pad = (n) => n.toString().padStart(2, "0");

  return (
    <DatePicker
      selected={selectedTime}
      onChange={(date) => {
        setSelectedTime(date);

        const formattedTime = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

        updateAvailability(day, id, field, formattedTime);
      }}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Heure"
      dateFormat="HH:mm"
      locale={fr}
      filterTime={(time) => {
        const [refHour, refMinute] = slot.split(":").map(Number);
        const refDate = new Date();
        refDate.setHours(refHour);
        refDate.setMinutes(refMinute);
        refDate.setSeconds(0);
        refDate.setMilliseconds(0);

        // field === "to" => on veut que TO soit STRICTEMENT après FROM
        if (field === "to") {
          return time.getTime() > refDate.getTime();
        }

        // field === "from" => on veut que FROM soit STRICTEMENT avant TO
        return time.getTime() < refDate.getTime();
      }}
      customInput={<ReadOnlyInput />}
    />
  );
}

