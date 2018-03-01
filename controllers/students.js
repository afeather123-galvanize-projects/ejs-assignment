const knex = require("../db/knex");

module.exports = {
  create:(req, res)=>{
    knex("students")
      .insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        email: req.body.email,
        class_id: req.params.class_id,
      }).then(()=>{
        res.redirect(`/class/${req.params.class_id}`)
      })
  }
}
