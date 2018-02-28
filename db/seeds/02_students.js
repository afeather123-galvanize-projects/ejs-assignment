
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {first_name: 'noel', last_name: "got one", age:55, email:"noel@gotaname.com", class_id:1},
        {first_name: 'joe', last_name: "sand", age:30, email:"joe@vikings.com", class_id:1},
        {first_name: 'jen', last_name: "tristan", age:29, email:"jen@jen.com", class_id:2},
      ]);
    });
};
