var express = require('express');
var router = express.Router();
const { getAll, getSingle, addSingle } = require('../db/queries')

var queries = require('../db/queries')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// *** GET all shows *** //
router.get('/shows', function(req, res, next) {
  queries.getAll()
  .then(function(shows){
    console.log("testing if value is defined " + shows[1]);
    return shows;
  })
    .then(function(shows){
      //var results = JSON.stringify(shows)
      console.log("testing first promise " + shows);
      res.status(200).json(shows);
    })
    .catch(function(error){
      //next(error);
    });
});

// ** Get single show ** //

router.get('/shows/:id', (req, res)=>{
  queries.getSingle(req.params.id)
    .then(function(show){
      console.log(req.body);
      res.status(200).json(show);
    })
    .catch(function(error){
      console.log(error);
    });
});

//** Add single show **//
router.post('/shows', (req, res)=>{
  console.log("test");
var { name, channel, genre, rating, explicit } = req.body;
console.log(req.body);
  queries.addSingle(name, channel, genre, rating, explicit)
    .then(function(shows){
      console.log("testing success1 " + shows);
      res.status(200).json(shows);
    })
    .catch(function(error){
      console.log("failure " + error);
    });
});

//** Update single show **//
router.put('/shows/:id', (req,res)=>{
  var { rating, explicit } = req.body;
  console.log(req.body);
    queries.updateSingle()
      .then(function(show){
        console.log(show);
      })

})

module.exports = router;
