// our variables
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')

// Import your route files
const restaurantRoutes = require('./routes/restaurant_R');


const app = express();

app.use(bodyParser.json());
app.use(cors());

// Define your route handlers
app.use('/restaurant',restaurantRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the grab-meal API');
});


// Serve static files
app.use(express.static(path.join(__dirname, 'build')));
app.get("*", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Listen on a specific port
const port = process.env.PORT || 3070; // Use the port number provided by cPanel or default to 3010
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




//API list

//domain.com/restaurant/add
//domain.com/restaurant/getAll
//domain.com/restaurant/getOne/1
//domain.com/restaurant/update/1
//domain.com/restaurant/delete/1