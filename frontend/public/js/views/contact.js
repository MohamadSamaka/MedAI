import { loadStyles } from "../helpers/stylesManager.js";

export function render() {
  return `
    <div class="info-container">
      <div class="info-box">
        <!-- You can replace the img src with an actual icon -->
        <!-- <img src="https://via.placeholder.com/50" alt="Office Icon" /> -->
        <i class="fa-solid fa-building icon-contact"></i>
        <h3>OUR MAIN OFFICE</h3>
        <p>SoHo 94 Broadway St<br />New York, NY 1001</p>
      </div>
      <div class="info-box">
        <!-- <img src="https://via.placeholder.com/50" alt="Phone Icon" /> -->
        <i class="fa-solid fa-phone icon-contact"></i>
        <h3>PHONE NUMBER</h3>
        <p>234-9876-5400<br />888-0123-4567 (Toll Free)</p>
      </div>
      <div class="info-box">
        <i class="fa-solid fa-fax icon-contact"></i>
        <!-- <img src="https://via.placeholder.com/50" alt="Fax Icon" /> -->
        <h3>FAX</h3>
        <p>1-234-567-8900</p>
      </div>
      <div class="info-box">
        <i class="fa-solid fa-envelope icon-contact"></i>
        <!-- <img src="https://via.placeholder.com/50" alt="Email Icon" /> -->
        <h3>EMAIL</h3>
        <p>hello@thetheme.com</p>
      </div>
    </div>

    <!-- Main Contact Section -->
    <div class="contact-section">
      <div class="contact-left">
        <h2>Contact info</h2>
        <p>
          Connect with us to learn more about our innovative AI bot integration
          solutions for hospitals. Whether you have questions, need support, or
          are interested in partnering, we're here to help streamline healthcare
          communication and service delivery. Reach out today to start the
          conversation!
        </p>
        <img src="/assets/imgs/logo_2.png" alt= />
      </div>
      <div class="contact-right">
        <form action="#" method="post">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter a valid email address"
          />

          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter your name"
          />

          <label for="message">Message</label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="Enter your message"
          ></textarea>

          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
    `;
}

export function init(styles, subloader, params) {
  loadStyles(styles);
}
