const express = require('express');
const config = require('./knexfile');
const methodOverride = require('method-override');
const knex = process.env.NODE_ENV === 'production' ? require('knex')(config.production) : require('knex')(config.development);
const port = process.env.port || 8000;
const bodyParser = require('body-parser');
const app = express();
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.redirect('/classes');
})

app.get('/classes', (req,res) => {
    knex('classes')
    .then(result => {
        res.render('index', {classes: result});
    })
})

app.get('/classes/:id', (req,res) => {
    knex('classes')
    .select('classes.id AS class_id', 'classes.name AS class_name',
    'classes.teacher', 'classes.room_number', 'classes.time',
    'students.name AS student_name', 'students.id AS student_id',
    'class_student.id AS join_id')
    .leftJoin('class_student', 'classes.id', 'class_student.class_id')
    .leftJoin('students', 'class_student.student_id', 'students.id')
    .where('classes.id', req.params.id)
    .then(result => {
        if(result.length <= 0) {
            res.render('class-not-found');
        } else {
            const classData = {
                name: result[0].class_name,
                id: result[0].class_id,
                teacher: result[0].teacher,
                room_number: result[0].room_number,
                time: result[0].time
            }
            const students = [];
            result.forEach(student => {
                const new_student = {
                    id: student.student_id,
                    join_id: student.join_id,
                    name: student.student_name
                }
                students.push(new_student);
            });
            res.render('class', {classData: classData, students: students});
        }
    })
})

app.get('/classes/edit/:id', (req,res) => {
    knex('classes')
    .where('id', req.params.id)
    .then(result => {
        if(result.length <= 0) {
            res.render('class-not-found');
        } else {
            res.render('edit-class', {classData: result[0]});
        }
    })
})

app.put('/classes/:id', (req,res) => {
    knex('classes')
    .update(req.body)
    .where('id', req.params.id)
    .then(() => {
        res.redirect('/classes/' + req.params.id);
    })
})

app.post('/classes', (req,res) => {
    knex('classes')
    .insert(req.body)
    .then(() => {
        res.redirect('/');
    })
})

app.delete('/classes/:id', (req,res) => {
    knex('classes')
    .delete()
    .where('id', req.params.id)
    .then(() => {
        res.send('/classes');
    })
})

app.delete('/classes/student/:id', (req,res) => {
    knex('class_student')
    .delete()
    .where('id', req.params.id)
    .then(() => {
        res.sendStatus(200);
    })
})

app.post('/classes/student', (req,res) => {
    console.log(req.body);
    const new_student = {
        name: req.body.name,
        age: req.body.age
    }
    knex('students')
    .insert(new_student)
    .returning('id')
    .then(result => {
        const new_relation = {
            class_id: req.body.class_id,
            student_id: result[0]
        }
        knex('class_student')
        .insert(new_relation)
        .then(() => {
            res.redirect('/classes/' + req.body.class_id);
        })
    })
})

app.get('/students', (req,res) => {
    knex('students')
    .then(result => {
        res.render('students', {students: result})
    })
})

app.get('/students/:id', (req,res) => {
    knex('students')
    .select('students.id AS student_id', 'students.name AS student_name',
    'students.age', 'classes.name AS class_name', 'class_student.id AS join_id',
    'classes.id AS class_id')
    .leftJoin('class_student', 'class_student.student_id', 'students.id')
    .leftJoin('classes', 'class_student.class_id', 'classes.id')
    .where('students.id', req.params.id)
    .then(result => {
        if(result.length <= 0) {
            res.render('student-not-found');
            return;
        }
        knex.select('classes.name', 'classes.id')
        .from(
            knex('students')
            .select('class_student.class_id')
            .join('class_student', 'class_student.student_id', 'students.id')
            .where('students.id', req.params.id)
            .as('students_classes')
        )
        .rightJoin('classes', 'students_classes.class_id', 'classes.id')
        .where('students_classes.class_id', null)
        .then(unenrolledClasses => {
            const studentData = {
                id: result[0].student_id,
                name: result[0].student_name,
                age: result[0].age
            }
            const classes = [];
            result.forEach(c => {
                const new_class = {
                    name: c.class_name,
                    join_id: c.join_id,
                    id: c.class_id
                }
                classes.push(new_class);
            })
            res.render('student', {student: studentData, classes: classes, unenrolledClasses: unenrolledClasses})
        })
    })
})

app.get('/students/edit/:id', (req,res) => {
    knex('students')
    .where('id', req.params.id)
    .then(result => {
        res.render('edit-student', {student: result[0]})
    })
})

app.put('/students/:id', (req,res) => {
  knex('students')
  .update(req.body)
  .where('id', req.params.id)
  .then(() => {
      res.redirect('/students/' + req.params.id);
  })  
})

app.delete('/students/:id', (req,res) => {
    knex('students')
    .delete()
    .where('id', req.params.id)
    .then(() => {
        backURL=req.header('Referer') || '/';
        res.redirect(backURL);
    })
})

app.post('/students', (req,res) => {
    knex('students')
    .insert(req.body)
    .then(() => {
        res.redirect('/students');
    })
})

app.post('/students/classes', (req,res) => {
    console.log(req.body);
    knex('class_student')
    .insert(req.body)
    .then(() => {
        backURL=req.header('Referer') || '/';
        res.redirect(backURL);
    })
});

app.listen(port, () => {console.log("Listening on port", port)})