// Function to load a specific topbar version
function loadPart(version, containerSelector) {
  const container = document.querySelector(containerSelector);

  // Fetch the HTML content

  let js_file, html_file, css_file;
  //   if(temp_path === "components"){
  html_file = `./js/components/${version}/${version}.html`;
  css_file = `./js/components/${version}/${version}.css`;
  js_file = `./js/components/${version}/${version}.js`;
  //   }

  //   fetch(`./js/components/${version}/${version}.html`)
  fetch(html_file)
    .then((response) => response.text())
    .then((data) => {
      container.innerHTML = data;

      // Load the CSS for the topbar
      const link = document.createElement("link");
      link.rel = "stylesheet";
      //   link.href = `./js/components/${version}/${version}.css`;
      link.href = css_file;
      document.head.appendChild(link);

      // Load the JavaScript for the topbar
      const script = document.createElement("script");
      //   script.src = `./js/components/${version}/${version}.js`;
      ("");
      console.log("script ==", script);
      script.src = js_file;
      document.body.appendChild(script);
    })
    .catch((err) => console.error("Error loading topbar:", err));
}

// Function to load a specific topbar version
function loadDashboard(version, containerSelector) {
  const container = document.querySelector(containerSelector);

  // Fetch the HTML content

  let js_file, html_file, css_file;
  //   if(temp_path === "components"){
  html_file = `./js/components/${version}/${version}.html`;
  css_file = `./js/components/${version}/${version}.css`;
  js_file = `./js/components/${version}/${version}.js`;
  //   }

  //   fetch(`./js/components/${version}/${version}.html`)
  fetch(html_file)
    .then((response) => response.text())
    .then((data) => {
      container.innerHTML = data;

      // Load the CSS for the topbar
      const link = document.createElement("link");
      link.rel = "stylesheet";
      //   link.href = `./js/components/${version}/${version}.css`;
      link.href = css_file;
      document.head.appendChild(link);

      // Load the JavaScript for the topbar
      const script = document.createElement("script");
      //   script.src = `./js/components/${version}/${version}.js`;
      script.src = js_file;
      document.body.appendChild(script);
    })
    .catch((err) => console.error("Error loading topbar:", err));
}

// Function to dynamically load a JS script as a module and verify a target element exists after loading
function loadScript(scriptPath, targetElementId, typeLoad = "id") {
  console.log(`Loading script: ${scriptPath}`);
  const script = document.createElement("script");
  script.src = scriptPath;
  script.type = "module";
  script.async = true;

  script.onload = function () {
    console.log(`Script ${scriptPath} loaded.`);
    let element;
    if (typeLoad === "id") element = document.getElementById(targetElementId);
    else {
      // LOAD BY CLASS
      element = document.querySelector("." + targetElementId);
    }
    if (element) {
      console.log(`Element with  "${targetElementId}" found.`);
      // Example: change background color to verify the script has run
      element.style.backgroundColor = "lightblue";
    } else {
      console.error(`Element  "${targetElementId}" not found.`);
    }
  };

  script.onerror = function () {
    console.error(`Error loading script: ${scriptPath}`);
  };

  document.body.appendChild(script);
}

// Run once the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded event fired.");

  setTimeout(function () {
    const page = window.location.pathname;

    if (page === "/") {
      // HOME PAGE
      loadPart("topbar", ".topbar");
      loadPart("second-topbar", ".second-topbar");
      loadScript(
        "./js/components/main_sections/s4.js",
        "section-section4",
        "id"
      );
      import_html("./js/components/footer.html", "footer-main"); //  footer
    } else {
      // Pages with topar and footer
      if (["/about", "/contact", "/faq", "/services"].includes(page)) {
        loadPart("topbar", ".topbar");
        import_html("./js/components/footer.html", "footer-main"); //  footer
      }

      if (["/admin_dashboard"].includes(page)) {
        console.log("subbarr---");
        loadPart("topbar-sub", ".topbar");
        import_html("./js/components/footer.html", "footer-main"); //  footer
        // loadScript("./js/components/topbar-sub/topbar-sub.js", "t2", "id");
        // add js functionality
      }
    }
  }, 3000); // 1000 milliseconds = 1 second
});

// ----- helper function to import HTML -------------
function import_html(path, name) {
  fetch(path)
    .then((response) => response.text())
    .then((html) => {
      let t = document.getElementById(name);
      console.log("t ==", t);
      document.getElementById(name).innerHTML = html;
    });
}

// Update date, time, and greeting in real-time
function updateTime() {
  var now = new Date();
  var day = now.getDate();
  var month = now.getMonth() + 1;
  var year = now.getFullYear();
  var hours = now.getHours();
  var minutes = now.getMinutes();

  // Pad single digits with a leading zero
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Format the date as DD.MM.YYYY | HH:MM
  var formattedDate =
    day + "." + month + "." + year + " | " + hours + ":" + minutes;
  document.getElementById("title-date").innerText = formattedDate;

  // Set greeting based on current hour
  var greeting = "";
  if (hours >= 5 && hours < 12) {
    greeting = "Good Morning";
  } else if (hours >= 12 && hours < 17) {
    greeting = "Good Afternoon";
  } else if (hours >= 17 && hours < 21) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }
  document.getElementById("title-time").innerText = greeting;
}

// Initial update and then update every second

setTimeout(function () {
  let r1 = document.getElementById("profie-tab-title"); // for subbar
  let r2 = document.getElementById("user-name"); // for topbar

  console.log("r1 = ", r1);
  console.log("r2 = ", r2);

  // set current user name in subbar
  if (r1 !== null) {
    display_username("---", "profie-tab-title");
  }

  // set current user name in topbar
  if (r2 !== null) {
    display_username("---", "user-name");
  }

  // console.log("r1sadsdadsadsasa ==", r1);
  updateTime(); // set time

  display_username(user_name, id_element); // display name in topbar
  setInterval(updateTime, 1000);
}, 4000);

function display_username(user_name, id_element) {
  // Function 1: Set "user_name" in local storage
  function setUserName(userName) {
    localStorage.setItem("user_name", userName);
  }

  // Function 2: Get "user_name" from local storage and assign it to element with id "x"
  function getUserNameAndDisplay(x) {
    const userName = localStorage.getItem("user_name");
    if (userName) {
      // Assign the retrieved user name to the element with id "x"
      document.getElementById(x).textContent = userName;
    } else {
      // If there is no user name in local storage, show a default message
      document.getElementById(x).textContent = "Not logged in";
    }
  }

  // Function 3: Set "user_name" in local storage to "Not logged in"
  function setUserNameToNotLoggedIn() {
    localStorage.setItem("user_name", "Not logged in");
  }

  // Example usage of the functions:

  //setUserName(user_name); //  creates or updates the "user_name" key

  getUserNameAndDisplay(id_element); // assign "user_name" in local storage to  element id="x"
  // setUserNameToNotLoggedIn(); // assign "user_name" to "Not logged in"
}
