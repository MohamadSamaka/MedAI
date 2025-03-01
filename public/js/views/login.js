import { loadStyles } from "../helpers/stylesManager.js";
import { login } from "../api/authAPI.js";

export function render() {
  return `
      <div class="main-login-container">
      <!-- Left Side: Title and Description -->
      <div class="left-panel">
        <h1>MedicAI</h1>
        <p>
          Your trusted partner in medical AI solutions. Empowering healthcare
          with innovative technology for better outcomes.
        </p>
      </div>
      <!-- Right Side: Login Form -->
      <div class="right-panel">
        <div class="login-container">
          <h2>Enter to your case</h2>
          <form id="loginForm">
            <!-- Email Input -->
            <div class="form-group floating-container">
              <input type="email" id="id" name="id" placeholder=" " required />
              <label for="id">Email</label>
            </div>
            <!-- Password Input -->
            <div class="form-group floating-container">
              <input
                type="password"
                id="password"
                name="password"
                placeholder=" "
              />
              <label for="password">Password</label>
            </div>
            <!-- Enter Button -->
            <button type="submit" class="enter-btn">Login</button>
            <p id="message"></p>
            <br />
          </form>
        </div>
      </div>
    </div>

    `;
}

export function init(styles, params) {
  // document.querySelector("#submit-btn").addEventListener("click", submitForm)
  const loginForm = document.getElementById("loginForm");
  const messageEl = document.getElementById("message");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Reset message display
    messageEl.textContent = "";

    // Gather form data
    const email = document.getElementById("id").value;
    const password = document.getElementById("password").value;

    try {
      // Call the login function with credentials
      let temp_user = await login({ email, password });
      // If successful, display success message
      messageEl.textContent = "Login success";
      messageEl.style.color = "green";

      localStorage.setItem(
        "user_name",
        temp_user.Fname + " " + temp_user.Lname || "Not logged in"
      );

      const userName = localStorage.getItem("user_name");
      console.log("userNameEEEEEE=", userName);

      // Redirect after 1 second delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      // On error, display error message
      messageEl.textContent = "Invalid username/email or password!";
      messageEl.style.color = "red";
    }
  });

  loadStyles(styles);
}
