
import { loadStyles } from "../helpers/stylesManager.js";

export function render() {
  return `
      <h2>Appointment Booking</h2>
    
    <label for="specialty">Select Specialty:</label>
    <select id="specialty" onchange="filterAppointmentsBySpecialty()">
        <option value="">All Specialties</option>
    </select>
    
    <label for="search">Search Appointment:</label>
    <input type="text" id="search" placeholder="Enter date, doctor name, or location">
    <button onclick="searchAppointments()">Search</button>
    
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Location</th>
                <th>Doctor</th>
                <th>Specialty</th>
                <th>Patient</th>
                <th>status</th>
                <th>edit</th>
            </tr>
        </thead>
        <tbody id="appointments-table-body">
        </tbody>
    `;
}


document.addEventListener("DOMContentLoaded", async function () {
    const specialtyDropdown = document.getElementById("specialty");
    const userTableBody = document.getElementById("appointments-table-body");

    async function fetchSpecialties() {
        try {
            const response = await axiosInstance.get("/api/protected/expertise", { withCredentials: true });
            const specialties = response.data;
            specialties.forEach(specialty => {
                const option = document.createElement("option");
                option.value = specialty;
                option.textContent = specialty;
                specialtyDropdown.appendChild(option);
            });
        } catch (error) {
            console.error("Error fetching specialties:", error);
        }
    }

    async function fetchAppointments(specialty = "") {
        try {
            const response = await axiosInstance.get(`/api/protected/expertise?specialty=${specialty}&available=true`, { withCredentials: true });
            const appointments = response.data;
            renderAppointments(appointments);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    }

    function renderAppointments(appointments) {
        userTableBody.innerHTML = "";
        appointments.forEach(app => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${new Date(app.dateTime).toLocaleDateString()}</td>
                <td>${new Date(app.dateTime).toLocaleTimeString()}</td>
                <td>${app.location}</td>
                <td>${app.doctor.name}</td>
            `;
            userTableBody.appendChild(row);
        });
    }

    function filterAppointmentsBySpecialty() {
        const selectedSpecialty = specialtyDropdown.value;
        fetchAppointments(selectedSpecialty);
    }

    async function searchAppointments() {
        const searchTerm = document.getElementById("search").value.toLowerCase();
        const rows = document.querySelectorAll("#appointments-table-body tr");
        rows.forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(searchTerm) ? "" : "none";
        });
    }

    specialtyDropdown.addEventListener("change", filterAppointmentsBySpecialty);

    fetchSpecialties();
    fetchAppointments();
});

export function init(styles, params) {
  loadStyles(styles);
}


