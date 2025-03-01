import { getExpertise } from "/js/api/expertiseAPI.js";
import { loadStyles } from "/js/helpers/stylesManager.js";

export function render(user) {
  return `
      <h2>Appointment Booking</h2>
    
    <label for="Expertise">Select Expertise:</label>
    <select id="Expertise" onchange="UserlocationFunc()">
        <option value="">All Expertise</option>
    </select>
    
    <label for="search">Select Closest Location:</label>
    <input type="text" id="search" placeholder="Enter date, doctor name, or location">
    <button onclick="searchAppointments()">Search</button>
    
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Expertise</th>
                <th>Location</th>
                <th>Book</th>
            </tr>
        </thead>
        <tbody id="appointments-table-body">
        </tbody>
    `;
}


export function init(styles, params) {
  loadStyles(styles);
  const specialtyDropdown = document.getElementById("Expertise");
  const userTableBody = document.getElementById("appointments-table-body");

  async function fetchSpecialties() {
    let expertise = null
    try {
      // i need the user get the specialties function name
      //const response = await axiosInstance.get("/api/protected/expertise", { withCredentials: true });
      expertise = await getExpertise();
      expertise.forEach(({_id, name}) => {
        const option = document.createElement("option");
        option.value = name;
        option.id = _id
        option.textContent = name;
        specialtyDropdown.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching Expertises:", error);
    }
    return expertise
  }
  const experties = fetchSpecialties();

  async function getDoctorByExperties(){

  }

  async function UserlocationFunc(specialty = "") {
    try {
      // i need the user get the Appointments function name
      //const response = await axiosInstance.get("/api/protected/appointments", { withCredentials: true });
      const Doctors = getDoctorByExperties(experties);
      const lableLocation = document.createElement("label");
      lableLocation.for = "location";
      lableLocation.textContent = "Select Location:";

      const UserLocationInput = document.createElement("input");
      UserLocationInput.type = "text";
      UserLocationInput.id = "Userlocation";
      UserLocationInput.placeholder = "Enter your location";
      UserLocationInput.required;

      const searchButton = document.createElement("button");
      searchButton.onclick =
        "searchLocation(${UserLocationInput.value},${Doctors})";
      searchButton.textContent = "Search";
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }

  UserlocationFunc()

  async function searchLocation(userLocation, doctors) {
    const ClosetsLocation = getClosetLocation(userLocation);
    closeLocationDropdown.id = "closeLocationDropdown";
    const CloseLocationDropdown = document.createElement("select");
    ClosetsLocation.forEach((location) => {
      doctors.forEach((doctor) => {
        if (doctor.location === location) {
          const option = document.createElement("option");
          option.value = location;
          option.textContent = location;
          CloseLocationDropdown.appendChild(option);
        }
      });
    });
  }

  searchLocation()

  document.addEventListener("closeLocationDropdown", async function () {});

  function renderAppointments(appointments) {
    userTableBody.innerHTML = "";
    appointments.forEach((app) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${new Date(
                  app.dateTime
                ).toLocaleTimeString()}</td> // i need the user get the dateTime function name
                <td>${app.doctor.name}</td>
                <td>${app.Expertise}</td>
                <td>${app.location}</td>
                <td><button onclick="bookAppointment('${
                  app._id
                }')">Book</button></td>
            `;
      userTableBody.appendChild(row);
    });
  }
  renderAppointments()
  async function bookAppointment(appointmentId) {
    try {
      // i need the user book the appointment function name that
      alert("Appointment booked successfully.");
      fetchAppointments();
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment.");
    }
  }
  bookAppointment()
  function filterAppointmentsBySpecialty() {
    const selectedSpecialty = specialtyDropdown.value;
    userLocation(selectedSpecialty);
  }

  async function searchAppointments() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#appointments-table-body tr");
    rows.forEach((row) => {
      row.style.display = row.textContent.toLowerCase().includes(searchTerm)
        ? ""
        : "none";
    });
  }
  searchAppointments()

  specialtyDropdown.addEventListener("change", filterAppointmentsBySpecialty);
  
  function createAppintment(doctor, dateTime) {
    const data = {
      experties: doctor.Expertise,
      location: doctor,
      doctor: doctor.name,
      dateTime: dateTime,
      patient: user.name,
    };
  }
  createAppintment()
}
