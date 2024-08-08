require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const carRoutes = require('./routes/cars');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/cars', carRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
