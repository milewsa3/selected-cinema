const { Router } = require('express');
const screeningController = require('../controllers/screeningController');

const router = Router();

router.get('/dated/:date', screeningController.screening_dated_get)
router.get('/timed', screeningController.screening_timed_get)
router.get('/:date/:movie_id', screeningController.screening_get_date_movie_id);
router.get('/:id', screeningController.screening_get_id);
router.get('/', screeningController.screening_get);
router.post('/', screeningController.screening_post);
router.put('/:id', screeningController.screening_put);
router.delete('/:id', screeningController.screening_delete);

module.exports = router;