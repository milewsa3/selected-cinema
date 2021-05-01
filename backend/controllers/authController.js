const User = require("../models/User");
const jwt = require('jsonwebtoken');

// handling for login and signup
const handleErrors = (err) => {
    let errors = { email: '', password: '', fullName: '' };

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is incorrect';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(val);
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'private secret', {
        expiresIn: maxAge
    });
};

module.exports.signup_post = async (req, res) => {
    const {fullName, email, password } = req.body;

    try {
        const user = await User.create({fullName, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.json()
}

module.exports.checkUser_get = (req, res) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'private secret', async (err, decodedToken) => {
            if (err) {
                res.status(200).json({user: undefined})
            } else {
                let user = await User.findById(decodedToken.id);
                res.status(200).json({ user })
            }
        });
    } else {
        res.status(200).json({user: undefined})
    }
}