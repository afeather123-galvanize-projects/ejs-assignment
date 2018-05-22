const num_students = require('../seedInfo').num_students;
const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      const data = [];
      for (let i = 0; i < num_students; i++) {
        let new_student = {
          name: faker.name.findName(),
          age: Math.ceil(Math.random() * 60)
        }
        data.push(new_student);
      }
      return knex('students').insert(data);
    });
};
