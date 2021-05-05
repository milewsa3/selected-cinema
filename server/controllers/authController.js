const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const handleErrors = (err) => {
    let errors = { email: '', password: '', name: '' };

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
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
const createToken = (email, id) => {
    return jwt.sign({ email, id }, process.env.BCRYPT_PRIVATE_KEY, {
        expiresIn: maxAge
    });
};

const validateUserForSignup = async ({ email, password, firstName, lastName, confirmPassword }) => {
    let error = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

    try {
        if (firstName === '') {
            error.firstName = 'Enter your first name'
            return { error }
        }

        if (lastName === '') {
            error.lastName = 'Enter your last name'
            return { error }
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            error.email = 'User already exist.'
            return { error }
        }

        if (password !== confirmPassword) {
            error.confirmPassword = 'Passwords do not match'
            return { error }
        }

        return { }
    } catch (err) {
        error.email = 'Something went wrong'
        return { error }
    }
}

module.exports.signup_post = async (req, res) => {
    const data = await validateUserForSignup(req.body)
    if (data.error) {
        res.status(400).json(data)
        return
    }

    try {
        const { email, password, firstName, lastName } = req.body
        const user = await User.create({ email, password, name: `${firstName} ${lastName}` })
        const token = createToken(user.email, user._id)
        res.status(200).json({ result: user, token })
    } catch (err) {
        const error = handleErrors(err)
        res.status(400).json({ error });
    }
}

const validateUserForSignin = async ({ email, password }) => {
    let error = {email: '', password: ''}

    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            error.email = 'User doesn\'t exist.'
            return { error }
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) {
            error.password = 'Invalid credentials'
            return { error }
        }

        return { user: existingUser }
    } catch (err) {
        error.email = 'Something went wrong'
        return { error }
    }
}

module.exports.signin_post = async (req, res) => {
    const data = await validateUserForSignin(req.body)
    if (data.error) {
        res.status(400).json(data)
    } else {
        let user = data.user
        const token = createToken(user.email, user._id)
        res.status(200).json({ result: user, token })
    }
}