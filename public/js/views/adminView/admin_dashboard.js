// // import { loadStyles } from "/helpers/stylesManager.js";
// import { loadStyles } from "./js/helpers/stylesManager.js";
// import { generateRolesOptions } from "/helpers/rolesOptionsGenerator.js";
// import { getUsers } from "/js/api/userAPI.js";
// import { getRoles } from "/js/api/rolesAPI.js";
// // "./js/helpers/stylesManager.js"

import { getUsers } from "/js/api/userAPI.js";
import { getRoles } from "/js/api/rolesAPI.js";
import { generateRolesOptions } from "/helpers/rolesOptionsGenerator.js";
import { loadStyles } from "../helpers/stylesManager.js";
export function render() {
  return `
       
    <!-- Topbar -->
    <div id="topbar-dash">Admin Dashboard</div>
    <div class="container">
      <!-- Left Sidebar -->
      <div class="container-left">
        <nav class="navbar">
          <ul id="navbarList">
            <li>
              <a href="#" onclick="showUserManagement()"
                ><i class="fa-solid fa-users"></i> User Management</a
              >
            </li>
            <li>
              <a href="#" onclick="showStats()"
                ><i class="fa-solid fa-chart-line"></i> Stats</a
              >
            </li>
          </ul>
        </nav>
      </div>
      <!-- Right Content Area -->
      <div class="container-right">
        <div id="dashboardContent" class="dashboard">
          <!-- Dynamic content will load here -->
        </div>
      </div>
    </div>


    
   

              
   
    `;
}

export async function init(styles, params) {
  loadStyles(styles);

  // Sample user data
  let roles;
  let users;
  try {
    roles = (await getRoles()).data;
    console.log(roles);
  } catch (error) {
    alert(error.message);
  }
  try {
    users = (await getUsers()).data.data;
    console.log(users);
  } catch (error) {
    alert(error.message);
  }

  const roleMap = roles.reduce((map, role) => {
    map[role._id] = role.roleName;
    return map;
  }, {});

  // Show User Management view
  function showUserManagement() {
    const dashboard = document.getElementById("dashboardContent");
    dashboard.innerHTML = `


         <div class="right-top">
          <div class="section-title">
            <br /><br />
            <i class="fa-solid fa-users"></i> User Management
          </div>
          <ul>
            <li>
              View comprehensive lists of patients, doctors, and other admins.
            </li>
            <li>Edit user details and update roles or permissions.</li>
            <li>Delete or suspend user accounts as needed.</li>
          </ul>
        </div>
          <div class="dashboard-section" id="user-management">
            
            <div class="section-content">
              <div class="filter-bar">
                <label for="roleFilter">Filter by Role:</label>
                <select id="roleFilter" onchange="filterUsers()">
                ${generateRolesOptions(roles)}
                </select>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="userTableBody">
                  ${users
                    .map(
                      (user) => `
                    <tr data-role="${user.role}">
                      <td>${user.idPerson}</td>
                      <td>${user.Fname} ${user.Lname}</td>
                      <td>${roleMap[user.role]}</td>
                      <td>${user.email}</td>
                      <td class="action-buttons">
                        <button class="edit" onclick="editUser(${
                          user.id
                        })">Edit</button>
                        <button class="delete" onclick="deleteUser(${
                          user.id
                        })">Delete</button>
                        <button class="promote" onclick="promoteUser(${
                          user.id
                        })">Promote</button>
                      </td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        `;
  }

  // Show Stats view
  function showStats() {
    const dashboard = document.getElementById("dashboardContent");
    // Calculate stats based on sample data
    const doctorCount = users.filter(
      (u) => u.role === "Doctor" || u.role === "Admin"
    ).length;
    const patientCount = users.filter((u) => u.role === "Patient").length;
    dashboard.innerHTML = `
          <div class="dashboard-section" id="stats">
            <div class="section-title"><i class="fa-solid fa-chart-line"></i> Stats</div>
            <div class="section-content stats">
              <div class="stat-card">
                <h2>Doctors</h2>
                <p>${doctorCount}</p>
              </div>
              <div class="stat-card">
                <h2>Patients</h2>
                <p>${patientCount}</p>
              </div>
            </div>
          </div>
        `;
  }

  // Filter users based on dropdown selection
  function filterUsers() {
    const filter = document.getElementById("roleFilter").value;
    const rows = document
      .getElementById("userTableBody")
      .getElementsByTagName("tr");
    Array.from(rows).forEach((row) => {
      const role = row.getAttribute("data-role");
      if (filter === "all" || role === filter) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  // Edit user: Simulate navigation to an edit page
  function editUser(id) {
    alert("Navigate to edit page for user ID: " + id);
  }

  // Delete user: Remove the user from the data and refresh view
  function deleteUser(id) {
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      showUserManagement();
    }
  }

  // Promote user: Change role to Admin and refresh view
  function promoteUser(id) {
    const user = users.find((u) => u.id === id);
    if (user) {
      user.role = "Admin";
      showUserManagement();
    }
  }

  // Initialize with User Management view
  showUserManagement();
}
