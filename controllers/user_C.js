const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Assuming you have defined the models using Sequelize


//get all users
router.get('/get-all-users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {

        res.status(400).send('Error: ' + error);
    }
});

//get a user by id

router.get('/get-user-by-id/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send('Error: ' + error);
    }

});


//update a user
router.put('/update-user/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, address, phone_number } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await User.update({
            name,
            email,
            password: hashedPassword,
            address,
            phone_number,
        }, {
            where: {
                id: id
            }
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

//delete a user
router.delete('/delete-user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const deletedUser = await User.destroy({
            where: {
                id: id
            }
        });
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});



module.exports = router;
