const Doctor = require("../models/doctorModel");
const JsonedResponseError = require("../errors/JsonedResponseError");

class DoctorRepository {
  ///later for registration
  async createDoctor(data) {
    return await Doctor.create(data);
  }

  async getDoctorbyObjId(id) {
    return await Doctor.findById(id);
  }

  async getDoctorByUserId(docUserId) {
    return await Doctor.find({ id: docUserId });
  }

  async getAllDoctors() {
    return await Doctor.find();
  }

  async getDoctorsByExpertise(expertise) {
    return await Doctor.find({ experties: expertise });
  }

  async updateDoctor(id, data) {
    return await Doctor.findByIdAndUpdate(id, data, { new: true });
  }

  // Get doctor's appointments sorted by date
  async getDoctorAppointments(doctorId) {
    try {
      const doc = await Doctor.find(doctorId)
        .select("appointments")
        .populate("appointments.appointment_id");
      if (!doc) {
        throw new JsonedResponseError("doctor not find", 404);
      }

      return doc;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //we valdiated at appointments
  async addAppointment(doctorId, appointment) {
    return await Doctor.findByIdAndUpdate(
      doctorId,
      { $push: { appointments: appointment } },
      { new: true }
    );
  }

  async removeAppointment(doctorId, appointmentId) {
    return await Doctor.findByIdAndUpdate(
      doctorId,
      { $pull: { appointments: { appointment_id: appointmentId } } },
      { new: true }
    );
  }

  async removePastAppointments(doctorId, today) {
    return await Doctor.findByIdAndUpdate(
      doctorId,
      { $pull: { appointments: { appointment_time: { $lt: today } } } },
      { new: true }
    );
  }
  async getAvailableAppointments(doctorId) {
    const doctor = await Doctor.findById(doctorId).select(
      "workingTime appointments"
    );
    if (!doctor) return [];

    const now = new Date();
    let availableSlots = [];

    // Get all booked appointment times (future only)
    let bookedAppointments = doctor.appointments
      .map((app) => new Date(app.appointment_time).getTime())
      .filter((time) => time > now.getTime()); // Only consider future appointments

    // Sorting to make sure we're checking them in order
    bookedAppointments.sort((a, b) => a - b);

    // Generate available slots
    let slotCount = 0;
    let searchDate = new Date(now); // Start searching from now

    while (slotCount < 24) {
      let dayName = searchDate.toLocaleString("en-US", { weekday: "long" });

      // Check if the doctor works on this day
      let workingDay = doctor.workingTime.find((d) => d.day === dayName);
      if (workingDay) {
        let [startHour, startMinute] = workingDay.start_time
          .split(":")
          .map(Number);
        let [endHour, endMinute] = workingDay.end_time.split(":").map(Number);

        let startTime = new Date(searchDate);
        startTime.setHours(startHour, startMinute, 0, 0);

        let endTime = new Date(searchDate);
        endTime.setHours(endHour, endMinute, 0, 0);

        // If we're on the same day as now, start from the next available slot
        let slotStartTime = startTime.getTime();
        if (searchDate.toDateString() === now.toDateString()) {
          slotStartTime = Math.max(slotStartTime, now.getTime());
        }

        // Generate slots in 15-minute intervals
        for (
          let time = slotStartTime;
          time < endTime.getTime();
          time += 15 * 60000
        ) {
          if (!bookedAppointments.includes(time)) {
            availableSlots.push({
              date: new Date(time).toISOString().split("T")[0], // YYYY-MM-DD
              time: new Date(time).toTimeString().split(" ")[0], // HH:mm:ss
            });
            slotCount++;
            if (slotCount >= 24) break;
          }
        }
      }

      // Move to the next day
      searchDate.setDate(searchDate.getDate() + 1);
    }

    return availableSlots;
  }

  // Get the first available appointment slot
  async getFirstAvailableAppointment(doctorId) {
    let availableAppointments = await this.getAvailableAppointments(doctorId);
    return availableAppointments.length ? availableAppointments[0] : null;
  }
}

module.exports = new DoctorRepository();
