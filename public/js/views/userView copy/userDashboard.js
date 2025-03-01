
import { loadStyles } from "../helpers/stylesManager.js";

export function render(user) {
  return `
      <h1>Admin Dashboard</h1>
      <p>Welcome your dashboard ${user.Fname} ${user.Lname}</p>
      <button onclick="window.location.href = ''">Upcoming Appointments</button>
        <button onclick="window.location.href = ''">Book an Appointment</button>
        <button onclick="window.location.href = ''">Profile Settings</button>
        <button onclick="window.location.href = ''">Chat AI</button>
        <button onclick="window.location.href = ''">Log Out</button>

    `;
}

export function init(styles, params) {
  loadStyles(styles);
}
