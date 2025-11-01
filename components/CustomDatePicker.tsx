"use client";

import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";

interface CustomDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  minDate?: Date;
  className?: string;
  error?: string;
}

const CustomDatePicker = forwardRef<HTMLDivElement, CustomDatePickerProps>(
  ({ value, onChange, minDate, className = "", error }, ref) => {
    const selectedDate = value ? new Date(value) : null;

    const handleDateChange = (date: Date | null) => {
      if (date) {
        const formattedDate = date.toISOString().split("T")[0];
        onChange(formattedDate);
      }
    };

    return (
      <div ref={ref} className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={minDate || new Date()}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date"
          className={`w-full bg-dark-navy/50 border-3 ${
            error ? "border-red-500" : "border-primary-red/30"
          } rounded-lg px-6 py-4 text-white font-display italic uppercase font-bold text-lg focus:border-primary-red focus:outline-none transition-all duration-300 hover:border-primary-red/50 ${className}`}
          calendarClassName="custom-calendar"
          wrapperClassName="w-full"
          popperClassName="custom-calendar-popper"
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1 ml-2"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

CustomDatePicker.displayName = "CustomDatePicker";

export default CustomDatePicker;
