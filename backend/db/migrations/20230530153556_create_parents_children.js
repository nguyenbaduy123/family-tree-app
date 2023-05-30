exports.up = function (knex) {
  return knex.schema.createTable('parents_children', (table) => {
    table
      .integer('husband_id')
      .unsigned()
      .references('people.id')
      .defaultTo(null)
      .primary()
    table
      .integer('wife_id')
      .unsigned()
      .references('people.id')
      .defaultTo(null)
      .primary()
    table.specificType('children', 'integer[]')
    table.string('marriage_date')
    table.boolean('is_divorced').defaultTo(false)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('parents_children')
}
