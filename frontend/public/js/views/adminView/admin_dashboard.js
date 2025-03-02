import { loadStyles } from "/js/helpers/stylesManager.js";
import { generateRolesOptions } from "/js/helpers/OptionsGenerator.js";
import { getUsers, deleteUser,getUserById ,updateUser} from "/js/api/userAPI.js";
import { getRoles } from "/js/api/rolesAPI.js";
import { renderView } from "/js/routes/router.js";


let roles;
let users;
let rolesMap;

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
              <a href="/admin/dashboard" data-link data-render-in="dashboardContent""
                ><i class="fa-solid fa-users"></i> User Management</a
              >
            </li>
            <li>
              <a>
              <i class="fa-solid fa-chart-line"></i> Stats</a
              >
            </li>
            <li>
              <a href="/admin/dashboard/users" data-link data-render-in="dashboardContent">
              <i class="fa-solid fa-chart-line"></i> 
              create new user
              </a
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
    
    <div  style="display: none" id="edit-card">


      </div>

    
    <!------------- FOOTER --------------->
    <div class="footer" id="footer">


                  <!-- Load the translator script -->
    <script src="../../translator.js"></script>
    `;
}



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
              <select id="roleFilter">
              <option value="" selected>all</option>
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
                  <tr data-role="${user.role}" data-user-id=${user.id}>
                    <td class="id-person-column">${user.idPerson}</td>
                    <td class="full-name-column">${user.Fname} ${
                      user.Lname
                    }</td>
                    <td class="role-name-column">${rolesMap[user.role]}</td>
                    <td class="email-column">${user.email}</td>
                    <td class="action-buttons">
                      <button class="edit" id="editUser">Edit</button>
                      <button class="delete" >Delete</button>
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
  setDeleteButtonElements();
  setRoleFilterChangeEvent();
  // filterUsers();
}


async function updateUserB(userid) {
  const index = users.findIndex((u) => u.id === userid);
   console.log(users[index]);
  const user=users[index];
  const editCardDiv = document.getElementById("edit-card");
  editCardDiv.style.display = "block";
  editCardDiv.innerHTML = `
    <h3>Edit User</h3>
    <label>First Name: <input type="text" id="edit-fname" value="${user.Fname}"></label>
    <label>Last Name: <input type="text" id="edit-lname" value="${user.Lname}"></label>
    <label>Email: <input type="email" id="edit-email" value="${user.email}"></label>
    <label>Phone: <input type="text" id="edit-phone" value="${user.phone}"></label>
    <label>Role: <select id="edit-role">${generateRolesOptions(roles)}</select></label>
    <button id="updateUser">Update</button>
    <button id="cancelUpdate">Cancel</button>
  `;
    document.getElementById("updateUser").addEventListener("click", async () => {
    const id =users[index].id;
    const idPerson=users[index].idPerson;
    const Fname = document.getElementById("edit-fname").value;
    const Lname = document.getElementById("edit-lname").value;
    const email = document.getElementById("edit-email").value;
    const phone = document.getElementById("edit-phone").value;
    const role = document.getElementById("edit-role").value;
    const updatedUserVar = {idPerson, Fname, Lname, email, phone, role };
    try {
      await updateUser(idPerson,updatedUserVar);
      alert("User updated successfully");
      console.log(updatedUserVar);
      showUserManagement();
    } catch (error) {
      alert("Failed to update user");
      console.error(error.message);
    }
  });
  document.getElementById("cancelUpdate").addEventListener("click", () => {
    editCardDiv.style.display = "none";
  });

}
  

function subRouteLoader(subloader, subRouteName) {
  switch (subRouteName) {
    case "users":
      renderView(subloader.usersDashboard, "dashboardContent");
      break;

    default:
      break;
  }
}

function filterUsers() {
  
}

// Delete user: Remove the user from the data and refresh view
async function deleteUserFromDom(id, fullUserName) {
  const confirmation = confirm(
    `Are you sure you want to delete the user named "${fullUserName}"?`
  );

  if (confirmation) {
    const index = users.findIndex((u) => u.id === id);
    console.log(users[index]);
    if (index !== -1) {
      users.splice(index, 1);
      showUserManagement();
      try {
        await deleteUser(id);
        alert(`User "${fullUserName}" has been deleted successfully.`);
      } catch (error) {
        console.error(error.meesage);
        alert("Failed to delete user");
      }
    }
  }
}

function setRoleFilterChangeEvent() {
  const rolesFilterMenu = document.querySelector("#roleFilter");
  rolesFilterMenu.addEventListener("change", () => filterUsers());
}

function setDeleteButtonElements() {
  const userRows = document.querySelectorAll("#userTableBody tr");
  userRows.forEach((row) => {
    const userId = row.getAttribute("data-user-id");
    const fullUserName = row.querySelector(".full-name-column").textContent;
    const deleteButton = row.querySelector(".delete");
    deleteButton.addEventListener("click", () =>
      deleteUserFromDom(userId, fullUserName));
     const editButton = row.querySelector(".edit");
     editButton.addEventListener("click", () =>
      updateUserB(userId)
    );
  });
}

export async function init(styles, subloader, params) {
  loadStyles(styles);

  try {
    roles = (await getRoles()).data;
  } catch (error) {
    alert(error.message);
  }
  try {
    users = (await getUsers()).data.data;
  } catch (error) {
    alert(error.message);
  }

  rolesMap = roles.reduce((map, role) => {
    map[role._id] = role.roleName;
    return map;
  }, {});

  // Show User Management view

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

  showUserManagement(rolesMap);
  subRouteLoader(subloader, params.subRoute);
}
