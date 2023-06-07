exports.up = function (knex) {
  return knex.schema.createTable('people', (table) => {
    table.increments('id').primary()
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
    table.timestamp('date_of_death').defaultTo(null) // Giá trị mặc định là null
    table.text('story')
    table.integer('family_id').unsigned().references('families.id')
    table.string('image_url')
    table.integer('created_by_id').unsigned().references('users.id')
    table.integer('generation')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('people')
}
