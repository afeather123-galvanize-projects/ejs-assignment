const {num_classes, num_students, num_students_per_class} = require('../seedInfo');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('class_student').del()
    .then(function () {
      const data = [];
      for(let i = 1; i <= num_classes; i++) {
        const uniqueStudentIds = [];
        for(let j = 1; j <= num_students; j++) {
          uniqueStudentIds.push(j);
        }
        for(let j = 0; j < num_students_per_class; j++) {
          const id = uniqueStudentIds.splice(Math.floor(Math.random() * uniqueStudentIds.length),1)[0]
          let new_relation = {
            class_id: i,
            student_id: id
          }
          data.push(new_relation);
        }
        
      }
      // Inserts seed entries
      return knex('class_student').insert(data);
    });
};
