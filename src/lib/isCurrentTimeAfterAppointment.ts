export function isCurrentTimeAfterAppointmentEnd(
  appointmentDateTime: string,
  duration: number
) {
  // Parse the appointment date
  let appointmentEndDate = new Date(appointmentDateTime);

  // Add the duration in minutes to the appointment date
  appointmentEndDate.setMinutes(appointmentEndDate.getMinutes() + duration);

  // Get the current date and time
  let now = new Date();

  // Compare the dates and return the result
  return now > appointmentEndDate;
}
