import { Sequelize } from 'sequelize'

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './src/database.sqlite',
})

export default database
