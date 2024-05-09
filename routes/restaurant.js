const router = require('express').Router();
const restaurantController = require('../controllers/restarurantController');
const { verifyTokenAndAuthorization} = require('../middleware/verifyToken');

router.post('/', verifyTokenAndAuthorization, restaurantController.addRestaurant);

router.get('/:code', restaurantController.getRandomRestaurants);

router.get('/all/:code', restaurantController.getAllNearByRestaurants);

router.get('/byId/:id', restaurantController.getRestaurantbyId);

module.exports = router;