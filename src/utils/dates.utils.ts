const formatDate = (dateStr: string): string | null => {
  // Try parsing the date string
  const date = new Date(dateStr);

  // Check if parsing was successful (returns Invalid Date for invalid formats)
  if (isNaN(date.getTime())) {
    return null; // Return null if parsing fails
  }

  // Extract day, month, year, hour, and minutes
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  // Format the date string
  return `${month}/${day}/${year}`;
};

function isToday(dateToCompare: string) {
  const today = new Date();
  const date = new Date(dateToCompare);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isYesterday(dateToCompare: string) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const date = new Date(dateToCompare);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}

const isWithinLastWeek = (dateToCompare: string) => {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);
  const date = new Date(dateToCompare);
  return date >= lastWeek;
};

const isWithin30Days = (dateToCompare: string) => {
  const today = new Date();
  const lastMonth = new Date();
  const date = new Date(dateToCompare);
  lastMonth.setDate(today.getDate() - 30);
  return date >= lastMonth;
};

export { formatDate, isToday, isYesterday, isWithinLastWeek, isWithin30Days };
