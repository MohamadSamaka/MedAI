import { loadStyles } from "../helpers/stylesManager.js";

export function render() {
  return `
      <h2>User Management</h2>
    <table>
        <thead>
            <tr>
                <th>Id Number</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody id="user-table-body">
            <!-- משתמשים ייטענו כאן דינאמית -->
        </tbody>
    </table>
    `;
}


    const userTableBody = document.getElementById("user-table-body");

    async function fetchUsers() {
        try {
            const response = await axiosInstance.get("/admin/users", { withCredentials: true });
            const users = response.data;
            renderUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    function renderUsers(users) {
        userTableBody.innerHTML = "";
        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.idPerson}</td>
                <td>${user.Fname} ${user.Lname}</td>
                <td>${user.role ? user.role.roleName : "N/A"}</td>
                <td><button class="edit-btn" data-id="${user._id}">Edit</button></td>
                <td><button class="delete-btn" data-id="${user._id}">Delete</button></td>
            `;
            userTableBody.appendChild(row);
        });

        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", (event) => editUser(event.target.dataset.id));
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (event) => deleteUser(event.target.dataset.id));
        });
    }

    async function deleteUser(userId) {
        if (!confirm("Are you sure you want to delete this user")) return;

        try {
            await axiosInstance.delete(`/admin/user/${userId}`, { withCredentials: true });
            alert("The user has been deleted successfully");
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete the user");
        }
    }


    fetchUsers();

export function init(styles, params) {
  loadStyles(styles);
}
