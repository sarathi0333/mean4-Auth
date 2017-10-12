const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

//login
router.post('/auth', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const query = { email }

    //check the user exists
    User.findOne(query, (err, user) => {
        if (err) {
            res.send({
                success: false,
                message: "Error. please try again"
            });
        }
        if(!user) {
            res.send({
                success: false,
                message: "Error. Cannot find user"
            });
        }
        user.isPasswordMatch(password, user.password, (err, isMatch)=> {
            if(!isMatch) {
                return res.send({
                    success: false,
                    message: "Error, Invalid Password"
                });
            }
            //user is valid
            const ONE_WEEK = 604800; //token validity in seconds

            //generating the token
            const token = jwt.sign({user}, process.env.SECRET, { expiresIn: ONE_WEEK });

            let returnUser = {
                name: user.name,
                email: user.email,
                id: user._id,
                token
            }
            return res.send({
                success: true,
                message: "you can login",
                user: returnUser
            })
        });
    });
});

//registeration
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save((err, user) => {
        if (err) {
            return res.send({
                success: false,
                message: "failed to save user"
            });
        } else {
            res.send({
                success: true,
                message: 'User saved',
                user
            })
        }    
    });
});

module.exports = router;
