import axios from 'axios';
class ApiHandler {
  async getAppointments(doctorId, date) {
    console.log(date);

    const res = await axios.post(
      'http://localhost:5000/patient/find-appointment-availability',
      {
        DoctorId: doctorId,
        date: date,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      }
    );
    return res;
    // return timeSlots;
  }
}
export default ApiHandler;
