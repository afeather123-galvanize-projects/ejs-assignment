const classes = require("../controllers/classes");
const students = require("../controllers/students");

module.exports = function(app){


  app.get('/', classes.index);

  app.post('/class', classes.create);

  app.get('/class/:id', classes.getOne);

  app.post('/students/:class_id', students.create);


}
