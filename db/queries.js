var knex = require('./knex.js');
//references knex config file

var pgp = require('pg-promise')();
var connectionString = 'postgres://localhost/mocha_chai_tv_shows'
const db = pgp(connectionString);




// //helper function for simplyifiing each individual query
// function Shows(){
//   return knex('shows')
// }
//
// // queries
//
// function getAll(){
//   return Shows().select();
// }

//module.exports = { getAll:getAll }
function getAll(){
  return db.any(`SELECT * FROM shows`)
}

function getSingle(id){
  return db.any(`SELECT * FROM shows WHERE id = $1`, [id])
}

function addSingle(name, channel, genre, rating, explicit){
  return db.any(`INSERT INTO shows(name, channel, genre, rating, explicit) VALUES ($1, $2, $3, $4, $5)`, [name, channel, genre, rating, explicit])
}

function updateSingle(rating, explicit, id){
  return db.any(`UPDATE shows SET rating = $1, explicit = $2 WHERE id = $3`, [rating, explicit, id])
}

module.exports = { getAll:getAll, getSingle:getSingle, addSingle:addSingle }


// function add(id){
//   return db.any(`INSERT INTO (id) VALUES($1)`, [id])
// };
