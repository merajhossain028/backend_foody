const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const CategoryRoute = require('./routes/category');
const RestaurantRoute = require('./routes/restaurant');

dotenv.config();

mongoose.connect(process.env.MONGOURL)
.then(() => console.log('Foody Connected to MongoDB'))
.catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/categories', CategoryRoute);
app.use('/api/restaurant', RestaurantRoute);


app.listen(process.env.PORT || 6013, () => console.log(`Foody Backend is running on ${process.env.PORT}!`));