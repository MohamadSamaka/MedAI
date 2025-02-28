import { loadStyles } from "../helpers/stylesManager.js";
import axiosInstance from "../../helpers/axios.js";
const userController = require("../../controllers/userControllers");
const doctorController = require("../../controllers/doctorControllers");
import fetchFutureAppointments from ("../../views/userView/myAppointment.js");


export function render() {
  return `
      <h2>Pationt Management</h2>
    <table>
        <thead>
            <tr>
                <th>Id Number</th>
                <th>Full Name</th>
                <th>email</th>
                <th>phone</th>
                <th>Date of Birth</th>
                <th>Appointment</th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody id="user-table-body">
        </tbody>
    </table>

    <h2>Doctor Management</h2>
    <table>
        <thead>
            <tr>
                <th>Id Number</th>
                <th>Full Name</th>
                <th>Expertise</th>
                <th>Location</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody id="doctor-table-body">
        </tbody>

    `;
    
}


    const userTableBody = document.getElementById("user-table-body");
    const doctorTableBody = document.getElementById("doctor-table-body");

    async function fetchUsers() {
        try {
            const response = await(userController.getAllUsers());
            const users = response.data;
            renderUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    async function fetchDoctors() {
        try {
            const response = await(doctorController.getAllDoctors());
            const doctors = response.data;
            renderDoctors(doctors);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    }

    function renderUsers(users) {
        userTableBody.innerHTML = "";
        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.idNumber}</td>
                <td>${user.Fname} &${user.Lname}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td><a href="fetchFutureAppointments(user.idNumber)">Appointments</a></td>
                <td>${new Date(user.DateOfBirth).toLocaleDateString()}</td>
                <td>${user.role}</td>
                <td><a href="openEditCardUser(user.idNumber)">Edit</a></td>
                <td><a href="deleteUser(user.idNumber)">Delete</a></td>
            `;
            userTableBody.appendChild(row);
        });
    }

    function renderDoctors(doctors) {
        doctorTableBody.innerHTML = "";
        doctors.forEach(doctor => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${doctor.idNumber}</td>
                <td>Dr. ${doctor.FName} &${Lname}</td>
                <td>${doctor.expertise}</td>
                <td>${doctor.location}</td>
                <td>${doctor.email}</td>
                <td>${doctor.phone}</td>
                <td>${new Date(doctor.DateOfBirth).toLocaleDateString()}</td>
                <td>${doctor.role}</td>
                <td><a href="editDoctor(doctor.idNumber)">Edit</a></td>
                <td><a href="deleteDoctor(doctor.idNumber)">Delete</a></td>
            `;
            doctorTableBody.appendChild(row);
        });
    }

    fetchUsers();
    fetchDoctors();

    async function deleteUser(idNumber) {
        try {
            await axiosInstance.delete(`/api/protected/users/${idNumber}`, { withCredentials: true });
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    async function deleteDoctor(idNumber) {
        try {
            await axiosInstance.delete(`/api/protected/doctors/${idNumber}`, { withCredentials: true });
            fetchDoctors();
        } catch (error) {
            console.error("Error deleting doctor:", error);
        }
    }

    async function editUser(idNumber) {
        
        window.location.href = `/admin/usersManagement/editUser/${idNumber}`;
    }

    async function editDoctor(idNumber) {

        window.location.href = `/admin/usersManagement/editDoctor/${idNumber}`;
    }


    function openEditCardUser(userId) {
        editingUserId = userId; // Store the user ID being edited
    
        axiosInstance.get(`/admin/user/${userId}`, { withCredentials: true })
            .then(response => {
                const user = response.data;
    
                // Create an edit card dynamically
                const editCard = document.createElement("div");
                editCard.classList.add("edit-card");
    
                editCard.innerHTML = `
                    <h3>Edit User</h3>
                    <label>First Name: <input type="text" id="edit-fname" value="${user.Fname}"></label>
                    <label>Last Name: <input type="text" id="edit-lname" value="${user.Lname}"></label>
                    <label>Email: <input type="email" id="edit-email" value="${user.email}"></label>
                    <label>Phone: <input type="text" id="edit-phone" value="${user.phone}"></label>
                    <label>Date of Birth: <input type="date" id="edit-dob" value="${user.DateOfBirth}"></label>
                    <label>Role: 
                        <select id="edit-role">
                            <option value="Admin" ${user.role?.roleName === "Admin" ? "selected" : ""}>Admin</option>
                            <option value="User" ${user.role?.roleName === "User" ? "selected" : ""}>User</option>
                            <option value="Manager" ${user.role?.roleName === "Manager" ? "selected" : ""}>Manager</option>
                        </select>
                    </label>
                    <button id="update-user">Update User Info</button>
                    <button id="close-edit">Cancel</button>
                `;
    
                // Remove any existing edit card before adding a new one
                document.querySelectorAll(".edit-card").forEach(card => card.remove());
    
                document.body.appendChild(editCard); // Append the edit card to the body (or any preferred container)
    
                // Add event listener to update user info
                document.getElementById("update-user").addEventListener("click", updateUserInfo);
                
                // Add event listener to close the edit card
                document.getElementById("close-edit").addEventListener("click", () => editCard.remove());
    
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                alert("Failed to load user details.");
            });
    }    

    function openEditCardDoctor(userId) {
        editingUserId = userId; // Store the user ID being edited
    
        axiosInstance.get(`/admin/user/${userId}`, { withCredentials: true })
            .then(response => {
                const user = response.data;
    
                // Create an edit card dynamically
                const editCard = document.createElement("div");
                editCard.classList.add("edit-card");
    
                editCard.innerHTML = `
                    <h3>Edit User</h3>
                    <label>First Name: <input type="text" id="edit-fname" value="${user.Fname}"></label>
                    <label>Last Name: <input type="text" id="edit-lname" value="${user.Lname}"></label>
                    <label>Email: <input type="email" id="edit-email" value="${user.email}"></label>
                    <label>Phone: <input type="text" id="edit-phone" value="${user.phone}"></label>
                    <label>Date of Birth: <input type="date" id="edit-dob" value="${user.DateOfBirth}"></label>
                    <label> Expertise: <input type="text" id="edit-expertise" value="${user.expertise}"></label>
                    <label>Location: <input type="text" id="edit-location" value="${user.location}"></label>
                    <lable>Working Hours: <input type="text" id="edit-workingHours" value="${user.workingHours}"></label>
                    <lable>Working Days: <input type="text" id="edit-workingDays" value="${user.workingDays}"></label>
                    <label>Role: 
                        <select id="edit-role">
                            <option value="Admin" ${user.role?.roleName === "Admin" ? "selected" : ""}>Admin</option>
                            <option value="User" ${user.role?.roleName === "User" ? "selected" : ""}>User</option>
                            <option value="Manager" ${user.role?.roleName === "Manager" ? "selected" : ""}>Manager</option>
                        </select>
                    </label>
                    <button id="update-user">Update User Info</button>
                    <button id="close-edit">Cancel</button>
                `;
    
                // Remove any existing edit card before adding a new one
                document.querySelectorAll(".edit-card").forEach(card => card.remove());
    
                document.body.appendChild(editCard); // Append the edit card to the body (or any preferred container)
    
                // Add event listener to update user info
                document.getElementById("update-user").addEventListener("click", updateUserInfo);
                
                // Add event listener to close the edit card
                document.getElementById("close-edit").addEventListener("click", () => editCard.remove());
    
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                alert("Failed to load user details.");
            });
    }    




export function init(styles, params) {
  loadStyles(styles);
}
