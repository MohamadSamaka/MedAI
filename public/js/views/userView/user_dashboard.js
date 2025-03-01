//  ===== same as doctor_dashboard.js =====
// const fakeAppointments = [
//   {
//     date: "2025-04-15",
//     time: "10:00 AM",
//     location: "Room 101",
//     doctor: "Dr. Smith",
//     description: "General check-up appointment.",
//   },

import { loadStyles } from "../helpers/stylesManager.js";

export function render() {
  return `


    <div class="container">
      <!-- Left Sidebar (Navigation) -->
      <div class="container-left">
        <nav class="navbar">
          <ul id="navbarList">
            <li>
              <a href="#" data-section="upcomingAppointmentsSection">
                <i
                  class="fa-solid fa-calendar-check"
                  style="margin-right: 10px"
                ></i>
                Upcoming Appointments
              </a>
            </li>
            <li>
              <a href="#" data-section="chatSection">
                <i class="fa-solid fa-comments" style="margin-right: 10px"></i>
                Chatbox &amp; Communication
              </a>
            </li>
            <li>
              <a href="#" data-section="profileSection">
                <i class="fa-solid fa-user" style="margin-right: 10px"></i>
                Personal Profile &amp; Medical Information
              </a>
            </li>
            <li>
              <a href="#" data-section="appointmentSection">
                <i class="fa-solid fa-search" style="margin-right: 10px"></i>
                Make an Appointment
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Right Content Area -->
      <div class="container-right">
        <div id="patientDashboard" class="dashboard active">
          <h1>Personal Area</h1>

          <!-- Upcoming Appointments Section -->
          <div id="upcomingAppointmentsSection" class="content-section">
            <div class="dashboard-section">
              <div class="section-icon">
                <i class="fa-solid fa-calendar-check"></i>
              </div>
              <div class="section-title">Upcoming Appointments</div>
              <div class="section-content">
                <ul>
                  <li>
                    See a list of all your future appointments including date,
                    time, and location.
                  </li>
                  <li>
                    Click an appointment to view details or cancel if needed.
                  </li>
                </ul>
              </div>
            </div>
            <!-- Trigger to toggle appointment details -->
            <div
              class="dashboard-section show-appointments-trigger"
              id="showAppointmentsTrigger"
            >
              <h2>Show Appointments</h2>
            </div>
          </div>

          <!-- Chatbox & Communication Section -->
          <div id="chatSection" class="content-section" style="display: none">
            <!-- Existing Chatbox Content -->
            <div class="dashboard-section">
              <div class="section-icon">
                <i class="fa-solid fa-comments"></i>
              </div>
              <div class="section-title">Chatbox & Communication</div>
              <div class="section-content">
                <ul>
                  <li>
                    Access your chat history with doctors for quick reference.
                  </li>
                  <li>
                    Initiate a chat with an AI assistant for preliminary advice.
                  </li>
                  <li>
                    Start a live chat with available doctors during working
                    hours.
                  </li>
                </ul>
              </div>
            </div>

            <!-- New Sub-Section: Start Chatting with AI Bot -->
            <div
              id="aiChatSection"
              class="dashboard-section"
              onclick="window.location.href='http://localhost:3000/AIchat';"
            >
              <div
                class="section-header"
                style="display: flex; align-items: center"
              >
                <div
                  class="section-icon"
                  style="font-size: 2em; margin-right: 10px"
                >
                  <i class="fa-solid fa-comment-nodes"></i>
                </div>
                <div class="section-title" style="font-size: 1.8em">
                  <h1>Start Chatting With AI Bot Now!</h1>
                </div>
              </div>
              <div class="section-content">
                <ul style="list-style: none;">
                  <li style="display: flex; align-items: center;">
                    <div class="circle-bg" style="margin-right: 10px;">
                      <i class="fa-solid fa-check check-icon" style="color: rgb(255, 255, 255);"></i>
                    </div>
                    <strong style="margin-left: 5px;">Medical Consultation:</strong> Get expert advice on your health concerns instantly.
                  </li>
                  <li style="display: flex; align-items: center;">
                    <div class="circle-bg" style="margin-right: 10px;">
                      <i class="fa-solid fa-check check-icon" style="color: rgb(255, 255, 255);"></i>
                    </div>
                    <strong>Cutting-Edge Technology:</strong> Our AI leverages the latest advancements in medical technology.
                  </li>
                  <li style="display: flex; align-items: center;">
                    <div class="circle-bg" style="margin-right: 10px;">
                      <i class="fa-solid fa-check check-icon" style="color: rgb(255, 255, 255);"></i>
                    </div>
                    <strong>Medication Management:</strong> Organize your prescriptions and dosage schedules effortlessly.
                  </li>
                  <li style="display: flex; align-items: center;">
                    <div class="circle-bg" style="margin-right: 10px;">
                      <i class="fa-solid fa-check check-icon" style="color: rgb(255, 255, 255);"></i>
                    </div>
                    <strong>Health Records:</strong> Securely access and update your medical history and test results.
                  </li>
                  <li style="display: flex; align-items: center;">
                    <div class="circle-bg" style="margin-right: 10px;">
                      <i class="fa-solid fa-check check-icon" style="color: rgb(255, 255, 255);"></i>
                    </div>
                    <strong>Secure Communication:</strong> Enjoy private, encrypted conversations exclusively with your AI bot.
                  </li>
                  <li style="display: flex; align-items: center;">
                    <div class="circle-bg" style="margin-right: 10px;">
                      <i class="fa-solid fa-check check-icon" style="color: rgb(255, 255, 255);"></i>
                    </div>
                    <strong>Health Insights:</strong> Receive personalized tips and trends to enhance your well-being.
                  </li>
                  <li style="display: flex; align-items: center;">
                    <div class="circle-bg" style="margin-right: 10px;">
                      <i class="fa-solid fa-check check-icon" style="color: rgb(255, 255, 255);"></i>
                    </div>
                    <strong>Emergency Support:</strong> 24/7 immediate assistance during critical moments.
                  </li>
                  <li style="display: flex; align-items: center;">
                    <div class="circle-bg" style="margin-right: 10px;">
                      <i class="fa-solid fa-check check-icon" style="color: rgb(255, 255, 255);"></i>
                    </div>
                    <strong>Expert Medical Knowledge:</strong> Powered by AI trained on extensive medical expertise.
                  </li>
                  <li style="display: flex; align-items: center;">
                    <div class="circle-bg" style="margin-right: 10px;">
                      <i class="fa-solid fa-check check-icon" style="color: rgb(255, 255, 255);"></i>
                    </div>
                    <strong>Instant Replies:</strong> Get prompt responses without waiting for hours or days.
                  </li>
                  <li style="display: flex; align-items: center;">
                    <div class="circle-bg" style="margin-right: 10px;">
                      <i class="fa-solid fa-check check-icon" style="color: rgb(255, 255, 255);"></i>
                    </div>
                    <strong>Trusted by Top Institutions:</strong> Utilized by some of the largest medical institutions in Israel.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Personal Profile & Medical Information Section -->
          <div
            id="profileSection"
            class="content-section"
            style="display: none"
          >
            <div class="dashboard-section">
              <div class="section-icon">
                <i class="fa-solid fa-user"></i>
              </div>
              <div class="section-title">
                Personal Profile &amp; Medical Information
              </div>
              <div class="section-content">
                <ul>
                  <li>
                    Review and update your personal details including contact
                    info and address.
                  </li>
                  <li>
                    Check your current medications and diagnostics information.
                  </li>
                  <li>
                    View general health statistics such as weight, height, and
                    more.
                  </li>
                </ul>
              </div>
            </div>

            <!-- Profile Details Sub-Section (no hover) -->
            <div id="profileDetails" class="dashboard-section no-hover">
              <div
                class="section-header"
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <div class="section-title">Profile Details</div>
                <div>
                  <button class="edit-button" onclick="editProfileDetails()">
                    Edit
                  </button>
                  <button class="save-button" onclick="saveProfileDetails()">
                    Save
                  </button>
                </div>
              </div>
              <div class="section-content">
                <p>
                  <strong>Name:</strong> <span id="profileName">John Doe</span>
                </p>
                <p>
                  <strong>Email:</strong>
                  <span id="profileEmail">john.doe@example.com</span>
                </p>
                <p>
                  <strong>Phone:</strong>
                  <span id="profilePhone">(555) 123-4567</span>
                </p>
                <p>
                  <strong>Address:</strong>
                  <span id="profileAddress">123 Main St, City, Country</span>
                </p>
              </div>
            </div>

            <!-- Medical Information Sub-Section (no hover) -->
            <div id="medicalInfo" class="dashboard-section no-hover">
              <div
                class="section-header"
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <div class="section-title">Medical Information</div>
                <div>
                  <button class="edit-button" onclick="editMedicalInfo()">
                    Edit
                  </button>
                  <button class="save-button" onclick="saveMedicalInfo()">
                    Save
                  </button>
                </div>
              </div>
              <div class="section-content">
                <p>
                  <strong>Medications:</strong>
                  <span id="medications">Aspirin, Ibuprofen</span>
                </p>
                <p>
                  <strong>Allergies:</strong> <span id="allergies">None</span>
                </p>
                <p>
                  <strong>Last Checkup:</strong>
                  <span id="lastCheckup">2025-03-15</span>
                </p>
                <p><strong>Height:</strong> <span id="height">5'10"</span></p>
                <p><strong>Weight:</strong> <span id="weight">160 lbs</span></p>
              </div>
            </div>

            <!-- New Empty Section for Future Content -->
            <div id="futureSection" class="dashboard-section">
              <!-- <div class="section-title">Additional Information</div> -->
              <div class="section-content">
                <!-- Empty for now; content will be added later -->
              </div>
            </div>
          </div>

       
          <!-- Make an Appointment Section -->
          <div
            id="appointmentSection"
            class="content-section"
            style="display: none"
          >
            <div class="dashboard-section">
              <div class="section-icon">
                <i class="fa-solid fa-search"></i>
              </div>
              <div class="section-title">Make an Appointment</div>
              <div class="section-content">
                <ul>
                  <li>
                    Filter by medical expertise (e.g., cardiology, neurology,
                    etc.).
                  </li>
                  <li>
                    Search for the closest available specialist based on your
                    address.
                  </li>
                  <li>
                    Click on a specialist to view detailed information before
                    booking.
                  </li>
                </ul>
              </div>

                          <!-- Load the translator script -->

              <a href=""><button>See Appointments</button>
            </div></a>

    
      </div>
      
    </div>
  </div>
</div>
    `;
}

export function init(styles, params) {
  console.log(params);
  loadStyles(styles);

  // Fake data for appointments in Patient Dashboard
  const fakeAppointments = [
    {
      date: "2025-04-15",
      time: "10:00 AM",
      location: "Room 101",
      doctor: "Dr. Smith",
      description: "General check-up appointment.",
    },
    {
      date: "2025-04-20",
      time: "2:30 PM",
      location: "Room 202",
      doctor: "Dr. Johnson",
      description: "Follow-up consultation regarding blood test results.",
    },
  ];

  // Function to hide all content sections
  function hideAllSections() {
    const sections = document.querySelectorAll(".content-section");
    sections.forEach((section) => {
      section.style.display = "none";
    });
  }

  // Function to show a specific content section by its ID
  function showSection(sectionId) {
    hideAllSections();
    const section = document.getElementById(sectionId);
    if (section) {
      section.style.display = "block";
    }
    // Remove any dynamic appointments details if switching away
    const dynamicAppts = document.getElementById("appointmentsSection");
    if (dynamicAppts) {
      dynamicAppts.remove();
      const trigger = document.getElementById("showAppointmentsTrigger");
      if (trigger) {
        trigger.innerHTML = "<h2>Show Appointments</h2>";
      }
    }
  }

  // Set up sidebar navigation event listeners
  const navLinks = document.querySelectorAll("#navbarList a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = this.getAttribute("data-section");
      showSection(sectionId);
    });
  });

  // Toggle the display of the appointment details inside Upcoming Appointments
  const showAppointmentsTrigger = document.getElementById(
    "showAppointmentsTrigger"
  );
  if (showAppointmentsTrigger) {
    showAppointmentsTrigger.addEventListener("click", function () {
      let appointmentsSection = document.getElementById("appointmentsSection");
      if (appointmentsSection) {
        // If already visible, remove it and update trigger text
        appointmentsSection.remove();
        showAppointmentsTrigger.innerHTML = "<h2>Show Appointments</h2>";
      } else {
        // Create the appointments details section
        appointmentsSection = document.createElement("div");
        appointmentsSection.setAttribute("id", "appointmentsSection");
        appointmentsSection.className =
          "dashboard-section appointments-section";

        // Optional header for clarity
        let header = document.createElement("h2");
        header.textContent = "Upcoming Appointments Details";
        appointmentsSection.appendChild(header);

        // Populate with fake appointment data
        fakeAppointments.forEach((appt) => {
          const item = document.createElement("div");
          item.className = "appointment-item";
          item.innerHTML = `
            <p><strong>Date:</strong> ${appt.date}</p>
            <p><strong>Time:</strong> ${appt.time}</p>
            <p><strong>Location:</strong> ${appt.location}</p>
            <p><strong>Doctor:</strong> ${appt.doctor}</p>
            <p><strong>Description:</strong> ${appt.description}</p>
          `;
          // Create Cancel Appointment button
          const cancelButton = document.createElement("button");
          cancelButton.textContent = "Cancel Appointment";
          cancelButton.addEventListener("click", function () {
            item.style.transition = "opacity 0.5s";
            item.style.opacity = 0;
            setTimeout(() => {
              item.remove();
            }, 500);
          });
          item.appendChild(cancelButton);
          appointmentsSection.appendChild(item);
        });

        // Insert the appointments details section right after the trigger
        showAppointmentsTrigger.parentNode.insertBefore(
          appointmentsSection,
          showAppointmentsTrigger.nextSibling
        );
        // Update trigger text
        showAppointmentsTrigger.innerHTML = "<h2>Hide Appointments</h2>";
      }
    });
  }

  function editProfileDetails() {
    // Enable editing for profile details fields
    let fields = [
      "profileName",
      "profileEmail",
      "profilePhone",
      "profileAddress",
    ];
    fields.forEach(function (id) {
      let element = document.getElementById(id);
      if (element) {
        element.contentEditable = "true";
        element.style.border = "1px solid #ccc"; // Visual cue that the field is editable
      }
    });
  }

  function saveProfileDetails() {
    // Disable editing for profile details fields and "save" the data
    let fields = [
      "profileName",
      "profileEmail",
      "profilePhone",
      "profileAddress",
    ];
    fields.forEach(function (id) {
      let element = document.getElementById(id);
      if (element) {
        element.contentEditable = "false";
        element.style.border = "none";
      }
    });
    alert("Profile details saved!");
  }

  function editMedicalInfo() {
    // Enable editing for medical information fields
    let fields = [
      "medications",
      "allergies",
      "lastCheckup",
      "height",
      "weight",
    ];
    fields.forEach(function (id) {
      let element = document.getElementById(id);
      if (element) {
        element.contentEditable = "true";
        element.style.border = "1px solid #ccc";
      }
    });
  }

  function saveMedicalInfo() {
    // Disable editing for medical information fields and "save" the data
    let fields = [
      "medications",
      "allergies",
      "lastCheckup",
      "height",
      "weight",
    ];
    fields.forEach(function (id) {
      let element = document.getElementById(id);
      if (element) {
        element.contentEditable = "false";
        element.style.border = "none";
      }
    });
    alert("Medical information saved!");
  }

  // // Updated fake specialists data: two specialists per expertise
  // var fakeSpecialists = [
  //   // Cardiology Specialists
  //   {
  //     id: 1,
  //     name: "Dr. Cardio",
  //     expertise: "cardiology",
  //     address: "123 Heart St",
  //     details: "Expert in heart diseases with 15 years of experience.",
  //   },
  //   {
  //     id: 5,
  //     name: "Dr. Heart",
  //     expertise: "cardiology",
  //     address: "222 Heart Ln",
  //     details:
  //       "Cardiology expert with advanced training in interventional procedures.",
  //   },
  //   // Neurology Specialists
  //   {
  //     id: 2,
  //     name: "Dr. Neuro",
  //     expertise: "neurology",
  //     address: "456 Brain Ave",
  //     details:
  //       "Specialist in neurological disorders with an advanced research background.",
  //   },
  //   {
  //     id: 6,
  //     name: "Dr. Brain",
  //     expertise: "neurology",
  //     address: "789 Neuro St",
  //     details:
  //       "Leading neurologist known for innovative treatments in neurodegenerative diseases.",
  //   },
  //   // Dermatology Specialists
  //   {
  //     id: 3,
  //     name: "Dr. Derm",
  //     expertise: "dermatology",
  //     address: "789 Skin Blvd",
  //     details: "Experienced dermatologist focused on skin care and treatment.",
  //   },
  //   {
  //     id: 7,
  //     name: "Dr. Skin",
  //     expertise: "dermatology",
  //     address: "321 Derm Ave",
  //     details:
  //       "Dermatologist with expertise in cosmetic dermatology and skin cancer prevention.",
  //   },
  //   // Pediatrics Specialists
  //   {
  //     id: 4,
  //     name: "Dr. Child",
  //     expertise: "pediatrics",
  //     address: "101 Kid Rd",
  //     details: "Pediatrician dedicated to child health and wellness.",
  //   },
  //   {
  //     id: 8,
  //     name: "Dr. Kid",
  //     expertise: "pediatrics",
  //     address: "555 Child Care Rd",
  //     details: "Pediatric specialist committed to comprehensive child care.",
  //   },
  // ];

  // function populateSpecialistList(specialists) {
  //   const container = document.getElementById("specialistsContainer");
  //   container.innerHTML = "";
  //   if (specialists.length === 0) {
  //     container.innerHTML = "<p>No specialists found.</p>";
  //   } else {
  //     specialists.forEach(function (spec) {
  //       const specDiv = document.createElement("div");
  //       specDiv.className = "specialist-item";
  //       specDiv.style.cursor = "pointer";
  //       specDiv.style.border = "1px solid #ddd";
  //       specDiv.style.padding = "10px";
  //       specDiv.style.marginBottom = "10px";
  //       specDiv.innerHTML = `<p><strong>${spec.name}</strong> - ${spec.expertise} - ${spec.address}</p>`;
  //       specDiv.addEventListener("click", function () {
  //         showSpecialistDetails(spec);
  //       });
  //       container.appendChild(specDiv);
  //     });
  //   }
  // }

  // // Combined function to apply both filters
  // function applyFilters() {
  //   const expertise = document.getElementById("expertiseSelect").value;
  //   const addressQuery = document
  //     .getElementById("addressInput")
  //     .value.toLowerCase();
  //   const filtered = fakeSpecialists.filter(function (spec) {
  //     const matchesExpertise = expertise === "" || spec.expertise === expertise;
  //     const matchesAddress =
  //       addressQuery === "" || spec.address.toLowerCase().includes(addressQuery);
  //     return matchesExpertise && matchesAddress;
  //   });
  //   populateSpecialistList(filtered);
  // }

  // function showSpecialistDetails(spec) {
  //   const detailsSection = document.getElementById("specialistDetails");
  //   const detailsContent = document.getElementById("specialistDetailsContent");
  //   detailsContent.innerHTML = `
  //       <p><strong>Name:</strong> ${spec.name}</p>
  //       <p><strong>Expertise:</strong> ${spec.expertise}</p>
  //       <p><strong>Address:</strong> ${spec.address}</p>
  //       <p><strong>Details:</strong> ${spec.details}</p>
  //     `;
  //   detailsSection.style.display = "block";
  // }

  // function closeSpecialistDetails() {
  //   document.getElementById("specialistDetails").style.display = "none";

  // }
}
