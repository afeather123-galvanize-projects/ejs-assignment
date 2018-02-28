
exports.up = function(knex, Promise) {
  return knex.schema.createTable("students",(table)=>{
    table.increments();
    table.string("first_name");
    table.string("last_name");
    table.integer("age");
    table.string("email");
    table.integer("class_id")
      .references("id")
      .inTable("classes")
      .onDelete("CASCADE")
      .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("students");
};
