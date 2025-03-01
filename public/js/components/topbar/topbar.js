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

let user_name = "dannysadsa dan";
let id_element = "user-name";
display_username(user_name, id_element); // display name in topbar
