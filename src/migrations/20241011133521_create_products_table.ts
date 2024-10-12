import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Check database if it doesn't exists
  await knex.raw('SELECT 1 FROM pg_database WHERE datname = ?', [process.env.PGDATABASE])
  .then(async (result) => {
    if (!result.rowCount) {
      await knex.raw(`CREATE DATABASE ${process.env.PGDATABASE}`);
    }
  });

  // Create table
  await knex.schema.createTable('tm_user', function(table) {
    table.increments('id').primary();
    table.string('user_name').notNullable();
    table.string('full_name').notNullable();
    table.string('phone').notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('tm_category', function(table) {
    table.increments('id').primary();
    table.string('category_name').notNullable();
    table.integer('created_id').unsigned().references('id').inTable('tm_user').onDelete('CASCADE');
    table.integer('updated_id').unsigned().references('id').inTable('tm_user').onDelete('CASCADE');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('tm_product', function(table) {
    table.increments('id').primary();
    table.string('product_name').notNullable();
    table.integer('category_id').notNullable().unsigned().references('id').inTable('tm_category').onDelete('CASCADE');
    table.integer('qty').notNullable().defaultTo(0);
    table.decimal('price', 10, 2).notNullable();    
    table.integer('created_id').unsigned().references('id').inTable('tm_user').onDelete('CASCADE');
    table.integer('updated_id').unsigned().references('id').inTable('tm_user').onDelete('CASCADE');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('tt_product_export', function(table) {
    table.increments('id').primary();
    table.string('product_name').notNullable();
    table.integer('category_id').unsigned().references('id').inTable('tm_category').onDelete('CASCADE');
    table.integer('qty').notNullable().defaultTo(0);
    table.decimal('price', 10, 2).notNullable();    
    table.integer('created_id').unsigned().references('id').inTable('tm_user').onDelete('CASCADE');
    table.integer('updated_id').unsigned().references('id').inTable('tm_user').onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tt_product_export');
  await knex.schema.dropTable('tm_product');
  await knex.schema.dropTable('tm_category');
  await knex.schema.dropTable('tm_user');
}
