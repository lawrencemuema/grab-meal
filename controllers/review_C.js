const express = require('express');
const router = express.Router();

const { Review, MenuItem, User } = require('../models');

//get all reviews
router.get('/get-all-reviews', async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: [
                {
                    model: MenuItem,
                    attributes: ['name', 'price', 'image', 'description']
                },
                {
                    model: User,
                    attributes: ['name', 'email']
                }
            ]
        });


        res.status(200).json(reviews);
    } catch (error) {

        res.status(400).send('Error: ' + error);
    }
}
);

//get a review by id

router.get('/get-review-by-id/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findByPk(id);
        if (!review) {
            res.status(404).json({ error: 'Review not found' });
            return;
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(400).send('Error: ' + error);
    }

}
);

//get all reviews by menu item id

router.get('/get-all-reviews-by-menu-item-id/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const reviews = await Review.findAll({
            where: {
                menuItemId: id
            }
        });
        if (!reviews) {
            res.status(404).json({ error: 'Reviews not found' });
            return;
        }
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).send('Error: ' + error);
    }

});

//delete a review
router.delete('/delete-review/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findByPk(id);
        if (!review) {
            res.status(404).json({ error: 'Review not found' });
            return;
        }
        await review.destroy();
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(400).send('Error: ' + error);
    }
});

//update a review
router.put('/update-review/:id', async (req, res) => {
    const { id } = req.params;
    const { review, rating } = req.body;
    try {
        const reviewToUpdate = await Review.findByPk(id);
        if (!reviewToUpdate) {
            res.status(404).json({ error: 'Review not found' });
            return;
        }
        const updatedReview = await Review.update({
            review,
            rating,
        }, {
            where: {
                id: id
            }
        });
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update review' });
    }
}
);

