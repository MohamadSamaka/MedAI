import { loadStyles } from "/js/helpers/stylesManager.js";
import {myAppointments} from "/js/api/userAPI.js";


export function render() {
  return `
     <h2>My Upcoming Appointments</h2>
<div id="appointment-list"></div>
    `;
}


async function fetchFutureAppointments(user) {
    try {
       // i need the user get the appointments function name user
        const appointments = myAppointments(user._id);
        console.log(appointments)
        // Filter future appointments
        const now = new Date();
        const futureAppointments = appointments.filter(appt => new Date(appt.date) > now);

        renderAppointments(futureAppointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        alert("Failed to load future appointments.");
    }
}

function renderAppointments(appointments) {
    const appointmentContainer = document.getElementById("appointment-list");
    appointmentContainer.innerHTML = "";

    if (appointments.length === 0) {
        appointmentContainer.innerHTML = "<p>No upcoming appointments.</p>";
        return;
    }

    appointments.forEach(appt => {
        const apptCard = document.createElement("div");
        apptCard.classList.add("appointment-card");
        apptCard.innerHTML = `
            <p><strong>Doctor:</strong> ${appt.doctor}</p>
            <p><strong>Experties:</strong> ${appt.experties}</p>
            <p><strong>Date:</strong> ${new Date(appt.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${appt.time}</p>
            <p><strong>Status:</strong> ${appt.status}</p>
            <p><strong>Location:</strong> ${appt.location}</p>
            <button class="cancel-btn" data-id="${appt._id}">Cancel</button>
        `;
        appointmentContainer.appendChild(apptCard);
    });

    document.querySelectorAll(".cancel-btn").forEach(button => {
        button.addEventListener("click", (event) => cancelAppointment(event.target.dataset.id));
    });
}

async function cancelAppointment(appointmentId) {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
        await axiosInstance.delete(`/user/appointment/${appointmentId}`, { withCredentials: true });
        alert("Appointment canceled successfully.");
        fetchFutureAppointments(); // Refresh the list
    } catch (error) {
        console.error("Error canceling appointment:", error);
        alert("Failed to cancel appointment.");
    }
}

// Call the function to load appointments when the page loads
fetchFutureAppointments();



export function init(styles, params) {
  console.log(params)
  loadStyles(styles);
}