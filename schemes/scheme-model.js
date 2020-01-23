const db = require("../data/db-config.js");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

function find(){
    return db.select("*").from('schemes');
}

function findById(schemeId){

    return db("schemes")
    .where({id: schemeId})
    .first();
}

function findSteps(schemeId){

    return db('steps')
    .join('schemes as s', 's.id', 'steps.scheme_id') 
    
    .where({scheme_id : schemeId})
    .select("steps.id", "s.scheme_name","step_number", "instructions")
    .orderBy('steps.step_number')
  
}

function add(scheme){

    return db('schemes').insert(scheme)
    .then(([id]) => {
        return findById(id);
    });


}

function update(changes,id){

    return db("schemes")
    .where({ id })
    .update(changes)
}

function remove(id) {

    return db('schemes')
    .where({id})
    .del(id);
}

