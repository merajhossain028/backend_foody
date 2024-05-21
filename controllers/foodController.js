const Food = require('../models/Food');

module.exports = {
    addFood: async (req, res) => {
        const { title, foodTags, category, code, restaurant, description, time, price, additives, imageUrl } = req.body;

        if (!title || !foodTags || !category || !code || !restaurant || !description || !time || !price || !additives || !imageUrl) {
            return res.status(400).json({ status: false, message: 'Please fill all fields' });
        }

        try {
            const newFood = new Food(req.body);

            await newFood.save();

            res.status(201).json({ status: true, message: 'Food added successfully' });

        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getFoodById: async (req, res) => {
        const id = req.params.id;

        try {
            const food = await Food.findById(id);

            if (!food) {
                return res.status(404).json({ status: false, message: 'Food not found' });
            }

            res.status(200).json({ status: true, food });

        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getRandomFood: async (req, res) => {
        const code = req.params.code;

        try {
            let randomFoodList = [];
            if (code) {
                randomFoodList = await Food.aggregate([{ $match: { code: code } }, { $sample: { size: 3 } }, { $project: { __v: 0 } }]);
            }

            if (!randomFoodList.length) {
                randomFoodList = await Food.aggregate([{ $sample: { size: 5 } }, { $project: { __v: 0 } }]);
            }

            if(randomFoodList.length){
                res.status(200).json({ status: true, randomFoodList });

            } else{
                res.status(404).json({ status: false, message: 'No food found' });
            }

            

        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    // Restaurant Menu
    getFoodsByRestaurant: async (req, res) => {
        const id = req.params.id;

        try {
            const foods = await Food.find({ restaurant: id });

            if (foods.length === 0) {
                return res.status(404).json({ status: false, message: 'No food found' });
            }

            res.status(200).json({ status: true, foods });

        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getFoodByCategoryAndCode: async (req, res) => {
        const { category, code } = req.params;
        try {
            const foods = await Food.aggregate([{ $match: { category: category, code: code, isAvailable: true } }, { $project: { __v: 0 } }]);

            if (foods.length === 0) {
                return res.status(200).json([]);
            }

            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    searchFoods: async (req, res) => {
        const search = req.params.search;

        try {
            const results = await Food.aggregate([{
                $search: {
                    index: 'foods',
                    text: {
                        query: search,
                        path: {
                            wildcard: '*'
                        }
                    }

                }
            }
            ])

            res.status(200).json({ status: true, results });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getRandomFoodsByCategoryAndCode: async (req, res) => {
        const { category, code } = req.params;

        try {
            let foods;

            foods = await Food.aggregate([{ $match: { category: category, code: code, isAvailable: true } }, { $sample: { size: 10 } }]);

            if(!foods || foods.length === 0){
                foods = await Food.aggregate([{ $match: { code: code, isAvailable: true } }, { $sample: { size: 10 } }]);
            } else if (!foods || foods.length === 0) {
                foods = await Food.aggregate([{ $match: { isAvailable: true } }, { $sample: { size: 10 } }]);
            }

            res.status(200).json({ status: true, foods });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }


};