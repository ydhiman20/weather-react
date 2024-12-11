export function dateToDay(date) {
  const currentDate = new Date(date); // Create a date object
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    currentDate
  );
}
