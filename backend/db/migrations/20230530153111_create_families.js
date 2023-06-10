exports.up = function (knex) {
  return knex.schema.createTable('families', (table) => {
    table.uuid('id').primary()
    table.uuid('owner_id').notNullable().references('users.id')
    table.string('name')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('families')
}
