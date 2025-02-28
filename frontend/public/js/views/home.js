import { loadStyles } from "../helpers/stylesManager.js"
import { getUsers } from "../api/userAPI.js"

export function render() {
  return `
      <div class="gradient-wrapper">
        <div class="section-section1" id="section-section1">
        <div class="section-section1">
      <!-- LEFT COLUMN -->
      <div class="section1-container-left">
        <h2>Always with you</h2>
        <div class="rounded-container-ad">
          <p>
            <span>The AI bot</span>, an <span>expert in medical advice</span>,
            serves as a highly efficient and accessible healthcare companion.
            Patients use it for <span> instant, reliable </span> guidance on
            symptoms, treatment options, and preventive care, making it a
            trusted resource for those seeking prompt answers.
          </p>
          <p>
            This instant access to expert insights empowers patients to make
            <span> informed decisions</span> and take proactive steps in
            managing their health. <span> 24/7 availability</span> , ensuring
            that patients can seek help whenever needed, without the need for
            appointments or office visits. Ultimately, it offers convenience,
            <span>speed, and accuracy</span>, making healthcare more accessible
            to <span>everyone.</span>
          </p>
        </div>
      </div>

      <!-- MIDDLE COLUMN -->
      <div class="section1-container-middle">
        <h2>For you around the clock 24/7</h2>
        <div class="middle-items">
          <!-- Each item is one of the 6 sections -->
          <div class="middle-item">
            <div class="logo-circle">
              <i
                class="fa-solid fa-virus icon-middle"
                style="color: #285c42"
              ></i>
            </div>
            <p>Against the flu</p>
          </div>
          <div class="middle-item">
            <div class="logo-circle">
              <i
                class="fa-solid fa-person icon-middle"
                style="color: #c5a54c"
              ></i>
            </div>
            <p>Mental Health Center</p>
          </div>
          <div class="middle-item">
            <div class="logo-circle">
              <i
                class="fa-solid fa-file-waveform icon-middle"
                style="color: #5b5dd3"
              ></i>
            </div>
            <p>Medications and Prescriptions</p>
          </div>
          <div class="middle-item">
            <div class="logo-circle">
              <i
                class="fa-solid fa-user-doctor icon-middle"
                style="color: #a631aa"
              ></i>
            </div>
            <p>Direct Access: Doctors Online</p>
          </div>
          <div class="middle-item">
            <div class="logo-circle">
              <i
                class="fa-solid fa-house-chimney-user icon-middle"
                style="color: #b83455"
              ></i>
            </div>
            <p>Home Ultrasound</p>
          </div>
          <div class="middle-item">
            <div class="logo-circle">
              <i
                class="fa-solid fa-hand-holding-droplet icon-middle"
                style="color: #1ea1b8"
              ></i>
            </div>
            <p>Rehabilitation</p>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="section1-container-right">
        <h2>Enter your Personal Area</h2>
        <a href="../../pages/dashboard/patient/patient.html"
          ><div class="login-container">
            <img src="/assets/imgs/p4.png" alt="" / class="personal-image">
          </div>
        </a>
      </div>
    </div>
    </div>
      </div>
      <div class="section-section2" id="section-section2">
      <section class="featured-section">
      <!-- Main Section Title -->
      <h2 class="section-title">MedicAI - Simply be healthy</h2>

      <!-- Row of 5 Items -->
      <div class="items-row">
        <!-- Item 1 -->
        <div class="item">
          <h4 class="item-title">Lab</h4>
          <img
            src="/assets/imgs/img-s2-1.jpg"
            alt="Item 1"
            class="item-image"
          />
          <p class="item-description">medical tests</p>
        </div>

        <!-- Item 2 -->
        <div class="item">
          <h4 class="item-title">Surgery Unit</h4>
          <img
            src="/assets/imgs/img-s2-2.jpg"
            alt="Item 2"
            class="item-image"
          />
          <p class="item-description">staffed by skilled surgeons</p>
        </div>

        <!-- Item 3 -->
        <div class="item">
          <h4 class="item-title">24/7 Access</h4>
          <img
            src="/assets/imgs/img-s2-3.jpg"
            alt="Item 3"
            class="item-image"
          />
          <p class="item-description">help anytime, without waiting</p>
        </div>

        <!-- Item 4 -->
        <div class="item">
          <h4 class="item-title">Medical procedures</h4>
          <img src="/assets/imgs/img-s2-4.jpg"" alt="Item 4"
          class="item-image" />
          <p class="item-description">prevent health issues</p>
        </div>

        <!-- Item 5 -->
        <div class="item">
          <h4 class="item-title">immediate feedback</h4>
          <img
            src="/assets/imgs/img-s2-5.jpg"
            alt="Item 5"
            class="item-image"
          />
          <p class="item-description">quicker decision-making and treatment</p>
        </div>
      </div>
    </section>
      </div>
      </div>
      <div id="section-section4">
       <div class="s4-container">
      <!-- Title -->
      <div class="s4-title">Start chatting with medicAI bot now!</div>
      <!-- Row with 3 sections -->
      <div class="s4-row">
        <!-- Section 1 -->
        <div class="s4-section">
          <div class="s4-default-content">
            <!-- <i class="fa-regular fa-folder-open s4"></i> -->
            <div class="s4-description">Free</div>
          </div>
          <div class="s4-hover-content">
            <!-- <button class="s4-enter-button">Enter</button> -->
          </div>
        </div>
        <!-- Section 2 -->
        <div class="s4-section">
          <div class="s4-default-content">
            <!-- <i class="fa-regular fa-folder-open s4"></i> -->
            <!-- <i
              class="fa-solid fa-calendar-check"
              style="margin-right: 10px"
            ></i> -->
            <div class="s4-description">Fast</div>
          </div>
          <div class="s4-hover-content">
            <!-- <button class="s4-enter-button">Enter</button> -->
          </div>
        </div>
        <!-- Section 3 -->
        <div class="s4-section">
          <div class="s4-default-content">
            <!-- <i class="fa-regular fa-folder-open s4"></i> -->
            <div class="s4-description">Expert</div>
          </div>
          <div class="s4-hover-content">
            <!-- <button class="s4-enter-button">Enter</button> -->
          </div>
        </div>
      </div>
    </div>
      </div>
      <div id="section-section5">
       <div class="s5-container2">
      <!-- Section 1 (first row: image left) -->
      <div class="s5-section2 s5-first-row">
        <div class="s5-img-side">
            <img src="/assets/imgs/img-s5.jpg" alt="Image 3" />
        </div>
        <div class="s5-text-side">
          <!-- <div class="s5-small-title">Small Title 1</div> -->
          <div class="s5-large-title">Medical App</div>
          <div class="s5-description">
            A medical app designed to provide quick, reliable health advice and information.
            Offers personalized health recommendations based on user input and symptoms.
          </div>
        </div>
      </div>

      <!-- Section 2 (first row: image left) -->
      <div class="s5-section2 s5-first-row">
        <div class="s5-img-side">
            <img src="/assets/imgs/d1.png" alt="Image 3" />
        </div>
        <div class="s5-text-side">
          <!-- <div class="s5-small-title">Small Title 2</div> -->
          <div class="s5-large-title">Doctor Connectivity</div>
          <div class="s5-description">
            New hardware solutions enabling seamless communication between doctors and patients.
            Enhances remote consultations with high-quality video and real-time data sharing.
          </div>
        </div>
      </div>

      <!-- Section 3 (second row: image right) -->
      <div class="s5-section2 s5-second-row">
        <div class="s5-text-side">
          <!-- <div class="s5-small-title">Small Title 3</div> -->
          <div class="s5-large-title">Test Your Body Health</div>
          <div class="s5-description">
            A platform that helps you monitor and assess your overall health status.
            Provides easy-to-use tools for tracking vital signs, fitness, and wellness levels.
          </div>
        </div>
        <div class="s5-img-side">
          <img src="/assets/imgs/d2.png" alt="Image 3" />
        </div>
      </div>

      <!-- Section 4 (second row: image right) -->
      <div class="s5-section2 s5-second-row">
        <div class="s5-text-side">
          <!-- <div class="s5-small-title">Small Title 4</div> -->
          <div class="s5-large-title">Ask Expert Doctors</div>
          <div class="s5-description">
            A service that connects you with qualified medical professionals for expert advice.
            Get answers to health concerns quickly, without waiting for an in-person visit.
          </div>
        </div>
        <div class="s5-img-side">
            <img src="/assets/imgs/d3.png" alt="Image 3" />
      </div>
    </div>
      </div>
      <div id="section-section6">
      <div class="s6-container">
      <!-- Title -->
      <div class="s6-title">
        <h1>Title 1</h1>
        <h2>desciption sadasdasdasda</h2>
      </div>

      <!-- Row with 4 sections -->
      <div class="s6-row">
        <!-- Section 1 -->
        <div class="s6-section">
          <div class="s6-default-content">
            <i class="fa-regular fa-folder-open s6"></i>
            <div class="s6-description">Short description 1</div>
          </div>
          <div class="s6-hover-content">
            <p>dsadsasasd</p>
            <button class="s6-enter-button">Enter</button>
          </div>
        </div>
        <!-- Section 2 -->
        <div class="s6-section">
          <div class="s6-default-content">
            <i class="fa-regular fa-folder-open s6"></i>
            <div class="s6-description">Short description 2</div>
          </div>
          <div class="s6-hover-content">
            <p>dsadsasasd</p>
            <button class="s6-enter-button">Enter</button>
          </div>
        </div>
        <!-- Section 3 -->
        <div class="s6-section">
          <div class="s6-default-content">
            <i class="fa-regular fa-folder-open s6"></i>
            <div class="s6-description">Short description 3</div>
          </div>
          <div class="s6-hover-content">
            <p>dsadsasasd</p>
            <button class="s6-enter-button">Enter</button>
          </div>
        </div>
        <!-- Section 4 -->
        <div class="s6-section">
          <div class="s6-default-content">
            <i class="fa-regular fa-folder-open s6"></i>
            <div class="s6-description">Short description 4</div>
          </div>
          <div class="s6-hover-content">
            <p>dsadsasasd</p>
            <button class="s6-enter-button">Enter</button>
          </div>
        </div>
      </div>
    </div>
      </div>
      <div id="section-section7">
      <div class="s7-container">
      <!-- Title -->
      <div class="s7-title">
        <h1>Where We Operate</h1>
      </div>

      <!-- Row with 4 sections -->
      <div class="s7-row">
        <!-- Section 1 -->
        <div class="s7-section">
          <div class="s7-default-content">
            <div class="s7-description">Haifa</div>
          </div>
          <div
            class="s7-hover-content"
            style="background: url(/assets/imgs/h.png)"
          >
            <p></p>
          </div>
        </div>
        <!-- Section 2 -->
        <div class="s7-section">
          <div class="s7-default-content">
            <div class="s7-description">Jarusalem</div>
          </div>
          <div
            class="s7-hover-content"
            style="background: url(/assets/imgs/j.png)"
          >
            <p></p>
          </div>
        </div>
        <!-- Section 3 -->
        <div class="s7-section">
          <div class="s7-default-content">
            <div class="s7-description">Tel-Aviv</div>
          </div>
          <div
            class="s7-hover-content"
            style="background: url(/assets/imgs/l.png)"
          >
            <p></p>
          </div>
        </div>
        <!-- Section 4 -->
        <div class="s7-section">
          <div class="s7-default-content">
            <div class="s7-description">Keriat shmona</div>
          </div>
          <div
            class="s7-hover-content"
            style="background: url(/assets/imgs/kr.png)"
          >
            <p></p>
          </div>
        </div>

        <div class="s7-section">
          <div class="s7-default-content">
            <div class="s7-description">Afula</div>
          </div>
          <div
            class="s7-hover-content"
            style="background: url(/assets/imgs/a.png)"
          >
            <p></p>
          </div>
        </div>
      </div>

      <!-- Row with 4 sections -->
      <div class="s7-row-2">
        <!-- Section 1 -->
        <div class="s7-section-2">
          <div class="s7-default-content">
            <div class="s7-description">Tberia</div>
          </div>
          <div
            class="s7-hover-content"
            style="background: url(/assets/imgs/t.png)"
          >
            <p></p>
          </div>
        </div>

        <div class="s7-section-2">
          <div class="s7-default-content">
            <div class="s7-description">Zarzir</div>
          </div>
          <div
            class="s7-hover-content"
            style="background: url(/assets/imgs/s.png)"
          >
            <p></p>
          </div>
        </div>

        <div class="s7-section-2">
          <div class="s7-default-content">
            <div class="s7-description">Elat</div>
          </div>
          <div
            class="s7-hover-content"
            style="background: url(/assets/imgs/e.png)"
          >
            <p></p>
          </div>
        </div>

        <div class="s7-section-2">
          <div class="s7-default-content">
            <div class="s7-description">Kfar sava</div>
          </div>
          <div
            class="s7-hover-content"
            style="background: url(/assets/imgs/kr.png)"
          >
            <p></p>
          </div>
        </div>
      </div>
    </div>
      </div>
  `;
}

// This function attaches event listeners and any view-specific logic.
export function init(styles, params) {
  loadStyles(styles)

  async function handleGettingUsers() {
    try{
      const res = await getUsers()
      alert(`succes: ${JSON.stringify(res.data)}`, )
    }catch(err){
      const errmssg = err.response.data.error
      alert("error: " + errmssg)
    }
  }

  // Attach event listener to the button after the markup is in the DOM.
  const btn = document.getElementById('fetchDataBtn');
  if (btn) {
    btn.addEventListener('click',  handleGettingUsers);
  }
}

