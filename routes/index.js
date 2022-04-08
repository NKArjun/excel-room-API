var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(process.env);
});

router.get('/add/:a/:b', (req, res) => {
  const { a, b } = req.params;
  res.send(a + b);
});
module.exports = router;
