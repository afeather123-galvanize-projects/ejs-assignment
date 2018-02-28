const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const env = "development";
const config = require("./knexfile")[env];
const knex = require("knex")(config);
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');


app.get('/', (req, res)=>{
  knex("classes").then((results)=>{
    res.render("index", {classes:results});
  })
})

app.post('/class', (req,res)=>{
  knex("classes").insert({
    name: req.body.name,
    inst: req.body.inst
  }).then(()=>{
    res.redirect('/');
  })
})

app.get('/class/:id', (req, res)=>{
  knex("classes")
    .where("classes.id", req.params.id)
    .then((results)=>{
      knex("students")
        .where("class_id", req.params.id)
        .then((students)=>{
          res.render("one_class.ejs", {oneClass: results[0], students})
        })
    })
})

app.post('/students/:class_id', (req, res)=>{
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
})

app.listen(port, ()=>{
  console.log("Listening on localhost:"+port);
})
