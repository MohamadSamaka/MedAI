//

window.onload = function () {
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
    console.log("!!!!!!!!!!!!!update subbar!!!!!!!!!!!");
    updateTime();
    setInterval(updateTime, 1000);
  }, 5000);
};
