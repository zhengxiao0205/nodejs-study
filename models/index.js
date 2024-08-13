import { Sequelize } from 'sequelize'

const database = 'test-db'
const username = 'test-db'
const password = '123456'

const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// 加载模型
db.User = (await import('./user.js')).default(sequelize, Sequelize)

export default db
