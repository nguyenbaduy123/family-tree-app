exports.up = function (knex) {
  return knex.schema.createTable('families', (table) => {
    table.increments('id').primary()
    table.integer('owner_id').unsigned().notNullable().references('users.id')
    table.string('name')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('families')
}
