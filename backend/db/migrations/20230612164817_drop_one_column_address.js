exports.up = (knex) => {
  return knex.schema.alterTable('families', (table) => {
    table.dropColumn('addresss')
  })
}

exports.down = (knex) => {
  return knex.schema.alterTable('familes', (table) => {
    table.string('addresss')
  })
}
