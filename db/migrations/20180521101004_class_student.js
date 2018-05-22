exports.up = function(knex, Promise) {
  return knex.schema.createTable('class_student', table => {
      table.increments();
      table.integer('class_id')
        .notNullable()
        .references('id')
        .inTable('classes')
        .onDelete('CASCADE')
        .index();
      table.integer('student_id')
        .notNullable()
        .references('id')
        .inTable('students')
        .onDelete('CASCADE')
        .index();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('class_student');
};
