const Knex = require('knex');
const prompt = require('prompt');

const FIELDS = ['Phalin', 'eaiou_1234', 'attendance'];

prompt.start();

// Prompt the user for connection details
prompt.get(FIELDS, (err, config) => {
  if (err) {
    console.error(err);
    return;
  }

  // Connect to the database
  const knex = Knex({ client: 'mysql', connection: config });
knex('studentcourse').insert({cid:1,sid:'e20150149'});
//console.log(knex.select().table('studentcourse'));
  // Create the "attendance" table
//   knex.schema.createTable('student',
//     (table) => {
//       table.string('sid');
//       table.string('name');
//       table.date('dob');
//       table.int('year');
//       table.string('dep');
//     })
//     .then(() => {
//       console.log(`Successfully created 'attendance' table.`);
//       return knex.destroy();
//     })
//     .catch((err) => {
//       console.error(`Failed to create 'attendance' table:`, err);
//       if (knex) {
//         knex.destroy();
//       }
//     });
});
