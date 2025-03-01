const descriptions = [
  "Transparent",
  "24/7 Access",
  "Free",
  "User-friendly",
  "Reliable",
  "Efficient",
  "Fast",
  "Smart",
  "Latest Tech",
  "Secure",
  "Expert",
  "Convenient",
  "Innovative",
  "Scalable",
  "Easy-to-use",
  "Time-saving",
  "Seamless experience",
  "Cost-effective",
  "Accessible",
  "Real-time updates",
  "High performance",
  "Data-driven",
  "Trusted",

  "Interactive",
  "Automated",
  "Intuitive",
  "Multilingual",
  "Privacy-focused",
  "Low maintenance",
  "Cross-platform",
];

let index = 0;

function changeDescriptions() {
  // Fade out the descriptions
  document.getElementById("desc1").style.opacity = 0;
  document.getElementById("desc2").style.opacity = 0;
  document.getElementById("desc3").style.opacity = 0;

  // Wait for the fade out to complete (0.5s transition duration)
  setTimeout(function () {
    // Change content for each description div
    document.getElementById("desc1").textContent =
      descriptions[index % descriptions.length];
    document.getElementById("desc2").textContent =
      descriptions[(index + 1) % descriptions.length];
    document.getElementById("desc3").textContent =
      descriptions[(index + 2) % descriptions.length];

    // Fade them back in
    document.getElementById("desc1").style.opacity = 1;
    document.getElementById("desc2").style.opacity = 1;
    document.getElementById("desc3").style.opacity = 1;

    index += 3; // Move to the next set of descriptions
  }, 500); // Wait for 0.5s before changing text
}

// Run the function immediately and then every 4 seconds
changeDescriptions();
setInterval(changeDescriptions, 4000);
