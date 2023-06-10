const knex = require('knex')
const knexConfig = require('./knexfile')

const createDatabase = async () => {
  const defaultConnection = knex(knexConfig.development)
  try {
    const database = knexConfig.development.connection.database

    await defaultConnection.raw(`CREATE DATABASE ${database}`)

    console.log(`Database ${database} created successfully.`)
  } catch (error) {
    console.error('Error creating database:', error)
  } finally {
    defaultConnection.destroy()
  }
}

createDatabase()
