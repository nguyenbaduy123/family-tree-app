exports.up = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.unique('username')
    table.unique('email')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropUnique('username')
    table.dropUnique('email')
  })
}
