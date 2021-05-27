const validator = require('validator');
const fetch = require("node-fetch");

const newsletter_post = (req, res) => {
    const { email } = req.body
    if (!validator.isEmail(email)) {
        const error = { message: 'Invalid email' }
        res.json({ error })
        return
    }

    const mcData = {
        members: [
            {
                email_address: email,
                status: 'subscribed'
            }
        ]
    }

    fetch(`https://us6.api.mailchimp.com/3.0/lists/b23a37abeb`, {
        method: 'POST',
        headers: {
            'Authorization': `auth ${process.env.MAILCHIMP_NEWSLETTER_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mcData)
    })
    .then(res => res.json())
    .then(data => {
        res.json({message: 'Success', email})
    })
    .catch(error => {
        console.log(error)
        res.json({error: {message: 'Something went wrong'}})
    })
}


module.exports = {
    newsletter_post
}