import React, { useState, useEffect } from "react";

function MonthPicker() {
  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Function to get the current month name and day
  const getCurrentDate = () => {
    const date = new Date();
    const monthIndex = date.getMonth(); // Get month index (0-11)
    const day = date.getDate(); // Get current day of the month
    return { monthIndex, day };
  };

  // Function to get the previous month from the current month index
  const getPreviousMonth = (currentMonthIndex) => {
    // Calculate the previous month index
    const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
    return monthNames[previousMonthIndex];
  };

  // Function to determine which month to display
  const determineMonthToDisplay = (monthIndex, day) => {
    if (day > 10) {
      // If the day of the month is greater than 10, return the current month
      return monthNames[monthIndex];
    } else {
      // Otherwise, return the previous month
      return getPreviousMonth(monthIndex);
    }
  };

  // State to hold the month to display
  const [displayedMonth, setDisplayedMonth] = useState(() => {
    const { monthIndex, day } = getCurrentDate();
    return determineMonthToDisplay(monthIndex, day);
  });

  return (
    <div>
      <span>{displayedMonth}</span>
    </div>
  );
}

export default MonthPicker;
