To use the sails-migrations package for handling migrations in your Sails.js application, you can follow these steps:

Install the package:

In your Sails.js project's root directory, run the following command:

npm install sails-migrations
Configure the package:

Open the config/migrations.js file (create it if it doesnt exist) and configure the settings for the sails-migrations package. Here's an example configuration:

module.exports.migrations = {
  // Connection name
  connection: 'default',

  // The directory containing your migration files
  dir: 'migrations',

  // The table name to store the migration history
  tableName: 'migrations',

  // The connection options for the migrations
  // This should match your database connection settings
  connectionOptions: {
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'databaseName',
  },
};
Adjust the connection value to match the name of the connection defined in config/datastores.js.
Create migration files:

Create migration files in the directory specified by the dir configuration in config/migrations.js.
A migration file should contain up and down functions to define the changes to be applied and rolled back, respectively.
Heres an example migration file that adds a new column to a table:

module.exports = {
  up: async function (knex) {
    await knex.schema.alterTable('users', function (table) {
      table.string('address');
    });
  },

  down: async function (knex) {
    await knex.schema.alterTable('users', function (table) {
      table.dropColumn('address');
    });
  }
};
Run migrations:

To apply migrations, use the following command in your project's root directory:


npx sails-migrations up
This will run all pending migrations and update the database schema accordingly.

To roll back migrations, you can use the following command:


npx sails-migrations down
This will roll back the last applied migration.

You can also specify a specific migration file to run using the --file flag:

css
Copy code
npx sails-migrations up --file 20230613123456-add-address-column.js
Regarding auto-migrations, Sails.js has a feature called auto-migrations, which automatically attempts to synchronize your models with the database by creating or altering tables based on the model definitions. However, it's important to note that auto-migrations can result in data loss and may not handle complex changes or custom database logic well.

To disable auto-migrations in Sails.js, you can set the migrate configuration in config/models.js to 'safe' or 'drop'. For example:

javascript
Copy code
module.exports.models = {
  migrate: 'safe',
};
Setting 'safe' will disable auto-migrations and prevent any automatic changes to the database schema. Setting 'drop' will drop and re-create the tables whenever the Sails.js server starts, effectively clearing the data.

By using the sails-migrations package, you have more control over the migration process and can handle database schema changes more safely and explicitly.
