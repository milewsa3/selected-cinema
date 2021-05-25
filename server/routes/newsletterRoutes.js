const newsletterController = require("../controllers/newsletterController");
const { Router } = require('express');

const router = Router();

router.post('/', newsletterController.newsletter_post)

module.exports = router;