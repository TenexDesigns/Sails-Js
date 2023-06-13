To apply the changes to the database using Knex, you need to create migration files and run those migrations.
Heres a step-by-step guide on how to do that:

1.Install Knex CLI globally:
npm i -g knex

2.Initialize Knex in your project:
knex init
This command will create a knexfile.js in your project root directory with the necessary configurations.
e.g
module.exports = {
    development: {
      client: 'postgresql',
      connection: {
        host: 'localhost',
        user: 'george',
        port:'5432',
        password: 'KinaiJames',
        database: 'buses',
      },
      migrations: {
        directory: './migrations',
      },
    },
  };
  


3.Create a migration file:
knex migrate:make my_migration_name
This command will create a new migration file in the migrations folder with a name like 20230613084023_my_migration_name.js. 
You can now add your table operations (e.g., create table, add/remove/rename columns, etc.) to the up and down methods inside 
the migration file.








THESE ARE THE OPERATIONS  TO  create table, add/remove/rename columns, etc.
______________________________________________________________________________________________________
when performing each of the operations mentioned in the above context using Knex.js migrations, (create table,add column e.t.c)
  it is recommended to include the down methods. The down methods define the steps needed to revert 
  the changes made in the corresponding up methods, ensuring that you can rollback the migration if necessary.

 By including the down methods in your migration files, you ensure that you have a way to rollback the changes made in the up methods, 
    providing a reliable and reversible migration process.


1. Creating a table:

To create a new table, you can use the knex.schema.createTable method.
Heres an example of creating a users table with id, name, and email columns:
In the down method, you need to drop the users table that was created in the up method.

exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};




2.Adding a column:

To add a new column to an existing table, you can use the knex.schema.table method with the addColumn function.
Heres an example of adding a role column to the users table:
In the down method, you need to remove the added role column from the users table.

exports.up = function (knex) {
  return knex.schema.table('users', function (table) {
    table.string('role');
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('role');
  });
};





3.To remove an existing column from a table, you can use the knex.schema.table method with the dropColumn function.
Heres an example of removing the role column from the users table:
In the down method, you need to add back the removed role column to the users table.

exports.up = function (knex) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('role');
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', function (table) {
    table.string('role');
  });
};




4.Renaming a column:

To rename an existing column in a table, you can use the knex.schema.table method with the renameColumn function.
Heres an example of renaming the name column to full_name in the users table:
In the down method, you need to revert the column name back to its original state.

exports.up = function (knex) {
  return knex.schema.table('users', function (table) {
    table.renameColumn('name', 'full_name');
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', function (table) {
    table.renameColumn('full_name', 'name');
  });
};




5.Changing the data type of a column:

To change the data type of an existing column in a table, you can use the knex.schema.table method with the alter function.
Heres an example of changing the data type of the email column to text in the users table:
In the down method, you need to revert the data type change of the email column back to its original type.

exports.up = function (knex) {
  return knex.schema.alterTable('users', function (table) {
    table.text('email').alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('users', function (table) {
    table.string('email').alter();
  });
};




These examples cover some common database operations using Knex.js for migrations.
You can explore the Knex.js documentation for more information and to discover other available
methods for handling additional operations and complex database schema changes.







RUNING THE MIGRATIONS SO AS TO APPLY TE CHANGES TO THE DATABASE
_____________________________________________________________________________________________________________




1.Run the migration:

knex migrate:latest

This command will apply the changes to the database by running the up method in your migration files. 
If you have multiple migration files, it will execute them in the order of their timestamps.



2.Rollback the migration (optional):

knex migrate:rollback

If you need to undo the changes made by a migration, you can use the rollback command. 
It will execute the down method in your migration files, reversing the changes made by the up method.

By following these steps, you can use Knex to apply changes to your database schema based on the migration files 
you create alexzywiak.github.io.









