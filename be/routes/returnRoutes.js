const express = require('express');
const { getReturns, createReturn, updateReturnStatus } = require('../controllers/returnController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getReturns)
  .post(createReturn);

router.route('/:id/status')
  .put(isAdmin, updateReturnStatus);

module.exports = router;