exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.string('username')
    table.string('email')
    table.string('hash_password')
    table.string('full_name')
    table.string('role')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.string('access_token')
    table.string('avatar')
    table.string('phone')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
