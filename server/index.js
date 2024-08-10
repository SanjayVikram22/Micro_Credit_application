const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const formRoutes = require('./routes/formRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const url = process.env.ATLAS_URL;
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongoose db connected successfully');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB();

app.use(formRoutes);

app.listen(8001, () => {
  console.log('App running on port 8001');
});
