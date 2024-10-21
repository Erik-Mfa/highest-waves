require('dotenv').config();
const mongoose = require('mongoose');

const db = mongoose.connect(process.env.MONGO_URI);

const con = mongoose.connection;

con.on('open', function () {
  console.log('Connected to Mongo Atlas DB!');
});

con.on('error', function (err) {
    console.error('Connection error Mongo Atlas DB:', err);
    process.exit(1);
});

con.on('close', function () {
  console.log('Disconnected from Mongo Atlas DB!');
});

module.exports = db;