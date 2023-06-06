exports.up = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('role').defaultTo('USER').alter()
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('role').nullable().alter()
  })
}
