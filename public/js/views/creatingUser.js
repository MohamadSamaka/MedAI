import { loadStyles } from "../../helpers/stylesManager.js";
import axiosInstance from "../../api/index.js";

export function render() {
  return `
        <h2>Create a User</h2>
        <form id="register-form">
        <label for="id">Person Id:</label>
            <input type="text" id="id" required>

            <label for="firstname">First Name:</label>
            <input type="text" id="firstname" required>

             <label for="lastname">Last Name:</label>
            <input type="text" id="lastname" required>

            
            <label for="email">Email:</label>
            <input type="email" id="email" required>

            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" required>

            <label for="dateOfBirth">Date of birth</label>
            <input type="date" id="dateOfBirth" required>

            <label for="address">Address</label>
            <input type="text" id="address" required>
            
            <label for="password">Password</label>
            <input type="password" id="password" required>

            <label for="roleMenu">Role</label>
            <select id="roleMenu" required>
                <option value="">Select a role please/option>
            
            </select>
            
            <button type="submit" id="create-user-btn">create user</button>
        </form>
        <p>already have an account? <a href="login.html">Login here</a></p>

          <div id="medical-record-modal" class="modal">
            <form id="medical-record-form">
                <h1>medical History:</h1>
               
                <ul id="medicalHistoryList">
                   
                    </ul>
                <label for="MedcalHistory">Allergies/diagnosis/medication :</label>
                <br>
                <input type="text" id="MedcalHistory"></textbox>
                <br>

                <button type="submit" id=medicalRecordsUpdate>submit</button>
                <button type="continue" id=continue>cancel</button>
            </form>
        </div>
    `;
}

export async function init(styles, params) {
  loadStyles(styles);

  async function getRole() {
    return await axiosInstance
      .get("/admin/role", {
        withCredentials: true,
      })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }
  const roles = await getRole();
  console.log(roles);
  document.getElementById("roleMenu").innerHTML = roles
    .map((role) => {
      return `<option value="${role._id}">${role.roleName}</option>`;
    })
    .join("");

  function createUser() {
    const data = {
      idPerson: document.getElementById("id").value,
      Fname: document.getElementById("firstname").value,
      Lname: document.getElementById("lastname").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      DateOfBirth: document.getElementById("dateOfBirth").value,
      address: document.getElementById("address").value,
      password: document.getElementById("password").value,
      roleId: document.getElementById("roleMenu").value,
    };
    console.log(data);
    axiosInstance
      .post("/admin/user", data, {
        withCredentials: true,
      })
      .then((response) => {
        alert(`User been created successfully`);
      })
      .catch((error) => {
        console.log(error);
        // alert(`Creating User Failed, Error: ${response.message}`);
      });
  }

  const createUserButton = document.querySelector("#create-user-btn");
  createUserButton.addEventListener("click", function (event) {
    event.preventDefault();
    createUser();
  });

  function openMedicalRecordModal() {
    document.getElementById("medical-record-modal").style.display = "block";
    const medicalRecordList = document.getElementById("medicalHistoryList");
    const record=document.createElement("li");
    record.innerHTML = document.getElementById("MedcalHistory").value;
    medicalRecordList.appendChild(record);
    document.getElementById("MedcalHistory").value = "";

    const data = {
        medicalHistory: medicalRecordList.map((record) => {
            return record.innerHTML;
        })
    };
    axiosInstance.post("/admin/medicalRecord", data, {
        withCredentials: true
    }).then((response) => {
        console.log(response);
        if(role.roleName==="doctor"){
            const doctorDiv=document.createElement("div");
            doctorDiv.innerHTML=`
     
            <label for="experience">Experties</label>
            <input type="text" id="experties" required>
            <label for="location">Location</label>
            <input type="text" id="location" required>
            <select id="workingDays" required>
                <option value="">Select a role please/option>

            </select>
            <label for="start_time">Start Time</label>
            <input type="time" id="start_time" required>
            <label for="end_time">End Time</label>
            <input type="time" id="end_time" required>
            <button type="submit" id="create-doctor-btn">create doctor</button>
            `;

            document.getElementById("workingDays").innerHTML = workingDays
            .map((workingDay) => {
              return `<option value="${workingTime.day}">${workingTime.day}</option>`;
            })         
        
        }


    }).catch((error) => {
        console.log(error);
    });
    
    const medicalRecordsUpdateButton = document.querySelector("#medicalRecordsUpdate");
    medicalRecordsUpdateButton.addEventListener("click", function (event) {
        const workingTimes={
            workingDays:document.getElementById("workingDays").value,
            start_time:document.getElementById("start_time").value,
            end_time:document.getElementById("end_time").value
        }
        const doctorData = {
            experties: document.getElementById("experties").value,
            location: document.getElementById("location").value,
            workingTime: workingTimes
        };
    });

  }
}
