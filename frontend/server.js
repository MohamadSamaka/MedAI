const express = require('express');
const cors = require('cors')
const path = require('path');
const morgan = require('morgan'); // Logging middleware

const app = express();
app.use(cors())
const PORT = process.env.PORT || 3000;

// Use morgan to log all requests
app.use(morgan('dev'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


// Fallback: send index.html for any unknown route (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const morgan = require('morgan')
// const app = express();
// app.use(cors());
// const PORT = process.env.PORT || 3000;

// // Use morgan to log all requests
// app.use(morgan('dev'));

// // Serve static files from the public directory
// app.use(express.static(path.join(__dirname, 'public')));

// const getRoleFromRequest = (req) => {
//   // Mock function to get the role from the request. 
//   // Replace this with actual logic to extract the user role.
//   // For example, you might extract this from a header or a query parameter.
//   return req.query.role || 'user'; // Default to 'user' if no role is provided.
// };

// // Serve the appropriate HTML file based on the user's role
// app.get('*', (req, res) => {
//   console.log(req)
//   const userRole = getRoleFromRequest(req);
//   let filePath;

//   switch (userRole) {
//     case 'admin':
//       filePath = path.join(__dirname, 'public', 'admin.html');
//       break;
//     case 'doctor':
//       filePath = path.join(__dirname, 'public', 'doctor.html');
//       break;
//     default:
//       filePath = path.join(__dirname, 'public', 'index.html');
//       break;
//   }

//   res.sendFile(filePath);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });
