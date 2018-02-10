process.env.NODE_ENV = 'test';
//this sets the NODE_ENV to use the test database from knexfile.js

var chai = require('chai');
//chai allows us to use the assertion module, giving us
//all access to the chai methods, like should().
var chaiHttp = require('chai-http');
//Next we link our app so that we can test the request-response cycle.
var server = require('../app');
var knex = require('../db/knex');

var should = chai.should();

//The chai-http module allows us to make http requests from within our test file.
chai.use(chaiHttp);

//the describe block underneath the requirements is the wrapper for the tests.
// Keep in mind that you can nest describe blocks to better organize
//your test structure by grouping similar tests together


//tests should be isolated from each other so we rollback the migrations
//before and after each test is run, to make sure the database is clearn and unaltered.

describe('API Routes', function() {

  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return knex.seed.run()
        .then(function() {
          done();
        })
        .catch(function(error){
          console.log(error);
          done();
        });
      });
    });

  });

  afterEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      done();
    })
    .catch(function(error){
      console.log(error);
      done();
    });
  });

  //Now the migrations will runa nd the database will be re-seeded before each nested describe.
  //and the migrations will also be rolled back, and the data dropped.
   describe('GET /api/v1/shows', function() {
    it('should return all shows', function(done) {
      chai.request(server)
      .get('/api/v1/shows')
      .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json; // jshint ignore:line
      res.body.should.be.a('array');
      res.body.length.should.equal(4);
      res.body[0].should.have.property('name');
      res.body[0].name.should.equal('Suits');
      res.body[0].should.have.property('channel');
      res.body[0].channel.should.equal('USA Network');
      res.body[0].should.have.property('genre');
      res.body[0].genre.should.equal('Drama');
      res.body[0].should.have.property('rating');
      res.body[0].rating.should.equal(3);
      res.body[0].should.have.property('explicit');
      res.body[0].explicit.should.equal(false);
      //This done() function tells the test that the asynchrous function is finished.
      // From here it moes onto the next test.
      done();
        });
      });
    });

    describe('GET /api/v1/shows/:id', function() {
  it('should return a single show', function(done) {
    chai.request(server)
    .get('/api/v1/shows/21')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json; // jshint ignore:line
      res.body.should.be.a('array');
      res.body[1].should.have.property('name');
      res.body[1].name.should.equal('Suits');
      res.body[1].should.have.property('channel');
      res.body[1].channel.should.equal('USA Network');
      res.body[1].should.have.property('genre');
      res.body[1].genre.should.equal('Drama');
      res.body[1].should.have.property('rating');
      res.body[1].rating.should.equal(3);
      res.body[1].should.have.property('explicit');
      res.body[1].explicit.should.equal(false);
      done();
    })
    .catch(function(error){
      console.log(error);
      done();
    });
  });
});

// We make post testing slightly different than previous tests
// becuase it is a POST route. We are now sending data to the server,
// to come back to us and be tested.

//We use the .send() method to post data



describe('POST /api/v1/shows', function() {
  it('should add a show', function(done) {
    chai.request(server)
    .post('/api/v1/shows')
    .send({
      name: 'Family Guy',
      channel : 'Fox',
      genre: 'Comedy',
      rating: 4,
      explicit: true
    })
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json; // jshint ignore:line
      res.body.should.be.a('object');
      res.body.should.have.property("name");
      res.body.name.should.equal('Family Guy');
      res.body.should.have.property('channel');
      res.body.channel.should.equal('Fox');
      res.body.should.have.property('genre');
      res.body.genre.should.equal('Comedy');
      res.body.should.have.property('rating');
      res.body.rating.should.equal(4);
      res.body.should.have.property('explicit');
      res.body.explicit.should.equal(true);
      done();
      })
      .catch(function(error){
        console.log(error);
        done();
      });
    });
   });

 describe('PUT /api/v1/shows/:id', function() {
  it('should update a show', function(done) {
    chai.request(server)
    .put('/api/v1/shows/1')
    .send({
      rating: 4,
      explicit: true
    })
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json; // jshint ignore:line
      res.body.should.be.a('object');
      res.body.should.have.property('name');
      res.body.name.should.equal('Suits');
      res.body.should.have.property('channel');
      res.body.channel.should.equal('USA Network');
      res.body.should.have.property('genre');
      res.body.genre.should.equal('Drama');
      res.body.should.have.property('rating');
      res.body.rating.should.equal(4);
      res.body.should.have.property('explicit');
      res.body.explicit.should.equal(true);
      done();
    })
    .catch(function(error){
      console.log(error);
    });
  });
});
});
