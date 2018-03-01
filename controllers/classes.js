const knex = require("../db/knex");


module.exports = {
  index:(req, res)=>{
    knex("classes").then((results)=>{
      res.render("index", {classes:results});
    })
  },

  create: (req,res)=>{
    knex("classes").insert({
      name: req.body.name,
      inst: req.body.inst
    }).then(()=>{
      res.redirect('/');
    })
  },

  getOne: (req, res)=>{
    knex("classes")
      .where("classes.id", req.params.id)
      .then((results)=>{
        knex("students")
          .where("class_id", req.params.id)
          .then((students)=>{
            res.render("one_class.ejs", {oneClass: results[0], students})
          })
      })
  }
}
