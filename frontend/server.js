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


