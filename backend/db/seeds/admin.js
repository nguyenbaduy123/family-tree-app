const bcrypt = require('bcryptjs')

exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      const password = bcrypt.hashSync('admin', 10)
      return knex('users').insert([
        {
          username: 'admin',
          email: 'baduy.hust@gmail.com',
          hash_password: password,
          role: 'admin',
        },
      ])
    })
}
