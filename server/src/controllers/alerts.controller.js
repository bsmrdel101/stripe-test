import express from "express";


const router = express.Router();
/**
 * @base_path /api/alerts
*/

router.get("/", (req, res) => {
  try {
    res.status(200).json({ message: 'Alerts' });
  } catch(error) {
    console.log('Oops you did a goof: ', error);
    res.status(500).json({ message: error });
  }
});


export default router;
