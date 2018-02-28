
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        {name: 'g76', inst:"troy"},
        {name: 'g73', inst:"john"},
        {name: 'g83', inst:"yeff"},
      ]);
    });
};
