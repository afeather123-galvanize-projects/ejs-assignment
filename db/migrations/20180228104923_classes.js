
exports.up = function(knex, Promise) {
  return knex.schema.createTable("classes",(table)=>{
    table.increments();
    table.string("name");
    table.string("inst");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("classes");
};
