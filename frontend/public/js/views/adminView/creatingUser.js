import { loadStyles } from "/js/helpers/stylesManager.js";
import { getRoles } from "/js/api/rolesAPI.js";
import { getExpertise } from "/js/api/expertiseAPI.js";
import { getLocations } from "/js/api/locationAPI.js";
import { createUser } from "/js/api/userAPI.js";

export function render() {
  return `
        <div class="main-container">
      <!-- Left Side: Title and Description -->
      <div class="left-panel">
        <h1>MedicAI</h1>
        <p>
          Join MedicAI and discover how innovative medical AI solutions can
          enhance your healthcare journey.
        </p>
      </div>

      <!-- Right Side: Registration Form & Additional Info Container -->
      <div class="right-panel">
        <!-- Doctor Additional Information Container -->
        <div class="doctor-info-container" id="doctorInfoContainer">
          <!-- expertise Dropdown -->
          <div class="form-group floating-container">
            <!-- <label for="expertise">expertise</label> -->
            <select id="expertise" name="expertise" required>
            </select>
          </div>

          <!-- Work Location -->
          <label for="workLocation">Work Location</label>
          <select id="workLocation" name="workLocation" required>
          </select>

          <!-- Working Hours Section -->
          <div class="info-section" id="workingHoursSection">
            <h3 style="text-align: center; margin-bottom: 15px">
              Working Hours
            </h3>
            <div class="input-group">
              <!-- Day Dropdown -->
              <select id="daySelect" required>
                <option value="" disabled selected>Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
              <!-- Start Time Input -->
              <input type="time" id="startTime" step="900" required />
              <!-- End Time Input -->
              <input type="time" id="endTime" step="900" required />
              <!-- Add Button -->
              <button type="button" id="addWorkingHour">Add</button>
            </div>
            <!-- List of Working Hours -->
            <div class="list-container">
              <ul id="workingHoursList"></ul>
            </div>
          </div>

          <!-- Final Submit Button for Doctor Info -->
          <button type="button" class="enter-btn" id="submitDoctorInfo">
            Submit Doctor Info
          </button>
        </div>

        <!-- Basic Registration Form -->
        <div class="register-container" id="basicRegisterContainer">
          <h2>Sign Up</h2>
          <form id="registerForm">
            <!-- idPerson (8-10 characters) -->
            <div class="form-group floating-container">
              <input
                type="text"
                id="idPerson"
                name="idPerson"
                placeholder=" "
                required
                minlength="8"
                maxlength="10"
              />
              <label for="idPerson">ID (8-10 chars)</label>
            </div>

            <!-- First Name -->
            <div class="form-group floating-container">
              <input
                type="text"
                id="Fname"
                name="Fname"
                placeholder=" "
                required
                minlength="3"
                maxlength="30"
              />
              <label for="Fname">First Name</label>
            </div>

            <!-- Last Name -->
            <div class="form-group floating-container">
              <input
                type="text"
                id="Lname"
                name="Lname"
                placeholder=" "
                required
                minlength="3"
                maxlength="30"
              />
              <label for="Lname">Last Name</label>
            </div>

            <!-- Email -->
            <div class="form-group floating-container">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                required
              />
              <label for="email">Email</label>
            </div>

            <!-- Phone (13 characters, e.g., +1-234-567-8901) -->
            <div class="form-group floating-container">
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder=" "
                required
                minlength="13"
                maxlength="13"
              />
              <label for="phone">Phone (13 chars)</label>
            </div>

            <!-- Password -->
            <div class="form-group floating-container">
              <input
                type="password"
                id="password"
                name="password"
                placeholder=" "
                required
              />
              <label for="password">Password</label>
            </div>

            <!-- Address -->
            <div class="form-group floating-container">
              <input
                type="text"
                id="address"
                name="address"
                placeholder=" "
                required
              />
              <label for="address">Address</label>
            </div>

            <!-- DateOfBirth -->
            <div class="form-group floating-container">
              <input
                type="date"
                id="DateOfBirth"
                name="DateOfBirth"
                placeholder=" "
                required
              />
              <label for="DateOfBirth">Date of Birth</label>
            </div>

            <!-- Role Dropdown -->
            <div class="form-group floating-container">
              <select id="role" name="role" required>
                <option value="" disabled selected>Select Role</option>
              </select>
              <!-- <label for="role">Role</label> -->
            </div>

            <!-- Register Button -->
            <button type="submit" id="register-user-info-btn" class="enter-btn">Register</button>
            <p id="message"></p>
            <br />
          </form>
        </div>

        <!-- Additional Information Container -->
        <div class="additional-info-container" id="additionalInfoContainer">
          <!-- General Info Section -->
          <div class="info-section" id="generalInfo">
            <h3>General Info</h3>
          </div>

          <!-- Prescriptions Section -->
          <div class="info-section" id="prescriptionsSection">
            <h3>Prescriptions</h3>
            <div class="input-group">
              <input
                type="text"
                id="prescriptionInput"
                placeholder="Enter prescription"
              />
              <button type="button" id="addPrescription">Add</button>
            </div>
            <div class="list-container">
              <ul id="prescriptionsList"></ul>
            </div>
          </div>

          <!-- Diagnosis Section -->
          <div class="info-section" id="diagnosisSection">
            <h3>Diagnosis</h3>
            <div class="input-group">
              <input
                type="text"
                id="diagnosisInput"
                placeholder="Enter diagnosis"
              />
              <button type="button" id="addDiagnosis">Add</button>
            </div>
            <div class="list-container">
              <ul id="diagnosisList"></ul>
            </div>
          </div>

          <!-- Final Submission Button -->
          <button type="button" class="enter-btn" id="submitAdditionalInfo">
            Submit Additional Info
          </button>
        </div>
      </div>

      <!-- ==========================  -->
    </div>
    `;
}

export async function init(styles, params) {
  loadStyles(styles);
  // experties section
  const expertiseOptionsList = await getExpertise();
  const expertiseOptionsHtml = expertiseOptionsList
    .map(({ _id, name }) => {
      return `<option value="${_id}">${name}</option>`;
    })
    .join("");
  document.querySelector("#expertise").innerHTML = expertiseOptionsHtml;

  //roles section
  const rolesOptionsList = await getRoles();

  const rolesOptionsHtml = rolesOptionsList
    .map(({ _id, roleName }) => {
      return `<option value="${_id}">${roleName}</option>`;
    })
    .join("");
  document.querySelector("#role").innerHTML = rolesOptionsHtml;

  // locations section
  const locationOptionsList = await getLocations();
  const locationOptionsHtml = locationOptionsList
    .map(({ _id, locationName }) => {
      return `<option value="${_id}">${locationName}</option>`;
    })
    .join("");
  document.querySelector("#workLocation").innerHTML = locationOptionsHtml;

  let basicData = {};
  let working_days = [];
  const registerForm = document.getElementById("registerForm");
  const messageEl = document.getElementById("message");
  const basicRegisterContainer = document.getElementById(
    "basicRegisterContainer"
  );
  const additionalInfoContainer = document.getElementById(
    "additionalInfoContainer"
  );

  const doctorInfoContainer = document.getElementById("doctorInfoContainer");

  // Handle basic registration form submission
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    messageEl.textContent = "";

    // Gather basic form data
    basicData["userData"] = {
      idPerson: document.getElementById("idPerson").value,
      Fname: document.getElementById("Fname").value,
      Lname: document.getElementById("Lname").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      password: document.getElementById("password").value,
      DateOfBirth: document.getElementById("DateOfBirth").value,
      address: document.getElementById("address").value,
      roleId: document.getElementById("role").value,
    };

    // Hide basic form and show additional information container
    basicRegisterContainer.style.display = "none";
    additionalInfoContainer.style.display = "block";
  });

  // Handle adding prescriptions
  document.getElementById("addPrescription").addEventListener("click", () => {
    const prescriptionInput = document.getElementById("prescriptionInput");
    const prescriptionValue = prescriptionInput.value.trim();
    if (prescriptionValue !== "") {
      const li = document.createElement("li");
      li.textContent = prescriptionValue;
      document.getElementById("prescriptionsList").appendChild(li);
      prescriptionInput.value = "";
    }
  });

  // Handle adding diagnosis
  document.getElementById("addDiagnosis").addEventListener("click", () => {
    const diagnosisInput = document.getElementById("diagnosisInput");
    const diagnosisValue = diagnosisInput.value.trim();
    if (diagnosisValue !== "") {
      const li = document.createElement("li");
      li.textContent = diagnosisValue;
      document.getElementById("diagnosisList").appendChild(li);
      diagnosisInput.value = "";
    }
  });

  // Handle final submission of additional info
  document
    .getElementById("submitAdditionalInfo")
    .addEventListener("click", async () => {
      // Gather additional patient info
      const medicalData = {
        prescriptions: Array.from(
          document.getElementById("prescriptionsList").children
        ).map((li) => li.textContent),
        diagnosis: Array.from(
          document.getElementById("diagnosisList").children
        ).map((li) => li.textContent),
      };
      const roleNameList = rolesOptionsList.filter(
        (role) => role.roleName.toLowerCase() === "doctor"
      )[0];

      if (roleNameList._id == basicData["userData"].roleId) {
        console.log("its a doctor");
        additionalInfoContainer.style.display = "none";
        doctorInfoContainer.style.display = "block";
      } else {
        console.log("Registration Data:", basicData);
        alert("Registration completed successfully!");
        await createUser(fullRegistrationData);
        // window.location.href = "../login/login.html";
      }

      basicData["userData"]["MedicalInfo"] = medicalData;

      // For demonstration purposes, log the full data to the console.
      console.log("Full basicData Data:", basicData);

      // You can now call your backend registration function.
      // Example:
      // await register(fullRegistrationData);

      // // Show success message and redirect if needed.
      // alert("Registration completed successfully!");
      // window.location.href = "login.html";
    });

  // Handle adding working hours for doctors
  document.getElementById("addWorkingHour").addEventListener("click", () => {

    const tempobj = {
      day: document.querySelector("#daySelect").value,
      start_time: document.querySelector("#startTime").value,
      end_time: document.querySelector("#endTime").value,
    }
    
    // if (working_days.includes(day)) {
    //   alert("Working day already selected");
    // } else 
    console.log(tempobj)
    if (tempobj.day && tempobj.start_time && tempobj.end_time) {
      working_days.push(tempobj);

      const li = document.createElement("li");
      li.textContent = `${tempobj.day} ${tempobj.start_time} - ${tempobj.end_time}`;
      document.getElementById("workingHoursList").appendChild(li);
      // Reset the inputs for next entry
      document.getElementById("daySelect").selectedIndex = 0;
      document.getElementById("startTime").value = "";
      document.getElementById("endTime").value = "";
    } else {
      alert("Please fill in day, start time, and end time.");
    }
  });

  // Handle final submission for doctor additional info
  document
    .getElementById("submitDoctorInfo")
    .addEventListener("click", async () => {
      // Gather doctor-specific data
      const doctorData = {
        expertise: document.getElementById("expertise").value,
        location: document.getElementById("workLocation").value,
        workingTime: working_days,
        // workingTime: Array.from(
        //   document.getElementById("workingHoursList").children
        // ).map((li) => li.textContent),
      };

      // Combine basic registration data with doctor-specific info
      const fullRegistrationData = {
        userData: basicData["userData"],
        doctorData: doctorData,
      };

      console.log("Full Doctor Registration Data:", fullRegistrationData);

      await createUser(fullRegistrationData);

      // Simulate backend registration for doctor
      alert("Doctor registration completed successfully!");
      // window.location.href = "login";
    });
}
