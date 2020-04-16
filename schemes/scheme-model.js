const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
}

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes')
  .where({ id })
  .first()
  .then(scheme =>{
    if(scheme){
      return scheme;
    }else {
      return null;
    }
  })
}

function findSteps(stepId) {
  return db('steps as s')
    .join('schemes as sc', 's.step_number', 'sc.id')
    .select('s.id', 's.scheme_id', 's.step_number', 's.instructions', 'sc.scheme_name as scheme' )
    .where({ step_number: stepId });
}

function add(scheme) {
  return db('schemes')
    .insert(scheme)
    
}

function update(changes, id) {
  return db('schemes')
    .where({id})
    .update(changes);
}

function remove(id) {
  return db('schemes')
  .where({id})
  .del();
}