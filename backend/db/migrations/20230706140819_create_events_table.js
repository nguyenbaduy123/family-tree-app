exports.up = function (knex) {
  return knex.schema.createTable('events', (table) => {
    table.uuid('id').primary()
    table.uuid('family_id').references('families.id')
    table.string('name')
    table.timestamp('time')
    table.boolean('notice').defaultTo(true)
    table.string('calendar').defaultTo('solar')
    table.boolean('repeat').defaultTo(true)
    table.string('type')
    table.string('description')
    table.string('location')
    table.string('note')
    table.uuid('created_by_id').references('users.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('events')
}
