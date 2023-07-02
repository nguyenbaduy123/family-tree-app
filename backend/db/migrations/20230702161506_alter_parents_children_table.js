exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists('parents_children')
    .createTable('parents_children', (table) => {
      table.uuid('husband_id').references('people.id').defaultTo(null)
      table.uuid('wife_id').references('people.id').defaultTo(null)
      table.specificType('children', 'uuid[]')
      table.string('marriage_date')
      table.boolean('is_divorced').defaultTo(false)

      table.primary(['husband_id', 'wife_id'])
    })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('parents_children')
}
