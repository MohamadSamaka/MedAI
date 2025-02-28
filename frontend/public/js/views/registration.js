import { loadStyles } from "../helpers/stylesManager.js";
import axiosInstance from "../api/index.js";

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
<div class="right-panel">


      
        <div class="register-container">
            <h2>New User</h2>

<form id="register-form">


    <div class="form-group floating-container">
<input type="text" palaceholder="" id="idPerson" required>
    <label for="idPerson">Person Id:</label>
    
    </div>


<div class="form-group floating-container">
 
  
     <label for="firstname">First Name:</label>
     <input type="text" id="firstname" required>

</div>

<div class="form-group floating-container">
<input type="text" id="lastname" required>
      <label for="lastname">Last Name:</label>
    
</div>

<div class="form-group floating-container">
   <input type="email" id="email" required>
    <label for="email">Email:</label>
    
    
</div>


<div class="form-group floating-container">
  <input type="tel" id="phone" required>

    <label for="phone">Phone Number</label>
  
    
</div>

<div class="form-group floating-container">

    <input type="date" id="dateOfBirth" required>

    <label for="dateOfBirth">Date of birth</label>
    
</div>


<div class="form-group floating-container">
    <input type="text" id="address" required>
    <label for="address">Address</label>
</div>
   
<div class="form-group floating-container">
 <input type="password" id="password" required>
    <label for="password">Password</label>
   
</div>
 

<div class="form-group floating-container">
<input type="role" id="roleMenu" required>
<label for="roleMenu">Role</label>
    <select id="roleMenu" required>
        <option value="">Select a role please/option>
    </select>
</div>    

<button type="submit" id="enter-btn" class="enter-btn">Register</button>

</form>
</div>

</div>

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
      return `<option value="${role._id}"> ${role.roleName}</option>`;
    })
    .join("");

  function createUser() {
    const data = {
      idPerson: document.getElementById("idPerson").value,
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
        alert("User been created successfully");
      })
      .catch((error) => {
        console.log(error);
        // alert(Creating User Failed, Error: ${response.message});
      });
  }

  const createUserButton = document.querySelector("#enter-btn");
  createUserButton.addEventListener("click", function (event) {
    event.preventDefault();
    createUser();
  });

  function openMedicalRecordModal() {
    document.getElementById("medical-record-modal").style.display = "block";
    const medicalRecordList = document.getElementById("medicalHistoryList");
    const record = document.createElement("li");
    record.innerHTML = document.getElementById("MedcalHistory").value;
    medicalRecordList.appendChild(record);
    document.getElementById("MedcalHistory").value = "";

    const data = {
      medicalHistory: medicalRecordList.map((record) => {
        return record.innerHTML;
      }),
    };
    axiosInstance
      .post("/admin/medicalRecord", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (role.roleName === "doctor") {
          const doctorDiv = document.createElement("div");
          doctorDiv.innerHTML = `
     
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

          document.getElementById("workingDays").innerHTML = workingDays.map(
            (workingDay) => {
              return `<option value="${workingDay}">${workingDay}</option>`;
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });

    const medicalRecordsUpdateButton = document.querySelector(
      "#medicalRecordsUpdate"
    );
    medicalRecordsUpdateButton.addEventListener("click", function (event) {
      const workingTimes = {
        workingDays: document.getElementById("workingDays").value,
        start_time: document.getElementById("start_time").value,
        end_time: document.getElementById("end_time").value,
      };
      const doctorData = {
        experties: document.getElementById("experties").value,
        location: document.getElementById("location").value,
        workingTime: workingTimes,
      };
    });
  }
}
