const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path'); 
require("dotenv").config();
const adminRoute = require("./routes/adminRoute"); // Adjusted path to include routes folder
const customerRoute = require("./routes/customerRoute")
const PORT = process.env.PORT || 5000;

// Set cors options to be used
const options = {
	origin: 'http://localhost:3000',
	methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
	credentials: true,
};

app.use(cors(options));
// app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("DATABASE CONNECTED!");
    app.listen(PORT, () => {
        console.log(`LISTENING ON PORT ${PORT}`);
    });
}).catch((error) => {
    console.log("DATABASE FAILED TO CONNECT", error);
});

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ADMIN ROUTE
app.use("/admin", adminRoute);

// CUSTOMER ROUTE
app.use("/customer", customerRoute);