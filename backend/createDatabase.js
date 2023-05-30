const knex = require('knex')
const knexConfig = require('./knexfile')

const createDatabase = async () => {
  try {
    const defaultConnection = knex(knexConfig.development)

    await defaultConnection.raw(
      `CREATE DATABASE ${knexConfig.development.connection.database}`
    )

    console.log(
      `Database ${knexConfig.development.connection.database} created successfully.`
    )
  } catch (error) {
    console.error('Error creating database:', error)
  } finally {
    defaultConnection.destroy()
  }
}

createDatabase()
