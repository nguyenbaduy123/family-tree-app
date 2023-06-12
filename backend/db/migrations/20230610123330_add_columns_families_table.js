exports.up = (knex) => {
  return knex.schema.alterTable('families', (table) => {
    table.string('branch_name')
    table.string('address')
    table.string('story')
  })
}

exports.down = (knex) => {
  return knex.schema.alterTable('familes', (table) => {
    table.dropColumn('branch_name')
    table.dropColumn('address')
    table.dropColumn('story')
  })
}
