const { Router } = require('express');
const reservationController = require('../controllers/reservationController');

const router = Router();

router.get('/', reservationController.reservation_get);
router.get('/:id', reservationController.reservation_get_id);
router.post('/', reservationController.reservation_post);
router.put('/:id', reservationController.reservation_put);
router.delete('/:id', reservationController.reservation_delete);

router.get('/user/:user_id', reservationController.reservation_user_get)

module.exports = router;