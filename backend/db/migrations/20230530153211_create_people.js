exports.up = function (knex) {
  return knex.schema.createTable('people', (table) => {
    table.uuid('id').primary()
    table.string('full_name')
    table.string('gender')
    table.string('citizen_id')
    table.string('role_in_family')
    table.string('blood_group')
    table.timestamp('date_of_birth')
    table.string('home_address')
    table.string('current_address')
    table.string('phone')
    table.boolean('is_alive')
    table.timestamp('date_of_death').defaultTo(null)
    table.text('story')
    table.uuid('family_id').references('families.id')
    table.string('image_url')
    table.uuid('created_by_id').references('users.id')
    table.integer('generation')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('people')
}
