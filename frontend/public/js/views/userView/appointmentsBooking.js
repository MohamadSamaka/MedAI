import { getExpertise } from "/js/api/expertiseAPI.js";
import { getLocations, getClosestLocations } from "/js/api/locationAPI.js";
import {
  getDoctorByExperties,
  docsAvailbleAppointments,
} from "/js/api/doctorAPI.js";

import {
  generateExpertiseOptions,
  generateLocationOptions,
} from "/helpers/OptionsGenerator.js";
import { loadStyles } from "/js/helpers/stylesManager.js";


import{createAppintment} from "/js/api/AppointmentAPI.js";



let expertise = null;
let locations = null;

export function render(user) {
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
                <th>appointments</th>
            </tr>
        </thead>
        <tbody id="appointments-table-body">
        </tbody>
    `;
}

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
  let choosenLocationName = null;
  let locationsMap = null; // a map to get the location name by id
  let expertiseMap = null; // a map to get the expertise name by id
  let doctorByExperties = null;
  let closestDocsLocations = null;
  let docsAvailableAppointmentsMap = {}; //an object that maps doc ids to their appointments
  const specialtyDropdown = document.getElementById("Expertise");
  const locationDropDown = document.getElementById("location");
  const userTableBody = document.getElementById("appointments-table-body");
  const searchAppointsBtn = document.getElementById(
    "search-for-appointments-btn"
  );

  async function genereateExpertiseList() {
    try {
      expertise = await getExpertise();
      expertiseMap = generateExpertiseMap(expertise);
      specialtyDropdown.innerHTML = generateExpertiseOptions(expertise);
    } catch (error) {
      console.error("Error fetching Expertises:", error);
    }
    return expertise;
  }
  genereateExpertiseList();

  async function genereateLocationList() {
    try {
      locations = await getLocations();
      locationsMap = generateLocationsMap(locations);
      locationDropDown.innerHTML = generateLocationOptions(locations);
    } catch (error) {
      console.error("Error fetching Expertises:", error);
    }
  }

  specialtyDropdown.addEventListener("change", () => {
    choosenExpertiseId = specialtyDropdown.value;
  
  });

  locationDropDown.addEventListener("change", () => {
    choosenLocationId = locationDropDown.value;
    choosenLocationName =
      locationDropDown.options[locationDropDown.selectedIndex].text;
  });

  genereateLocationList();

  function pickDoctor(docId) {
    const doctorSegment = docsAvailableAppointmentsMap[docId];
  
    ///basically now all you have to do is => 
    innerHTML=` <section id="doctor-appointment-section" class="appointments-section">
    <h2 id="doctor-name-title">Doctor's Name</h2>

    <!-- Main container for doctor info & appointments -->
    <div id="doctorMainContainer">
        <!-- Appointments will be dynamically inserted here -->
    </div>
</section>`
    // Main container for doctor info & appointments
    //put it wherever it fits =>
 

    const mainContainer = document.getElementById("doctorMainContainer");//cahnge get or se a container
    mainContainer.innerHTML = ""; // Clear previous content

    // Doctor's name (assuming the doctor’s name is in the first appointment)
    //const doctorName = 
    // Create title for doctor’s name
    const titleElement = document.createElement("h2");
    titleElement.textContent = doctorName;
    titleElement.style.textAlign = "center"; // Center the title
    mainContainer.appendChild(titleElement);

    // Loop through available appointments
    doctorSegment.forEach((appointment, index) => {
        const date = appointment.dateTime.date; // Extract date
        const time = appointment.dateTime.time; // Extract HH:MM

        // Create appointment container
        const appointmentDiv = document.createElement("div");
        appointmentDiv.classList.add("appointment-container");

        // Create date element with value=index
        const dateSpan = document.createElement("span");
        dateSpan.textContent = `Date: ${date}`;
        dateSpan.setAttribute("value", index); // Set value=index
        dateSpan.id = `appointmentDate-${index}`;

        // Create time element with value=index=>
        //so when pressed book we can automatically get from
        //docsAvailableAppointmentsMap[docInfo._id][index] , but like as you wish
        const timeSpan = document.createElement("span");
        timeSpan.textContent = `Time: ${time}`;
        timeSpan.setAttribute("value", index); // Set value=index
        timeSpan.id = `appointmentTime-${index}`;

        // Create book button
        const bookButton = document.createElement("button");
        bookButton.textContent = "Book";
        bookButton.classList.add("book-btn");
        bookButton.onclick = () => bookAppointment(docId, appointment);

        // Append elements to the appointment container
        appointmentDiv.appendChild(dateSpan);
        appointmentDiv.appendChild(timeSpan);
        appointmentDiv.appendChild(bookButton);///go to create 

        // Append the appointment container to the main container
        mainContainer.appendChild(appointmentDiv);
    });
    
  
  }

  function setBookingEventListener() {
    userTableBody
      .querySelectorAll("button[data-book-doc]")
      .forEach((button) => {
        const docID = button.getAttribute("data-book-doc");
        button.addEventListener("click", () => pickDoctor(docID));
      });
  }

  function generateDoctorList(doctorByExperties) { //renders the doctors
    const docRows = doctorByExperties
      .map((docInfo) => {
        const fullName = `${docInfo.docPersonalInfo.Fname} ${docInfo.docPersonalInfo.Lname}`;
        const expertise = `${expertiseMap[docInfo.expertise]}`;
        const location = `${locationsMap[docInfo.location]}`;
        const dateAvailable = `${docsAvailableAppointmentsMap[docInfo._id][0].date}`;
        
        return `
      <tr>
      <td>${dateAvailable}</td> 
      <td>${fullName}</td>
      <td>${expertise}</td>
      <td>${location}</td>
      <td><button data-book-doc="${docInfo._id}">choose doctor</button></td>
      </tr>`;
      })
      .join("");
    userTableBody.innerHTML = docRows;
  }

  async function obtainInfo() {
    console.log(choosenExpertiseId)
    doctorByExperties = await getDoctorByExperties(choosenExpertiseId); //gets doctors by expertise
    if (doctorByExperties.length==0){
      console.log("no doctors doctorByExperties")
      alert('Sorry we dont have any doctors availble in that expertise yet')
    }
    //gets closest location array (its an object apparently with "sortedLocationIds" that has
    //the array insde, we might have to change this in backend to return array immedietly vvvvvvvvvvvvvv
    closestDocsLocations = await getClosestLocations(choosenLocationId); 
    for (const { _id } of doctorByExperties) { //generates the map
      docsAvailableAppointmentsMap[_id] = await docsAvailbleAppointments(_id);
      console.log(docsAvailableAppointmentsMap[_id][0]);
      console.log(docsAvailableAppointmentsMap[_id][0].date); // Extracts date from the first item

    }

    generateDoctorList(doctorByExperties); 
    setBookingEventListener(); //add event listener to open the menu to see appointments for that doc
  }

  searchAppointsBtn.addEventListener("click", obtainInfo); //when search clicked this triggers


  function createAppintment(doctor, dateTime) {
    const data = {
      experties: doctor.Expertise,
      location: doctor,//doctor.location
      doctor: doctor.name,
      dateTime: dateTime,
      patient: user.name,
    };
  }
  // createAppintment()
}
