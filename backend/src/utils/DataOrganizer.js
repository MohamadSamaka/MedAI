const systemPromptGenerator = (ChatLogs, expertise) => {
  return `
        You are a highly advanced medical AI assistant that provides initial medical advice. Your role is to identify the patient's symptoms, recommend relevant medical specialties, and assess the urgency of the situation.
        Additionally, you can handle medical record data to provide well-structured information.
        Please respond only to medical-related inquiries. For any non-medical questions (e.g., "how large is the moon"), kindly inform the user that you only provide medical advice.

        Here is the data you will use:
        
        ${ChatLogs.length > 0 ? `CHAT LOGS:\n${JSON.stringify(ChatLogs, null, 2)}` : 'No previous chat logs available.'}
        ${expertise.length > 0 ? `CHAT LOGS:\n${JSON.stringify(expertise, null, 2)}` : 'No previous chat logs available.'}

        Tasks:
        1. Identify the patient's symptoms and assess the urgency.
        2. Recommend relevant medical expertise.suggest making an appointment with a doctor with that expertise.
        3. Organize and present medical record data in a clean, structured format.
    `;
};

// const organizeDoctorData = (doctorList) => {
//   return doctorList.map(({ _id, expertise, location, workingTime, appointments, user }) => ({
//     id: _id,
//     firstName: user.Fname,
//     lastName: user.Lname,
//     email: user.email,
//     phone: user.phone,
//     expertise,
//     location,
//     workingTime: workingTime.map(({ day, start_time, end_time }) => ({
//       day,
//       startTime: start_time,
//       endTime: end_time,
//     })),
//     appointments: appointments.map(({ appointment_time, appointment_id }) => ({
//       time: appointment_time,
//       id: appointment_id,
//     })),
//   }));
// };



const organizeDoctorData = (doctorList) => {
  return doctorList.map((doctor) => {
    return {
      id: doctor._id,
      expertise: doctor.expertise,
      location: doctor.location,
      workingTime: doctor.workingTime.map((time) => ({
        day: time.day,
        startTime: time.start_time,
        endTime: time.end_time,
      })),
      appointments: doctor.appointments.map((appointment) => ({
        time: appointment.appointment_time,
        id: appointment.appointment_id,
      })),
    };
  });
};
// Organize medical record data
const organizeMedicalRecordData = (medicalRecords) => {
  return medicalRecords.map((record) => {
    return {
      userId: record.userId,
      prescriptions: record.prescriptions.map((prescription) => ({
        medication: prescription.medication,
        dosage: prescription.dosage,
        frequency: prescription.frequency,
        prescribedBy: prescription.prescribed_by,
        datePrescribed: prescription.date_prescribed,
        notes: prescription.notes,
      })),
      diagnosis: record.diagnosis.map((diagnosis) => ({
        condition: diagnosis.condition,
        diagnosedBy: diagnosis.diagnosed_by,
        date: diagnosis.date,
      })),
      doctorNotes: record.doctorNotes.map((note) => ({
        timestamp: note.timestamp,
        notes: note.notes,
        docId: note.docId,
      })),
      appointments: record.appointmentId.map((appointment) => ({
        time: appointment.appointment_time,
        id: appointment.appointment_id,
      })),
    };
  });
};

module.exports = {
  systemPromptGenerator,
  organizeDoctorData,
  organizeMedicalRecordData,
};
