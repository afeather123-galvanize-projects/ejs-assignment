
exports.up = function(knex, Promise) {
  return knex.schema.createTable('classes', table => {
      table.increments();
      table.string('name');
      table.string('teacher');
      table.integer('room_number');
      table.time('time');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('classes');
};
