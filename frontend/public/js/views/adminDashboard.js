
import { loadStyles } from "../helpers/stylesManager.js";

export function render() {
  return `
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. Here you can manage users, appointments, and other data.</p>
      <button onclick="window.location.href = '/admin/usersManagement'">Manage Users</button>
        <button onclick="window.location.href = '/admin/appointments'">Manage Appointments</button>
        <button onclick="window.location.href = '/admin/dashboard/user'">Create New User</button>
    `;
}

export function init(styles, params) {
  loadStyles(styles);
}
