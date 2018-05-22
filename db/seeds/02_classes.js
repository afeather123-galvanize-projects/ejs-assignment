const {num_classes} = require('../seedInfo');
const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      const data = [];
      for (let i = 0; i < num_classes; i++) {
        let class_data = {
          name: faker.lorem.word(),
          teacher: faker.name.findName(),
          room_number: faker.random.number(40),
          time: faker.date.recent(1).toLocaleTimeString()
        }
        data.push(class_data)
      }

      // Inserts seed entries
      return knex('classes').insert(data);
    });
};