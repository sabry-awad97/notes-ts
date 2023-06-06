import express from 'express';
export const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    res.send('Hello, world!');
  } catch (err) {
    next(err);
  }
});
