const User = require("../models/User");
const bcrypt = require('bcrypt');

const handleErrors = (err) => {
    let errors = { email: '', password: '', fullName: '' };
  
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

const user_get = (req, res) => {
    User.find()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
}

const user_get_id = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        })
}

const user_post = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            const errors = handleErrors(err)
            res.status(400).json({ errors });
        });
}

const user_put = async (req, res) => {
    const id = req.params.id;
    const newContent = req.body;

    if (newContent.password) {
        const salt = await bcrypt.genSalt();
        newContent.password = await bcrypt.hash(newContent.password, salt);
    }

    User.updateOne({ _id: id }, newContent)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(400).json('Error: ' + err);
        });
}

const user_delete = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(400).json('Error: ' + err);
        })
}

module.exports = {
    user_get,
    user_get_id,
    user_post,
    user_put,
    user_delete
}