import { getExpertise } from "/js/api/expertiseAPI.js";
import { getLocations, getClosestLocations } from "/js/api/locationAPI.js";
import {
  getDoctorByExperties,
  docsAvailbleAppointments,
} from "/js/api/doctorAPI.js";
import { createAppintment } from "/js/api/AppointmentAPI.js";
import {
  generateExpertiseOptions,
  generateLocationOptions,
} from "/js/helpers/OptionsGenerator.js";
import { loadStyles } from "/js/helpers/stylesManager.js";

let expertise = null;
let locations = null;

export function render(user) {
  // Inline styles for a nicer look; feel free to move to a separate CSS file
  return `
    <h2>Appointment Booking</h2>

    <label for="Expertise">Select Expertise:</label>
    <select id="Expertise">
        <option value="">All Expertise</option>
    </select>
    
    <label for="location"> Select Closest Location:  </label>
    <select id="location">
      <option value="">Locations</option>
    </select>
    
    <button id="search-for-appointments-btn">Search</button>
    
    <table>
      <thead>
          <tr>
              <th>Date</th>
              <th>Doctor</th>
              <th>Expertise</th>
              <th>Location</th>
              <th>Appointments</th>
          </tr>
      </thead>
      <tbody id="appointments-table-body">
      </tbody>
    </table>
    
    <section id="doctor-appointment-section" class="appointments-section">
        <!-- Main container for doctor info & appointments -->
        <div id="doctorMainContainer">
            <!-- Appointments will be dynamically inserted here -->
        </div>
    </section>
  `;
}

// Utility functions to build maps
function generateLocationsMap(locationsList) {
  return locationsList.reduce((map, location) => {
    map[location._id] = location.locationName;
    return map;
  }, {});
}

function generateExpertiseMap(expertiseList) {
  return expertiseList.reduce((map, expertise) => {
    map[expertise._id] = expertise.name;
    return map;
  }, {});
}

export function init(styles, subloader, params) {
  loadStyles(styles);
  
  let choosenExpertiseId = null;
  let choosenLocationId = null;

  // Keep track of which doctor is currently open (if any)
  let currentDoctorId = null;
  let currentDoctorName = null;

  // Data structures for location names and expertise names
  let locationsMap = null;   
  let expertiseMap = null;   

  // Fetched data
  let doctorByExperties = null;
  let docsAvailableAppointmentsMap = {};

  // DOM elements
  const specialtyDropdown = document.getElementById("Expertise");
  const locationDropDown = document.getElementById("location");
  const userTableBody = document.getElementById("appointments-table-body");
  const searchAppointsBtn = document.getElementById("search-for-appointments-btn");
  const mainContainer = document.getElementById("doctorMainContainer");

  // ---------------------- FETCH & POPULATE DROPDOWNS ---------------------- //
  async function genereateExpertiseList() {
    try {
      expertise = await getExpertise();
      expertiseMap = generateExpertiseMap(expertise);
      specialtyDropdown.innerHTML = generateExpertiseOptions(expertise);
    } catch (error) {
      console.error("Error fetching Expertises:", error);
    }
  }

  async function genereateLocationList() {
    try {
      locations = await getLocations();
      locationsMap = generateLocationsMap(locations);
      locationDropDown.innerHTML = generateLocationOptions(locations);
    } catch (error) {
      console.error("Error fetching Locations:", error);
    }
  }

  // Initialize dropdowns immediately
  genereateExpertiseList();
  genereateLocationList();

  specialtyDropdown.addEventListener("change", () => {
    choosenExpertiseId = specialtyDropdown.value;
  });

  locationDropDown.addEventListener("change", () => {
    choosenLocationId = locationDropDown.value;

  });

  // ----------------------- GENERATE APPOINTMENT LIST ---------------------- //
  function genereateAppos(docName, doctorSegment) {
    let html = `<h2 id="doctor-name-title">Available Appointments for Dr. ${docName}</h2>`;

    if (!doctorSegment || doctorSegment.length === 0) {
      // If no appointments are available, show a friendly message
      html += `
        <p style="color: red;">
          No more available appointments for this doctor.
        </p>
      `;
      return html;
    }

    html += doctorSegment
      .map((appointment, index) => {
        return `
          <div class="appointment-container">
            <span value="${index}" id="appointmentDate-${index}">Date: ${appointment.date}</span>
            <span value="${index}" id="appointmentTime-${index}">Time: ${appointment.time}</span>
            <button
              class="book-btn"
              data-date="${appointment.date}"
              data-time="${appointment.time}"
            >
              Book
            </button>
          </div>
        `;
      })
      .join("");

    return html;
  }

  // -------------------------- DOCTOR PICK LOGIC --------------------------- //
  function pickDoctor(docId, docName) {
    // Store which doctor is currently open
    currentDoctorId = docId;
    currentDoctorName = docName;

    const doctorSegment = docsAvailableAppointmentsMap[docId] || [];
    
    // Build and inject the HTML
    mainContainer.innerHTML = genereateAppos(docName, doctorSegment);

    // Attach event listeners to the "Book" buttons
    mainContainer.querySelectorAll(".book-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const date = button.getAttribute("data-date");
        const time = button.getAttribute("data-time");
        const appointment = { date, time };
        bookAppointment(docId, appointment);
      });
    });
  }

  function setBookingEventListener() {
    userTableBody.querySelectorAll("button[data-book-doc]").forEach((button) => {
      const docID = button.getAttribute("data-book-doc");
      const docName = button.getAttribute("data-book-doc-name");
      button.addEventListener("click", () => pickDoctor(docID, docName));
    });
  }

  // ------------------------- RENDER DOCTOR TABLE -------------------------- //
  function generateDoctorList(doctorByExperties) {
    // Build rows for each doctor
    const docRows = doctorByExperties
      .map((docInfo) => {
        console.log(docInfo)
        const fullName = `${docInfo.docPersonalInfo.Fname} ${docInfo.docPersonalInfo.Lname}`;
        const expertise = expertiseMap[docInfo.expertise] || "N/A";
        const location = locationsMap[docInfo.location] || "N/A";

        // For the "Date" column, we'll show the earliest available date
        const firstSlot = docsAvailableAppointmentsMap[docInfo._id]?.[0];
        const dateAvailable = firstSlot ? firstSlot.date : "No slots";

        return `
          <tr>
            <td>${dateAvailable}</td>
            <td>Dr. ${fullName}</td>
            <td>${expertise}</td>
            <td>${location}</td>
            <td>
              <button
                class="book-btn"
                data-book-doc="${docInfo._id}"
                data-book-doc-name="${fullName}"
              >
                Choose
              </button>
            </td>
          </tr>
        `;
      })
      .join("");

    userTableBody.innerHTML = docRows;
  }

  // ----------------------- FETCH DOCTORS & APPOINTMENTS ------------------- //
  async function obtainInfo() {
    try {
      // Clear out main container each time we search
      mainContainer.innerHTML = "";

      // Fetch doctors by the chosen expertise
      doctorByExperties = await getDoctorByExperties(choosenExpertiseId);
      // docPersonalInfo
      // If none found, clear the table and show a message
      if (!doctorByExperties || doctorByExperties.length === 0) {
        userTableBody.innerHTML = "";
        alert("Sorry, no doctors available for that expertise.");
        return;
      }

      // Build the appointments map for each doctor
      docsAvailableAppointmentsMap = {};
      for (const { _id } of doctorByExperties) {
        const appointments = await docsAvailbleAppointments(_id);
        docsAvailableAppointmentsMap[_id] = appointments;
      }

      // Render the doctor list in the table
      generateDoctorList(doctorByExperties);

      // Attach listeners for the "Choose" buttons
      setBookingEventListener();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // On "Search" click, fetch the data & populate table
  searchAppointsBtn.addEventListener("click", obtainInfo);

  // ----------------------------- BOOK LOGIC ------------------------------- //
  async function bookAppointment(docId, appointment) {
    try {
      const dateTimeString = `${appointment.date} ${appointment.time}`;
      const appointmentdateTime = new Date(dateTimeString);

      const data = {
        experties: choosenExpertiseId,
        location: choosenLocationId,
        doctorId: docId,
        dateTime: appointmentdateTime,
      };


      await createAppintment(data);
      alert("Appointment created successfully!");

      // Re-fetch all data so we have the updated availability
      await obtainInfo();

      // If the user had a particular doctor open, re-open it to show updated slots
      if (currentDoctorId) {
        pickDoctor(currentDoctorId, currentDoctorName);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("There was an error creating your appointment.");
    }
  }
}
