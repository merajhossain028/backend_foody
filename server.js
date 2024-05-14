const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const CategoryRoute = require('./routes/category');
const RestaurantRoute = require('./routes/restaurant');
const FoodRoute = require('./routes/food');
const RatingRoute = require('./routes/rating');
const AuthRoute = require('./routes/auth');
const UserRoute = require('./routes/user');
const AddressRoute = require('./routes/address');
const CartRoute = require('./routes/cart');

dotenv.config();

mongoose.connect(process.env.MONGOURL)
.then(() => console.log('Foody Connected to MongoDB'))
.catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', AuthRoute);
app.use('/api/users', UserRoute);
app.use('/api/categories', CategoryRoute);
app.use('/api/restaurant', RestaurantRoute);
app.use('/api/foods', FoodRoute);
app.use('/api/rating', RatingRoute);
app.use('/api/address', AddressRoute);
app.use('/api/cart', CartRoute);


app.listen(process.env.PORT || 6013, () => console.log(`Foody Backend is running on ${process.env.PORT}!`));