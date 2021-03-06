const { Router } = require('express');
const reservationController = require('../controllers/reservationController');

const router = Router();

router.get('/', reservationController.reservation_get);
router.get('/detailed/:id', reservationController.reservation_get_detailed)
router.get('/user/:user_id', reservationController.reservation_user_get)
router.get('/:id', reservationController.reservation_get_id);

router.post('/', reservationController.reservation_post);
router.post('/seats/book', reservationController.reservation_post_seats_book)
router.post('/seats/freeUp', reservationController.reservation_post_seats_freeUp)
router.put('/:id', reservationController.reservation_put);
router.delete('/:id', reservationController.reservation_delete);


module.exports = router;