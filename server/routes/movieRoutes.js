const { Router } = require('express');
const movieController = require('../controllers/movieController');

const router = Router();

router.get('/', movieController.movie_get);
router.get('/:id', movieController.movie_get_id);
router.post('/', movieController.movie_post);
router.put('/:id', movieController.movie_put);
router.delete('/:id', movieController.movie_delete);

module.exports = router;