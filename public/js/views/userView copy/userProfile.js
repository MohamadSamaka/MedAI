
import { loadStyles } from "../helpers/stylesManager.js";

export function render(user) {
  return `
<h2>User Profile</h2>
<div id="profile-page"></div>

    `;
}

async function fetchUserProfile() {
    try {
        // i need the user get the user data function name
        const user = [];
        renderUserProfile(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        alert("Failed to load profile.");
    }
}

function renderUserProfile(user) {
    const profileContainer = document.getElementById("profile-page");
    profileContainer.innerHTML = `
        <h2>My Profile</h2>
        <div class="profile-section">
            <label>First Name: <input type="text" id="profile-fname" value="${user.Fname}" disabled></label>
            <label>Last Name: <input type="text" id="profile-lname" value="${user.Lname}" disabled></label>
            <label>ID Number: <input type="text" id="profile-id" value="${user.idPerson}" disabled></label>
            <label>Date of Birth: <input type="date" id="profile-dob" value="${user.DateOfBirth}" disabled></label>
            <label>Email: <input type="email" id="profile-email" value="${user.email}" disabled></label>
            <label>Phone: <input type="text" id="profile-phone" value="${user.phone}" disabled></label>
        </div>

        <h3>Medical Records</h3>
        <div class="medical-records">
            ${user.medicalRecords.length > 0 ? user.medicalRecords.map(record => `
                <div class="record-card">
                    <p><strong>Condition:</strong> ${record.condition}</p>
                    <p><strong>Date:</strong> ${new Date(record.date).toLocaleDateString()}</p>
                    <p><strong>Notes:</strong> ${record.notes}</p>
                </div>
            `).join("") : "<p>No medical records found.</p>"}
        </div>
    `;
}

// Load the profile page
fetchUserProfile();


export function init(styles, params) {
  loadStyles(styles);
}
