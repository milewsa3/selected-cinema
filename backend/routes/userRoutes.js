const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.get('/', userController.user_get);
router.get('/:id', userController.user_get_id);
router.post('/', userController.user_post);
router.put('/:id', userController.user_put);
router.delete('/:id', userController.user_delete);

module.exports = router;