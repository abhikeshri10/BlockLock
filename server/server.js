const express = require('express');
const path = require('path');
const cors = require('cors');
// const upload_file = require('./routes/file_upload.js');
const fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var mul = multer();
const login = require('./routes/login');
const register = require('./routes/register');

//const filelist = require('./routes/file_list');
const app = express();

const PORT = process.env.PORT || 5000;

//Init middleware
app.use(express.json());
app.use(cors());

// DB Config
const db = require('./config/keys').mongoURI;

// import mongoose from 'mongoose';
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('API running'));
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
// File POST handler.
// app.post('/file_upload', auth, function (req, res) {
//   upload_file(req, function (err, data) {
//     if (err) {
//       return res.status(404).end(JSON.stringify(err));
//     }

//     res.send(data);
//   });
// });

// Create folder for uploading files.
var filesDir = path.join(path.dirname(require.main.filename), 'uploads');
if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir);
}
// app.use('/uploads/:name', filedown.download);
// app.use('/uploads', filedown.getListFiles);
// Define routes
app.use('/login', login);
app.use('/register', register);
