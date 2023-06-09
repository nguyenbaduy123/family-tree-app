exports.up = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.timestamp('birthday')
    table.string('gender')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('birthday')
    table.dropColumn('gender')
  })
}
