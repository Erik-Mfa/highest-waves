require('dotenv').config();
const mongoose = require('mongoose');

const db = mongoose.connect(process.env.MONGO_URI);

const con = mongoose.connection;

con.on('open', function () {
  console.log('Connected to MongoDB!');
});

con.on('error', function (err) {
    console.error('Connection error MongoDB:', err);
    process.exit(1);
});

con.on('close', function () {
  console.log('Disconnected MongoDB!');
});

module.exports = db;